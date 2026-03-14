import AsyncStorage from '@react-native-async-storage/async-storage';

import { CommuteAlert } from '../types/routing';

export type ProactiveAlert = {
  id: string;
  source: 'commute';
  severity: CommuteAlert['severity'];
  message: string;
  deltaMinutes: number | null;
  nowDurationMinutes: number | null;
  nextDepartureTime: string | null;
  score: number;
  createdAt: string;
  isRead: boolean;
};

const ALERTS_KEY = 'napoli-transit.proactive-alerts.v1';
const MAX_ALERTS = 60;
const listeners = new Set<() => void>();

const notifyAlertChange = () => {
  listeners.forEach((listener) => listener());
};

const createAlertId = (alert: CommuteAlert) => {
  const stamp = new Date().toISOString().slice(0, 16);
  return `commute-${alert.severity}-${alert.deltaMinutes ?? 'na'}-${alert.score}-${stamp}`;
};

export const loadProactiveAlerts = async (): Promise<ProactiveAlert[]> => {
  try {
    const raw = await AsyncStorage.getItem(ALERTS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as ProactiveAlert[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveAlerts = async (alerts: ProactiveAlert[]): Promise<void> => {
  await AsyncStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
  notifyAlertChange();
};

export const clearProactiveAlerts = async (): Promise<void> => {
  await AsyncStorage.removeItem(ALERTS_KEY);
  notifyAlertChange();
};

export const getUnreadProactiveAlertsCount = async (): Promise<number> => {
  const alerts = await loadProactiveAlerts();
  return alerts.filter((item) => !item.isRead).length;
};

export const subscribeToAlertChanges = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const markAllProactiveAlertsRead = async (): Promise<void> => {
  const current = await loadProactiveAlerts();
  if (current.length === 0) {
    return;
  }
  const next = current.map((item) => ({ ...item, isRead: true }));
  await saveAlerts(next);
};

export const storeCommuteAlertIfImportant = async (alert: CommuteAlert): Promise<ProactiveAlert | null> => {
  if (alert.severity !== 'warn' && alert.severity !== 'critical') {
    return null;
  }

  const entry: ProactiveAlert = {
    id: createAlertId(alert),
    source: 'commute',
    severity: alert.severity,
    message: alert.message,
    deltaMinutes: alert.deltaMinutes,
    nowDurationMinutes: alert.nowDurationMinutes,
    nextDepartureTime: alert.nextDepartureTime,
    score: alert.score,
    createdAt: new Date().toISOString(),
    isRead: false,
  };

  const current = await loadProactiveAlerts();
  if (current.some((item) => item.id === entry.id)) {
    return null;
  }

  const next = [entry, ...current].slice(0, MAX_ALERTS);
  await saveAlerts(next);
  return entry;
};
