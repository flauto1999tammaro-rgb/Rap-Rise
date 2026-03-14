import { openDb, getRoutes, getStops, getTrips, getStoptimes, getServiceIdsByDate } from 'gtfs';
import { readFile } from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, '..', 'config.json');
const raw = await readFile(configPath, 'utf8');
const config = JSON.parse(raw);

export const openDatabase = () => openDb(config);

const mapRouteTypeToMode = (routeOrType) => {
  const routeType = typeof routeOrType === 'number' ? routeOrType : Number(routeOrType?.route_type);
  const agencyId = String(routeOrType?.agency_id || '');
  const routeName = String(routeOrType?.route_long_name || routeOrType?.route_short_name || '').toLowerCase();

  switch (routeType) {
    case 0:
      return 'tram';
    case 1:
      return 'metro';
    case 2:
      // EAV rail services in this dataset include Cumana/Circumflegrea/Circumvesuviana.
      if (agencyId.startsWith('eav_') || routeName.includes('cumana')) {
        return 'cumana';
      }
      return 'metro';
    case 3:
    case 11:
      return 'bus';
    case 7:
      return 'funicolare';
    default:
      return 'bus';
  }
};

const formatStop = (stop, routes = []) => {
  const lines = routes
    .map((route) => route.route_short_name || route.route_long_name)
    .filter(Boolean);
  const modes = Array.from(new Set(routes.map((route) => mapRouteTypeToMode(route))));

  return {
    id: stop.stop_id,
    name: stop.stop_name,
    area: stop.stop_desc || stop.stop_city || 'Napoli',
    modes,
    lines,
    nextArrivals: [],
    lat: stop.stop_lat,
    lon: stop.stop_lon,
  };
};

export const getModes = () => {
  const routes = getRoutes();
  const modes = new Set(routes.map((route) => mapRouteTypeToMode(route)));
  return Array.from(modes);
};

export const getFeaturedStops = (db) => {
  const rows = db
    .prepare(
      `
      SELECT stops.*, COUNT(stop_times.stop_id) AS stop_count
      FROM stops
      JOIN stop_times ON stops.stop_id = stop_times.stop_id
      WHERE stops.stop_lat BETWEEN 40.75 AND 40.93
        AND stops.stop_lon BETWEEN 14.15 AND 14.35
      GROUP BY stops.stop_id
      ORDER BY stop_count DESC
      LIMIT 8
    `
    )
    .all();

  if (rows.length === 0) {
    return db.prepare('SELECT * FROM stops ORDER BY stop_name LIMIT 8').all().map((row) => {
      const routes = getRoutes({ stop_id: row.stop_id });
      return formatStop(row, routes);
    });
  }

  return rows.map((row) => {
    const routes = getRoutes({ stop_id: row.stop_id });
    return formatStop(row, routes);
  });
};

export const getStopsByIds = (db, ids) => {
  if (!ids.length) {
    return [];
  }
  const placeholders = ids.map(() => '?').join(',');
  const rows = db.prepare(`SELECT * FROM stops WHERE stop_id IN (${placeholders})`).all(ids);
  return rows.map((row) => formatStop(row));
};

export const searchStops = (db, query) => {
  const rows = db
    .prepare('SELECT * FROM stops WHERE stop_name LIKE ? OR stop_code LIKE ? LIMIT 50')
    .all(`%${query}%`, `%${query}%`);
  return rows.map((row) => formatStop(row));
};

export const getStopById = (db, stopId) => {
  const stop = getStops({ stop_id: stopId })[0];
  if (!stop) {
    return null;
  }
  const routes = getRoutes({ stop_id: stopId });
  return formatStop(stop, routes);
};

export const getStopsByMode = (db, mode) => {
  const routes = getRoutes();
  const matchingRoutes = routes.filter((route) => mapRouteTypeToMode(route) === mode);

  const stops = new Map();
  matchingRoutes.forEach((route) => {
    const routeStops = getStops({ route_id: route.route_id });
    routeStops.forEach((stop) => {
      const existing = stops.get(stop.stop_id);
      if (!existing) {
        stops.set(stop.stop_id, formatStop(stop, [route]));
        return;
      }

      const nextLines = Array.from(
        new Set([
          ...existing.lines,
          route.route_short_name || route.route_long_name,
        ].filter(Boolean))
      );
      const nextModes = Array.from(new Set([...existing.modes, mapRouteTypeToMode(route)]));
      stops.set(stop.stop_id, {
        ...existing,
        lines: nextLines,
        modes: nextModes,
      });
    });
  });

  return Array.from(stops.values()).sort((a, b) => a.name.localeCompare(b.name));
};

const getTodayDateInt = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return Number(`${yyyy}${mm}${dd}`);
};

