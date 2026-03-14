import AsyncStorage from '@react-native-async-storage/async-storage';

export type TransitSettings = {
  apiBaseUrl: string;
  apiKey: string;
  backendBaseUrl: string;
  geocodingProvider: 'nominatim';
  homePlace: SavedPlace | null;
  workPlace: SavedPlace | null;
  smartAlertsEnabled: boolean;
  notificationPolicy: 'off' | 'critical-only' | 'critical-and-warn';
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
};

export type SavedPlace = {
  label: string;
  lat: number;
  lon: number;
};

const SETTINGS_KEY = 'napoli-transit.settings.v1';
const defaultBackendBaseUrl = process.env.EXPO_PUBLIC_BACKEND_BASE_URL || 'http://localhost:3001';

export const defaultSettings: TransitSettings = {
  apiBaseUrl: 'https://api.anm.it',
  apiKey: '',
  backendBaseUrl: defaultBackendBaseUrl,
  geocodingProvider: 'nominatim',
  homePlace: null,
  workPlace: null,
  smartAlertsEnabled: true,
  notificationPolicy: 'critical-only',
  quietHoursEnabled: false,
  quietHoursStart: '22:30',
  quietHoursEnd: '07:00',
};

export const loadSettings = async (): Promise<TransitSettings> => {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      return defaultSettings;
    }
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return defaultSettings;
  }
};

export const saveSettings = async (settings: TransitSettings): Promise<void> => {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};
