type GeocodeResult = {
  id: string;
  label: string;
  lat: number;
  lon: number;
};

const toNumber = (value: string) => Number.parseFloat(value);

export const searchPlaces = async (query: string): Promise<GeocodeResult[]> => {
  const trimmed = query.trim();
  if (trimmed.length < 3) {
    return [];
  }

  const params = new URLSearchParams({
    format: 'json',
    addressdetails: '1',
    limit: '6',
    countrycodes: 'it',
    q: trimmed,
  });

  const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`);
  if (!response.ok) {
    return [];
  }

  const results = (await response.json()) as Array<{
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
  }>;

  return results.map((item) => ({
    id: String(item.place_id),
    label: item.display_name,
    lat: toNumber(item.lat),
    lon: toNumber(item.lon),
  }));
};

export const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
  const params = new URLSearchParams({
    format: 'json',
    lat: String(lat),
    lon: String(lon),
  });

  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params.toString()}`);
  if (!response.ok) {
    return 'Posizione attuale';
  }
  const data = (await response.json()) as { display_name?: string };
  return data.display_name || 'Posizione attuale';
};

export type { GeocodeResult };
