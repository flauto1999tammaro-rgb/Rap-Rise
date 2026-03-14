import express from 'express';
import cors from 'cors';

import {
  openDatabase,
  getModes,
  getFeaturedStops,
  searchStops,
  getStopsByIds,
  getStopById,
  getStopsByMode,
  getDeparturesForStop,
  getDepartureStatusForStop,
  findNearbyStops,
  findDirectTrips,
} from './gtfsDb.js';
import { estimateFare } from './fareRules.js';
import { mapOtpPlan } from './otpMapper.js';

const app = express();
const allowedOrigins = String(process.env.CORS_ORIGIN || '*')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.includes('*') ? true : allowedOrigins,
  })
);

let db;
try {
  db = openDatabase();
} catch (error) {
  console.error('GTFS database initialization failed:', error);
  process.exit(1);
}

app.get('/', (_req, res) => {
  res.json({
    service: 'napoli-transit-backend',
    status: 'ok',
  });
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    otpEnabled: Boolean(process.env.OTP_BASE_URL),
    timestamp: new Date().toISOString(),
  });
});

app.get('/modes', (_req, res) => {
  res.json(getModes());
});

app.get('/stops/featured', (_req, res) => {
  res.json(getFeaturedStops(db));
});

app.get('/stops/search', (req, res) => {
  const query = String(req.query.query || '').trim();
  if (!query) {
    res.json([]);
    return;
  }
  res.json(searchStops(db, query));
});

app.get('/stops/by-ids', (req, res) => {
  const ids = req.query.id;
  const idList = Array.isArray(ids) ? ids : ids ? [ids] : [];
  res.json(getStopsByIds(db, idList));
});

app.get('/stops/by-mode', (req, res) => {
  const mode = String(req.query.mode || '').trim();
  if (!mode) {
    res.json([]);
    return;
  }
  res.json(getStopsByMode(db, mode));
});

app.get('/stops/nearby', (req, res) => {
  const lat = Number(req.query.lat);
  const lon = Number(req.query.lon);
  const radius = Number(req.query.radius || 1200);
  if (!lat || !lon) {
    res.status(400).json({ error: 'Missing coordinates' });
    return;
  }
  const nearby = findNearbyStops(lat, lon, radius).map((item) => ({
    stop: item.stop,
    distance: item.distance,
  }));
  res.json(nearby);
});

app.get('/stops/:id', (req, res) => {
  const stop = getStopById(db, req.params.id);
  if (!stop) {
    res.status(404).json({ error: 'Stop not found' });
    return;
  }
  res.json(stop);
});

app.get('/departures/:stopId', (req, res) => {
  res.json(getDeparturesForStop(db, req.params.stopId));
});

app.get('/departures/:stopId/status', (req, res) => {
  res.json(getDepartureStatusForStop(db, req.params.stopId));
});

app.get('/insights/quality', (req, res) => {
  const sampleSize = Math.min(Math.max(Number(req.query.sample || 8), 3), 24);
  const featured = getFeaturedStops(db).slice(0, sampleSize);

  if (featured.length === 0) {
    res.json({
      score: 42,
      activeCoverageRatio: 0,
      activeStopsInWindow: 0,
      sampleSize: 0,
      modeDiversity: 0,
      generatedAt: new Date().toISOString(),
      message: 'Nessuna fermata disponibile nel campione.',
    });
    return;
  }

  const statuses = featured.map((stop) => getDepartureStatusForStop(db, stop.id));
  const activeStopsInWindow = statuses.filter((status) => status.nextTwoHours.length > 0).length;
  const activeCoverageRatio = activeStopsInWindow / featured.length;

  const allModes = new Set();
  featured.forEach((stop) => {
    (stop.modes || []).forEach((mode) => allModes.add(mode));
  });

  const modeDiversity = allModes.size;
  const score = Math.max(
    20,
    Math.min(99, Math.round(activeCoverageRatio * 70 + Math.min(modeDiversity, 5) * 6))
  );

  const message =
    score >= 80
      ? 'Servizio in forma: rete viva e copertura oraria buona.'
      : score >= 60
        ? 'Servizio stabile: alcune aree sono meno frequenti.'
        : 'Servizio debole in questa fascia oraria: valuta anticipo o alternative.';

  res.json({
    score,
    activeCoverageRatio,
    activeStopsInWindow,
    sampleSize: featured.length,
    modeDiversity,
    generatedAt: new Date().toISOString(),
    message,
  });
});

