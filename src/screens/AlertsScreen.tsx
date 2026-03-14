import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { colors } from '../theme/colors';
import {
  ProactiveAlert,
  clearProactiveAlerts,
  loadProactiveAlerts,
  markAllProactiveAlertsRead,
} from '../services/alertsService';
import { typography } from '../theme/typography';

const SEVERITY_UI: Record<ProactiveAlert['severity'], { label: string; bg: string; fg: string }> = {
  good: { label: 'OK', bg: '#DDF6E9', fg: '#146942' },
  watch: { label: 'WATCH', bg: '#FFF3D9', fg: '#7A5402' },
  warn: { label: 'WARN', bg: '#FFE7D8', fg: '#8A3C20' },
  critical: { label: 'CRIT', bg: '#F8DADF', fg: '#922A3E' },
  info: { label: 'INFO', bg: '#E4EFFA', fg: '#184A7A' },
};

const formatDateTime = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

type SeverityFilter = 'all' | ProactiveAlert['severity'];
type DateFilter = 'all' | 'today' | '7d';
type SortMode = 'newest' | 'oldest';

const AlertsScreen: React.FC = () => {
  const [alerts, setAlerts] = useState<ProactiveAlert[]>([]);
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [sortMode, setSortMode] = useState<SortMode>('newest');

  const refresh = useCallback(async () => {
    const data = await loadProactiveAlerts();
    setAlerts(data);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useFocusEffect(
    useCallback(() => {
      markAllProactiveAlertsRead();
      refresh();
    }, [refresh])
  );

  const unreadCount = useMemo(() => alerts.filter((item) => !item.isRead).length, [alerts]);
  const todayCount = useMemo(() => {
    const today = new Date().toDateString();
    return alerts.filter((item) => new Date(item.createdAt).toDateString() === today).length;
  }, [alerts]);

  const filteredAlerts = useMemo(() => {
    const now = new Date();

    const result = alerts.filter((item) => {
      if (severityFilter !== 'all' && item.severity !== severityFilter) {
        return false;
      }

      if (dateFilter === 'all') {
        return true;
      }

      const created = new Date(item.createdAt);
      if (dateFilter === 'today') {
        return created.toDateString() === now.toDateString();
      }

      const diffMs = now.getTime() - created.getTime();
      return diffMs <= 7 * 24 * 60 * 60 * 1000;
    });

    return result.sort((a, b) => {
      const diff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return sortMode === 'newest' ? diff : -diff;
    });
  }, [alerts, dateFilter, severityFilter, sortMode]);

  const handleClear = async () => {
    await clearProactiveAlerts();
    setAlerts([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Centro avvisi</Text>
          <Text style={styles.subtitle}>
            Oggi {todayCount} • {unreadCount > 0 ? `${unreadCount} non letti` : 'tutti letti'}
          </Text>
        </View>
        <Pressable style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearText}>Svuota</Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredAlerts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Ancora nessun alert critico registrato.</Text>}
        ListHeaderComponent={
          <View style={styles.filtersWrap}>
            <View style={styles.filterRow}>
              {(['all', 'critical', 'warn', 'watch', 'good', 'info'] as SeverityFilter[]).map((item) => (
                <Pressable
                  key={item}
                  style={[styles.filterChip, severityFilter === item ? styles.filterChipActive : null]}
                  onPress={() => setSeverityFilter(item)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      severityFilter === item ? styles.filterChipTextActive : null,
                    ]}
                  >
                    {item === 'all' ? 'Tutte' : item.toUpperCase()}
                  </Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.filterRow}>
              {(['all', 'today', '7d'] as DateFilter[]).map((item) => (
                <Pressable
                  key={item}
                  style={[styles.filterChip, dateFilter === item ? styles.filterChipActive : null]}
                  onPress={() => setDateFilter(item)}
                >
                  <Text style={[styles.filterChipText, dateFilter === item ? styles.filterChipTextActive : null]}>
                    {item === 'all' ? 'Periodo: Tutto' : item === 'today' ? 'Periodo: Oggi' : 'Periodo: 7 giorni'}
                  </Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.filterRow}>
              {(['newest', 'oldest'] as SortMode[]).map((item) => (
                <Pressable
                  key={item}
                  style={[styles.filterChip, sortMode === item ? styles.filterChipActive : null]}
                  onPress={() => setSortMode(item)}
                >
                  <Text style={[styles.filterChipText, sortMode === item ? styles.filterChipTextActive : null]}>
                    {item === 'newest' ? 'Ordina: Recenti' : 'Ordina: Vecchi'}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, !item.isRead ? styles.cardUnread : null]}>
            <View style={styles.cardTopRow}>
              <Text style={styles.cardTitle}>Commute</Text>
              <View style={[styles.badge, { backgroundColor: SEVERITY_UI[item.severity].bg }]}>
                <Text style={[styles.badgeText, { color: SEVERITY_UI[item.severity].fg }]}>
                  {SEVERITY_UI[item.severity].label}
                </Text>
              </View>
            </View>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.meta}>
              {item.nowDurationMinutes !== null ? `Now ${item.nowDurationMinutes} min` : 'Now n/d'}
              {item.deltaMinutes !== null ? ` • Delta +${item.deltaMinutes} min` : ''}
              {item.nextDepartureTime ? ` • Next ${item.nextDepartureTime}` : ''}
            </Text>
            <Text style={styles.time}>{formatDateTime(item.createdAt)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 18,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: typography.fontFamily,
  },
  clearButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: colors.surface,
  },
  clearText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
  },
  list: {
    gap: 10,
    paddingBottom: 26,
  },
  filtersWrap: {
    gap: 8,
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  filterChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  filterChipText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
  },
  filterChipTextActive: {
    color: colors.primaryDark,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 7,
  },
  cardUnread: {
    borderColor: colors.primary,
    backgroundColor: '#F2FAFB',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
    fontFamily: typography.fontFamily,
  },
  message: {
    color: colors.textPrimary,
    fontSize: 13,
    fontFamily: typography.fontFamily,
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12,
    fontFamily: typography.fontFamily,
  },
  time: {
    color: colors.textMuted,
    fontSize: 11,
    fontFamily: typography.fontFamily,
  },
  empty: {
    color: colors.textMuted,
    fontSize: 13,
    fontFamily: typography.fontFamily,
  },
});

export default AlertsScreen;
