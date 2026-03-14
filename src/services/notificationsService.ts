import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { ProactiveAlert } from './alertsService';
import { loadSettings } from './settingsService';

const LAST_NOTIFICATION_AT_KEY = 'napoli-transit.last-notification-at';
const COOLDOWN_BY_SEVERITY: Record<ProactiveAlert['severity'], number> = {
  critical: 20 * 60 * 1000,
  warn: 12 * 60 * 1000,
  watch: 0,
  good: 0,
  info: 0,
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const notificationsSupported = Platform.OS !== 'web';

const parseTimeToMinutes = (value: string): number | null => {
  const match = value.trim().match(/^(\d{2}):(\d{2})$/);
  if (!match) {
    return null;
  }
  const hh = Number(match[1]);
  const mm = Number(match[2]);
  if (!Number.isFinite(hh) || !Number.isFinite(mm) || hh < 0 || hh > 23 || mm < 0 || mm > 59) {
    return null;
  }
  return hh * 60 + mm;
};

const isQuietHoursNow = (start: string, end: string): boolean => {
  const startMinutes = parseTimeToMinutes(start);
  const endMinutes = parseTimeToMinutes(end);
  if (startMinutes === null || endMinutes === null) {
    return false;
  }

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  if (startMinutes === endMinutes) {
    return true;
  }

  if (startMinutes < endMinutes) {
    return nowMinutes >= startMinutes && nowMinutes < endMinutes;
  }

  return nowMinutes >= startMinutes || nowMinutes < endMinutes;
};

export const ensureNotificationPermission = async (): Promise<boolean> => {
  if (!notificationsSupported) {
    return false;
  }

  const existing = await Notifications.getPermissionsAsync();
  if (existing.granted || existing.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
    return true;
  }

  const requested = await Notifications.requestPermissionsAsync();
  return Boolean(
    requested.granted || requested.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
};

const canNotifyNow = async (severity: ProactiveAlert['severity']): Promise<boolean> => {
  const cooldownMs = COOLDOWN_BY_SEVERITY[severity] || 0;
  if (cooldownMs <= 0) {
    return false;
  }

  try {
    const key = `${LAST_NOTIFICATION_AT_KEY}:${severity}`;
    const raw = await AsyncStorage.getItem(key);
    if (!raw) {
      return true;
    }
    const last = Number(raw);
    if (!Number.isFinite(last)) {
      return true;
    }
    return Date.now() - last >= cooldownMs;
  } catch {
    return true;
  }
};

const markNotifiedNow = async (severity: ProactiveAlert['severity']): Promise<void> => {
  const key = `${LAST_NOTIFICATION_AT_KEY}:${severity}`;
  await AsyncStorage.setItem(key, String(Date.now()));
};

const shouldNotifyByPolicy = (
  policy: 'off' | 'critical-only' | 'critical-and-warn',
  severity: ProactiveAlert['severity']
) => {
  if (policy === 'off') {
    return false;
  }
  if (policy === 'critical-only') {
    return severity === 'critical';
  }
  return severity === 'critical' || severity === 'warn';
};

export const maybeNotifyAlert = async (alert: ProactiveAlert | null): Promise<void> => {
  if (!alert) {
    return;
  }

  if (!notificationsSupported) {
    return;
  }

  const settings = await loadSettings();
  if (!shouldNotifyByPolicy(settings.notificationPolicy, alert.severity)) {
    return;
  }

  if (settings.quietHoursEnabled && isQuietHoursNow(settings.quietHoursStart, settings.quietHoursEnd)) {
    return;
  }

  const hasPermission = await ensureNotificationPermission();
  if (!hasPermission) {
    return;
  }

  const allowedByCooldown = await canNotifyNow(alert.severity);
  if (!allowedByCooldown) {
    return;
  }

  const title = alert.severity === 'critical' ? 'Commute critica' : 'Commute rallentata';

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: alert.message,
      data: {
        targetTab: 'Alerts',
        source: `${alert.severity}-commute`,
      },
      sound: true,
    },
    trigger: null,
  });

  await markNotifiedNow(alert.severity);
};

export const subscribeToNotificationRouting = (
  onOpenAlerts: () => void
): (() => void) => {
  if (!notificationsSupported) {
    return () => {};
  }

  const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
    const data = response.notification.request.content.data as { targetTab?: string } | undefined;
    if (data?.targetTab === 'Alerts') {
      onOpenAlerts();
    }
  });

  return () => {
    subscription.remove();
  };
};