app.get('/insights/commute-alert', async (req, res) => {
  const fromLat = Number(req.query.fromLat);
  const fromLon = Number(req.query.fromLon);
  const toLat = Number(req.query.toLat);
  const toLon = Number(req.query.toLon);

  if (!fromLat || !fromLon || !toLat || !toLon) {
    res.status(400).json({ error: 'Missing coordinates' });
    return;
  }

  const otpBaseUrl = process.env.OTP_BASE_URL;
  if (!otpBaseUrl) {
    res.json({
      severity: 'info',
      message: 'Alert commute disponibili con OTP attivo.',
      nowDurationMinutes: null,
      baselineDurationMinutes: null,
      deltaMinutes: null,
      nextDepartureTime: null,
      score: 50,
      generatedAt: new Date().toISOString(),
    });
    return;
  }

  const requestOtpPlan = async (overrides = {}) => {
    const params = new URLSearchParams({
      fromPlace: `${fromLat},${fromLon}`,
      toPlace: `${toLat},${toLon}`,
      mode: 'TRANSIT,WALK',
      maxWalkDistance: '1200',
      numItineraries: '3',
      ...overrides,
    });

    const response = await fetch(`${otpBaseUrl}/otp/routers/default/plan?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`OTP error ${response.status}`);
    }
    return response.json();
  };

  const minDuration = (plans) => {
    if (!plans.length) {
      return null;
    }
    return plans.reduce((min, plan) => Math.min(min, plan.totalDurationMinutes), plans[0].totalDurationMinutes);
  };

  try {
    const nowPlans = mapOtpPlan(await requestOtpPlan());

    const baselineDate = new Date();
    baselineDate.setDate(baselineDate.getDate() + 1);
    const month = String(baselineDate.getMonth() + 1).padStart(2, '0');
    const day = String(baselineDate.getDate()).padStart(2, '0');
    const year = String(baselineDate.getFullYear());

    const baselinePlans = mapOtpPlan(
      await requestOtpPlan({
        date: `${month}-${day}-${year}`,
        time: '08:30am',
      })
    );

    const nowDurationMinutes = minDuration(nowPlans);
    const baselineDurationMinutes = minDuration(baselinePlans);
    const reference = baselineDurationMinutes ?? nowDurationMinutes;

    if (nowDurationMinutes === null) {
      res.json({
        severity: 'critical',
        message: 'Nessuna soluzione transit disponibile adesso sulla tua commute.',
        nowDurationMinutes,
        baselineDurationMinutes,
        deltaMinutes: null,
        nextDepartureTime: null,
        score: 25,
        generatedAt: new Date().toISOString(),
      });
      return;
    }

    const deltaMinutes = reference === null ? null : Math.max(0, nowDurationMinutes - reference);

    let severity = 'good';
    let message = 'Commute regolare: tempi in linea con la fascia ideale.';
    if (deltaMinutes !== null && deltaMinutes > 30) {
      severity = 'critical';
      message = 'Commute critica: ritardo forte rispetto alla fascia ideale.';
    } else if (deltaMinutes !== null && deltaMinutes > 15) {
      severity = 'warn';
      message = 'Commute rallentata: valuta partenza anticipata o alternativa.';
    } else if (deltaMinutes !== null && deltaMinutes > 5) {
      severity = 'watch';
      message = 'Commute sotto osservazione: piccoli ritardi in aumento.';
    }

    const nextDepartureTime = nowPlans[0]?.legs?.[0]?.startTime || null;
    const score = Math.max(20, Math.min(99, 95 - (deltaMinutes || 0) * 2));

    res.json({
      severity,
      message,
      nowDurationMinutes,
      baselineDurationMinutes,
      deltaMinutes,
      nextDepartureTime,
      score,
      generatedAt: new Date().toISOString(),
    });
  } catch {
    res.json({
      severity: 'info',
      message: 'Alert commute temporaneamente non disponibili.',
      nowDurationMinutes: null,
      baselineDurationMinutes: null,
      deltaMinutes: null,
      nextDepartureTime: null,
      score: 45,
      generatedAt: new Date().toISOString(),
    });
  }
});

app.get('/plan', async (req, res) => {
  const fromLat = Number(req.query.fromLat);
  const fromLon = Number(req.query.fromLon);
  const toLat = Number(req.query.toLat);
  const toLon = Number(req.query.toLon);

  if (!fromLat || !fromLon || !toLat || !toLon) {
    res.status(400).json({ error: 'Missing coordinates' });
    return;
  }

  const otpBaseUrl = process.env.OTP_BASE_URL;
  if (otpBaseUrl) {
    const baseParams = {
      fromPlace: `${fromLat},${fromLon}`,
      toPlace: `${toLat},${toLon}`,
      mode: 'TRANSIT,WALK',
      maxWalkDistance: '1200',
      numItineraries: '3',
    };

    const requestOtpPlan = async (overrides = {}) => {
      const params = new URLSearchParams({
        ...baseParams,
        ...overrides,
      });
      const response = await fetch(`${otpBaseUrl}/otp/routers/default/plan?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`OTP error ${response.status}`);
      }
      return response.json();
    };

    try {
      let data = await requestOtpPlan();
      let plans = mapOtpPlan(data);
      let fallbackUsed = false;

      // If there is no service right now (night/early morning), retry for the next day morning.
      if (plans.length === 0) {
        const fallback = new Date();
        fallback.setDate(fallback.getDate() + 1);
        const month = String(fallback.getMonth() + 1).padStart(2, '0');
        const day = String(fallback.getDate()).padStart(2, '0');
        const year = String(fallback.getFullYear());

        data = await requestOtpPlan({
          date: `${month}-${day}-${year}`,
          time: '08:30am',
        });
        plans = mapOtpPlan(data);
        fallbackUsed = plans.length > 0;
      }

      if (fallbackUsed) {
        plans = plans.map((plan) => ({
          ...plan,
          advisory: 'Nessuna corsa disponibile adesso: ti mostro le prime soluzioni utili domani mattina.',
        }));
      }

      res.json(plans);
    } catch {
      res.json([]);
    }
    return;
  }

  const originStops = findNearbyStops(fromLat, fromLon);
  const destinationStops = findNearbyStops(toLat, toLon);

  const plans = [];

  originStops.forEach((origin) => {
    destinationStops.forEach((destination) => {
      const trips = findDirectTrips(db, origin.rawStop.stop_id, destination.rawStop.stop_id);
      trips.forEach((trip, index) => {
        const durationMinutes = Math.max(1, Math.round((Number(trip.toTime.split(':')[0]) - Number(trip.fromTime.split(':')[0])) * 60));
        const fare = estimateFare([trip.mode]);
        plans.push({
          id: `${origin.rawStop.stop_id}-${destination.rawStop.stop_id}-${index}`,
          summary: `${origin.stop.stop_name} -> ${destination.stop.stop_name}`,
          totalDurationMinutes: durationMinutes,
          totalCostEur: fare.amount,
          isEstimate: fare.isEstimate,
          legs: [
            {
              mode: trip.mode,
              line: trip.line,
              fromStop: origin.stop.stop_name,
              toStop: destination.stop.stop_name,
              startTime: trip.fromTime,
              endTime: trip.toTime,
              durationMinutes,
            },
          ],
        });
      });
    });
  });

  if (plans.length === 0) {
    const toRad = (value) => (value * Math.PI) / 180;
    const dLat = toRad(toLat - fromLat);
    const dLon = toRad(toLon - fromLon);
    const lat1 = toRad(fromLat);
    const lat2 = toRad(toLat);
    const radius = 6371000;
    const h =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const distance = radius * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
    const walkMinutes = Math.max(1, Math.round(distance / 80));

    res.json([
      {
        id: 'walk-only',
        summary: 'Percorso a piedi',
        totalDurationMinutes: walkMinutes,
        totalCostEur: 0,
        isEstimate: true,
        legs: [
          {
            mode: 'walk',
            line: 'A piedi',
            fromStop: 'Origine',
            toStop: 'Destinazione',
            startTime: 'Ora',
            endTime: 'Arrivo',
            durationMinutes: walkMinutes,
          },
        ],
      },
    ]);
    return;
  }

  res.json(plans.slice(0, 5));
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log(`GTFS backend running on http://localhost:${port}`);
});