const formatTime = (date) => {
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}:00`;
};

const addHours = (date, hours) => new Date(date.getTime() + hours * 60 * 60 * 1000);

const toMinutes = (time) => {
  const [hh, mm] = time.split(':').map((part) => Number(part));
  return hh * 60 + mm;
};

const toDateInt = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return Number(`${yyyy}${mm}${dd}`);
};

const buildDeparturesForWindow = (stopId, startTime, endTime, dateInt) => {
  const stoptimes = getStoptimes({
    stop_id: stopId,
    date: dateInt,
    start_time: startTime,
    end_time: endTime,
  });

  const departures = stoptimes.slice(0, 30).map((stopTime) => {
    const trip = getTrips({ trip_id: stopTime.trip_id })[0];
    const route = trip ? getRoutes({ route_id: trip.route_id })[0] : null;
    return {
      id: `${stopTime.trip_id}-${stopTime.stop_sequence}`,
      line: route?.route_short_name || route?.route_long_name || 'Linea',
      destination: trip?.trip_headsign || 'Direzione',
      time: stopTime.departure_time,
      mode: route ? mapRouteTypeToMode(route) : 'bus',
    };
  });

  return departures.sort((a, b) => toMinutes(a.time) - toMinutes(b.time));
};

export const getDeparturesForStop = (db, stopId) => {
  const now = new Date();
  const end = addHours(now, 2);
  const dateInt = getTodayDateInt();

  return buildDeparturesForWindow(stopId, formatTime(now), formatTime(end), dateInt).slice(0, 20);
};

export const getDepartureStatusForStop = (db, stopId) => {
  const now = new Date();
  const twoHoursLater = addHours(now, 2);

  const todayInt = toDateInt(now);
  const tomorrow = addHours(now, 24);
  const tomorrowInt = toDateInt(tomorrow);

  const nextTwoHours = buildDeparturesForWindow(
    stopId,
    formatTime(now),
    formatTime(twoHoursLater),
    todayInt
  ).slice(0, 5);

  if (nextTwoHours.length > 0) {
    return {
      nextTwoHours,
      firstAfterNow: nextTwoHours[0],
    };
  }

  const todayRemaining = buildDeparturesForWindow(stopId, formatTime(now), '29:59:59', todayInt);
  if (todayRemaining.length > 0) {
    return {
      nextTwoHours,
      firstAfterNow: todayRemaining[0],
    };
  }

  const tomorrowMorning = buildDeparturesForWindow(stopId, '00:00:00', '29:59:59', tomorrowInt);
  return {
    nextTwoHours,
    firstAfterNow: tomorrowMorning[0] || null,
  };
};

const distanceMeters = (a, b) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const radius = 6371000;

  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return radius * c;
};

export const findNearbyStops = (lat, lon, radiusMeters = 1200) => {
  const stops = getStops(
    { stop_lat: lat, stop_lon: lon },
    [],
    [],
    { bounding_box_side_m: radiusMeters }
  );

  return stops
    .map((stop) => ({
      stop: formatStop(stop, getRoutes({ stop_id: stop.stop_id })),
      rawStop: stop,
      distance: distanceMeters({ lat, lon }, { lat: stop.stop_lat, lon: stop.stop_lon }),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5);
};

export const findDirectTrips = (db, fromStopId, toStopId) => {
  const now = new Date();
  const dateInt = getTodayDateInt();
  const startTime = formatTime(now);
  const serviceIds = getServiceIdsByDate(dateInt);

  if (!serviceIds.length) {
    return [];
  }

  const placeholders = serviceIds.map(() => '?').join(',');
  const sql = `
    SELECT st1.departure_time AS from_time,
           st2.arrival_time AS to_time,
           trips.trip_headsign AS headsign,
           routes.route_short_name AS short_name,
           routes.route_long_name AS long_name,
           routes.route_type AS route_type
    FROM stop_times st1
    JOIN stop_times st2 ON st1.trip_id = st2.trip_id AND st1.stop_sequence < st2.stop_sequence
    JOIN trips ON trips.trip_id = st1.trip_id
    JOIN routes ON routes.route_id = trips.route_id
    WHERE st1.stop_id = ?
      AND st2.stop_id = ?
      AND trips.service_id IN (${placeholders})
      AND st1.departure_time >= ?
    ORDER BY st1.departure_time
    LIMIT 3
  `;

  const rows = db
    .prepare(sql)
    .all(fromStopId, toStopId, ...serviceIds, startTime)
    .map((row) => ({
      fromTime: row.from_time,
      toTime: row.to_time,
      headsign: row.headsign,
      line: row.short_name || row.long_name || 'Linea',
      mode: mapRouteTypeToMode(row),
    }));

  return rows;
};
