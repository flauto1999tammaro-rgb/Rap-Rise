export type TransitMode = 'bus' | 'metro' | 'funicolare' | 'tram' | 'cumana';

export type Stop = {
  id: string;
  name: string;
  area: string;
  modes: TransitMode[];
  lines: string[];
  nextArrivals: string[];
  lat?: number;
  lon?: number;
};

export type Departure = {
  id: string;
  line: string;
  destination: string;
  time: string;
  mode: TransitMode;
};
