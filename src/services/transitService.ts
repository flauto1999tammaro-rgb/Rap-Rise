import { DEPARTURES, MODE_LABELS, MODES, STOPS } from '../data/mockTransit';
import { Departure, Stop, TransitMode } from '../types/transit';
import { fetchBackendJson } from './backendClient';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getModes = async (): Promise<TransitMode[]> => {
  await sleep(120);
  try {
    const result = await fetchBackendJson<TransitMode[]>('/modes');
    if (result.length > 0) {
      return result;
    }
  } catch {
    // Fallback to mock data
  }
  return MODES;
};

export const getModeLabel = (mode: TransitMode): string => MODE_LABELS[mode];

export const getFeaturedStops = async (): Promise<Stop[]> => {
  await sleep(150);
  try {
    const result = await fetchBackendJson<Stop[]>('/stops/featured');
    if (result.length > 0) {
      return result;
    }
  } catch {
    // Fallback to mock data
  }
  return STOPS.slice(0, 4);
};

export const getStopById = async (stopId: string): Promise<Stop | null> => {
  await sleep(120);
  try {
    const result = await fetchBackendJson<Stop>(`/stops/${stopId}`);
    if (result) {
      return result;
    }
  } catch {
    // Fallback to mock data
  }
  return STOPS.find((stop) => stop.id === stopId) ?? null;
};

export const getStopsByMode = async (mode: TransitMode): Promise<Stop[]> => {
  await sleep(140);
  try {
    const params = new URLSearchParams({ mode });
    const result = await fetchBackendJson<Stop[]>(`/stops/by-mode?${params.toString()}`);
    if (result.length > 0) {
      return result;
    }
  } catch {
    // Fallback to mock data
  }
  return STOPS.filter((stop) => stop.modes.includes(mode));
};

export const getStopsByIds = async (ids: string[]): Promise<Stop[]> => {
  await sleep(120);
  try {
    const params = new URLSearchParams();
    ids.forEach((id) => params.append('id', id));
    const result = await fetchBackendJson<Stop[]>(`/stops/by-ids?${params.toString()}`);
    if (result.length > 0) {
      return result;
    }
  } catch {
    // Fallback to mock data
  }
  return ids
    .map((id) => STOPS.find((stop) => stop.id === id))
    .filter((stop): stop is Stop => Boolean(stop));
};

export const searchStops = async (query: string): Promise<Stop[]> => {
  const normalized = query.trim().toLowerCase();
  await sleep(180);

  if (!normalized) {
    return [];
  }

  try {
    const params = new URLSearchParams({ query: normalized });
    const result = await fetchBackendJson<Stop[]>(`/stops/search?${params.toString()}`);
    if (result.length > 0) {
      return result;
    }
  } catch {
    // Fallback to mock data
  }

  return STOPS.filter((stop) => {
    const matchesName = stop.name.toLowerCase().includes(normalized);
    const matchesLine = stop.lines.some((line) => line.toLowerCase().includes(normalized));
    const matchesArea = stop.area.toLowerCase().includes(normalized);

    return matchesName || matchesLine || matchesArea;
  });
};

export const getDeparturesForStop = async (stopId: string): Promise<Departure[]> => {
  await sleep(120);
  try {
    const result = await fetchBackendJson<Departure[]>(`/departures/${stopId}`);
    if (result.length > 0) {
      return result;
    }
  } catch {
    // Fallback to mock data
  }
  // TODO: Replace mock data with ANM realtime departures API.
  return DEPARTURES[stopId] ?? [];
};

export const getDepartureStatusForStop = async (stopId: string): Promise<{
  nextTwoHours: Departure[];
  firstAfterNow: Departure | null;
}> => {
  await sleep(80);
  try {
    return await fetchBackendJson<{
      nextTwoHours: Departure[];
      firstAfterNow: Departure | null;
    }>(`/departures/${stopId}/status`);
  } catch {
    const fallback = DEPARTURES[stopId] ?? [];
    return {
      nextTwoHours: fallback.slice(0, 5),
      firstAfterNow: fallback[0] ?? null,
    };
  }
};

export const getNearbyStops = async (lat: number, lon: number) => {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    radius: '1200',
  });
  try {
    return await fetchBackendJson<{ stop: Stop; distance: number }[]>(
      `/stops/nearby?${params.toString()}`
    );
  } catch {
    return [];
  }
};

export type TransitQualityInsights = {
  score: number;
  activeCoverageRatio: number;
  activeStopsInWindow: number;
  sampleSize: number;
  modeDiversity: number;
  generatedAt: string;
  message: string;
};

export const getTransitQualityInsights = async (): Promise<TransitQualityInsights> => {
  await sleep(120);
  try {
    return await fetchBackendJson<TransitQualityInsights>('/insights/quality');
  } catch {
    return {
      score: 58,
      activeCoverageRatio: 0.5,
      activeStopsInWindow: 4,
      sampleSize: 8,
      modeDiversity: 3,
      generatedAt: new Date().toISOString(),
      message: 'Insight locale non disponibile: avvia backend per metriche live.',
    };
  }
};
