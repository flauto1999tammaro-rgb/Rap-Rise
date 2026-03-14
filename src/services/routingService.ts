import { fetchBackendJson } from './backendClient';
import { CommuteAlert, RoutePlan } from '../types/routing';

const buildWalkFallbackPlan = (params: {
  fromLat: number;
  fromLon: number;
  toLat: number;
  toLon: number;
}): RoutePlan[] => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const dLat = toRad(params.toLat - params.fromLat);
  const dLon = toRad(params.toLon - params.fromLon);
  const lat1 = toRad(params.fromLat);
  const lat2 = toRad(params.toLat);
  const earthRadius = 6371000;

  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const distanceMeters = earthRadius * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  const walkMinutes = Math.max(1, Math.round(distanceMeters / 80));

  return [
    {
      id: 'fallback-walk',
      summary: 'Percorso a piedi (fallback)',
      totalDurationMinutes: walkMinutes,
      totalCostEur: 0,
      isEstimate: true,
      advisory:
        'Backend non raggiungibile: ho mostrato un percorso base a piedi. Verifica URL backend in Impostazioni.',
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
  ];
};

export const planTrip = async (params: {
  fromLat: number;
  fromLon: number;
  toLat: number;
  toLon: number;
}): Promise<RoutePlan[]> => {
  const query = new URLSearchParams({
    fromLat: String(params.fromLat),
    fromLon: String(params.fromLon),
    toLat: String(params.toLat),
    toLon: String(params.toLon),
  });

  try {
    return await fetchBackendJson<RoutePlan[]>(`/plan?${query.toString()}`);
  } catch {
    return buildWalkFallbackPlan(params);
  }
};

export const getCommuteAlert = async (params: {
  fromLat: number;
  fromLon: number;
  toLat: number;
  toLon: number;
}): Promise<CommuteAlert> => {
  const query = new URLSearchParams({
    fromLat: String(params.fromLat),
    fromLon: String(params.fromLon),
    toLat: String(params.toLat),
    toLon: String(params.toLon),
  });

  return fetchBackendJson<CommuteAlert>(`/insights/commute-alert?${query.toString()}`);
};
