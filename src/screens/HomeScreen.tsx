import React, { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ModeCard from '../components/ModeCard';
import StopListItem from '../components/StopListItem';
import { colors } from '../theme/colors';
import { Stop, TransitMode } from '../types/transit';
import { getFeaturedStops, getModes, getTransitQualityInsights } from '../services/transitService';
import { useFavorites } from '../state/FavoritesContext';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RevealView from '../components/RevealView';
import SkeletonBlock from '../components/SkeletonBlock';
import { typography } from '../theme/typography';
import { loadSettings } from '../services/settingsService';
import { CommuteAlert } from '../types/routing';
import { getCommuteAlert } from '../services/routingService';
import { storeCommuteAlertIfImportant } from '../services/alertsService';
import { maybeNotifyAlert } from '../services/notificationsService';

const SEVERITY_CONFIG: Record<CommuteAlert['severity'], { label: string; bg: string; fg: string }> = {
  good: { label: 'OK', bg: '#DDF6E9', fg: '#146942' },
  watch: { label: 'WATCH', bg: '#FFF3D9', fg: '#7A5402' },
  warn: { label: 'WARN', bg: '#FFE7D8', fg: '#8A3C20' },
  critical: { label: 'CRIT', bg: '#F8DADF', fg: '#922A3E' },
  info: { label: 'INFO', bg: '#E4EFFA', fg: '#184A7A' },
};

const HomeScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 980;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [modes, setModes] = useState<TransitMode[]>([]);
  const [featuredStops, setFeaturedStops] = useState<Stop[]>([]);
  const [qualityScore, setQualityScore] = useState<number | null>(null);
  const [qualityMessage, setQualityMessage] = useState('');
  const [commuteReady, setCommuteReady] = useState(false);
  const [commuteAlert, setCommuteAlert] = useState<CommuteAlert | null>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [nextModes, nextStops, insights, settings] = await Promise.all([
        getModes(),
        getFeaturedStops(),
        getTransitQualityInsights(),
        loadSettings(),
      ]);

      let nextCommuteAlert: CommuteAlert | null = null;
      if (settings.smartAlertsEnabled && settings.homePlace && settings.workPlace) {
        try {
          nextCommuteAlert = await getCommuteAlert({
            fromLat: settings.homePlace.lat,
            fromLon: settings.homePlace.lon,
            toLat: settings.workPlace.lat,
            toLon: settings.workPlace.lon,
          });
          const stored = await storeCommuteAlertIfImportant(nextCommuteAlert);
          await maybeNotifyAlert(stored);
        } catch {
          nextCommuteAlert = null;
        }
      }

      setModes(nextModes);
      setFeaturedStops(nextStops);
      setQualityScore(insights.score);
      setQualityMessage(insights.message);
      setCommuteReady(Boolean(settings.homePlace && settings.workPlace));
      setCommuteAlert(nextCommuteAlert);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.ambientOrbA} />
      <View style={styles.ambientOrbB} />
      <View style={[styles.contentWrap, isDesktop ? styles.contentWrapDesktop : null]}>
        <RevealView delay={20}>
          <View style={styles.heroCard}>
            <View style={styles.heroBlobPrimary} />
            <View style={styles.heroBlobSecondary} />
            {Platform.OS === 'web' && isDesktop ? <View style={styles.heroMeshA} /> : null}
            {Platform.OS === 'web' && isDesktop ? <View style={styles.heroMeshB} /> : null}
            <Text style={styles.kicker}>NAPOLI TRANSIT</Text>
            <Text style={styles.title}>Muoviti a Napoli con stile</Text>
            <Text style={styles.subtitle}>Orari, linee e arrivi in tempo reale con ricerca smart.</Text>
          </View>
        </RevealView>

        <RevealView delay={70}>
          <View style={styles.quickRow}>
            <Pressable
              style={({ pressed }) => [styles.quickButton, pressed ? styles.quickButtonPressed : null]}
              onPress={() => navigation.navigate('Tabs', { screen: 'Search' })}
            >
              <Text style={styles.quickBadge}>FAST</Text>
              <Text style={styles.quickText}>Cerca</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.quickButton, pressed ? styles.quickButtonPressed : null]}
              onPress={() => navigation.navigate('Tabs', { screen: 'Route' })}
            >
              <Text style={styles.quickBadge}>AIUTO</Text>
              <Text style={styles.quickText}>Percorso</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.quickButton, pressed ? styles.quickButtonPressed : null]}
              onPress={() => navigation.navigate('Tabs', { screen: 'Map' })}
            >
              <Text style={styles.quickBadge}>LIVE</Text>
              <Text style={styles.quickText}>Mappa</Text>
            </Pressable>
          </View>
        </RevealView>

        <RevealView delay={120}>
          <View style={styles.pulseCard}>
            <View style={styles.pulseTopRow}>
              <Text style={styles.pulseTitle}>Transit Pulse</Text>
              <View style={styles.pulseBadge}>
                <Text style={styles.pulseBadgeText}>{qualityScore ?? '--'}/100</Text>
              </View>
            </View>
            <Text style={styles.pulseMessage}>{qualityMessage || 'Caricamento insight in corso...'}</Text>
            <View style={styles.pulseActions}>
              <Pressable
                style={({ pressed }) => [styles.pulseActionButton, pressed ? styles.quickButtonPressed : null]}
                onPress={() => navigation.navigate('Tabs', { screen: 'Route' })}
              >
                <Text style={styles.pulseActionText}>
                  {commuteReady ? 'Avvia commute smart' : 'Configura commute smart'}
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [styles.pulseActionButtonAlt, pressed ? styles.quickButtonPressed : null]}
                onPress={() => navigation.navigate('Tabs', { screen: 'Settings' })}
              >
                <Text style={styles.pulseActionTextAlt}>Apri impostazioni pro</Text>
              </Pressable>
            </View>
          </View>
        </RevealView>

        <RevealView delay={145}>
          {commuteAlert ? (
            <View style={styles.alertCard}>
              <View style={styles.alertTopRow}>
                <Text style={styles.alertTitle}>Commute Alert</Text>
                <View
                  style={[
                    styles.alertSeverity,
                    {
                      backgroundColor: SEVERITY_CONFIG[commuteAlert.severity].bg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.alertSeverityText,
                      {
                        color: SEVERITY_CONFIG[commuteAlert.severity].fg,
                      },
                    ]}
                  >
                    {SEVERITY_CONFIG[commuteAlert.severity].label}
                  </Text>
                </View>
              </View>
              <Text style={styles.alertMessage}>{commuteAlert.message}</Text>
              <Text style={styles.alertMeta}>
                {commuteAlert.nowDurationMinutes !== null
                  ? `Now ${commuteAlert.nowDurationMinutes} min`
                  : 'Now n/d'}
                {commuteAlert.deltaMinutes !== null ? ` • Delta +${commuteAlert.deltaMinutes} min` : ''}
                {commuteAlert.nextDepartureTime ? ` • Next ${commuteAlert.nextDepartureTime}` : ''}
              </Text>
              <Pressable
                style={({ pressed }) => [styles.alertAction, pressed ? styles.quickButtonPressed : null]}
                onPress={() => navigation.navigate('Tabs', { screen: 'Route' })}
              >
                <Text style={styles.alertActionText}>Apri Route Planner</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [styles.alertActionAlt, pressed ? styles.quickButtonPressed : null]}
                onPress={() => navigation.navigate('Tabs', { screen: 'Alerts' })}
              >
                <Text style={styles.alertActionTextAlt}>Apri Centro Avvisi</Text>
              </Pressable>
            </View>
          ) : null}
        </RevealView>

        <RevealView delay={160}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Modalita</Text>
            <View style={styles.modeGrid}>
              {modes.map((mode) => (
                <ModeCard
                  key={mode}
                  mode={mode}
                  onPress={() => navigation.navigate('Mode', { mode })}
                />
              ))}
            </View>
          </View>
        </RevealView>

        <RevealView delay={210}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fermate popolari</Text>
            {loading ? (
              <View style={styles.list}>
                <SkeletonBlock style={styles.skeletonCard} />
                <SkeletonBlock style={styles.skeletonCard} />
                <SkeletonBlock style={styles.skeletonCard} />
              </View>
            ) : (
              <View style={styles.list}>
                {featuredStops.map((stop) => (
                  <StopListItem
                    key={stop.id}
                    stop={stop}
                    isFavorite={isFavorite(stop.id)}
                    onToggleFavorite={() => toggleFavorite(stop.id)}
                    onPress={() => navigation.navigate('StopDetails', { stopId: stop.id })}
                  />
                ))}
              </View>
            )}
          </View>
        </RevealView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  ambientOrbA: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    top: -140,
    left: -110,
    backgroundColor: '#D6EEF4',
    opacity: 0.65,
  },
  ambientOrbB: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    top: 180,
    right: -120,
    backgroundColor: '#FFE5CF',
    opacity: 0.55,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 120,
    backgroundColor: colors.background,
  },
  contentWrap: {
    width: '100%',
    gap: 20,
  },
  contentWrapDesktop: {
    maxWidth: 980,
    alignSelf: 'center',
  },
  heroCard: {
    backgroundColor: '#0A626A',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#4EA7AE',
    padding: 22,
    minHeight: 205,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOpacity: 0.28,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 9,
  },
  heroBlobPrimary: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    right: -35,
    top: -45,
    backgroundColor: '#1E8E96',
    opacity: 0.5,
  },
  heroBlobSecondary: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    right: 65,
    top: 75,
    backgroundColor: '#F3A75C',
    opacity: 0.26,
  },
  heroMeshA: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    left: -60,
    bottom: -90,
    backgroundColor: '#6FD0CE',
    opacity: 0.18,
  },
  heroMeshB: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    right: 25,
    top: 15,
    backgroundColor: '#FFD2A1',
    opacity: 0.12,
  },
  kicker: {
    color: '#CFE9EC',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  title: {
    fontSize: 35,
    fontWeight: '800',
    fontFamily: typography.fontFamily,
    color: '#F5FDFF',
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: typography.fontFamily,
    color: '#CFE3E6',
    marginTop: 10,
    maxWidth: '86%',
  },
  section: {
    gap: 12,
  },
  alertCard: {
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 10,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 13,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
  },
  alertTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 15,
    fontFamily: typography.fontFamily,
  },
  alertSeverity: {
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  alertSeverityText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: typography.fontFamily,
  },
  alertMessage: {
    color: colors.textPrimary,
    fontSize: 13,
    fontFamily: typography.fontFamily,
  },
  alertMeta: {
    color: colors.textMuted,
    fontSize: 12,
    fontFamily: typography.fontFamily,
  },
  alertAction: {
    alignSelf: 'flex-start',
    borderRadius: 11,
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  alertActionAlt: {
    alignSelf: 'flex-start',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  alertActionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
  },
  alertActionTextAlt: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
  },
  pulseCard: {
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 11,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 13,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
  },
  pulseTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pulseTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 16,
    fontFamily: typography.fontFamily,
  },
  pulseBadge: {
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pulseBadgeText: {
    color: colors.primaryDark,
    fontWeight: '700',
    fontSize: 12,
    fontFamily: typography.fontFamily,
  },
  pulseMessage: {
    color: colors.textMuted,
    fontSize: 13,
    fontFamily: typography.fontFamily,
  },
  pulseActions: {
    flexDirection: 'row',
    gap: 10,
  },
  pulseActionButton: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  pulseActionButtonAlt: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  pulseActionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
  },
  pulseActionTextAlt: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
  },
  quickRow: {
    flexDirection: 'row',
    gap: 10,
  },
  quickButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: 5,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  quickButtonPressed: {
    transform: [{ scale: 0.985 }],
    shadowOpacity: 0.16,
  },
  quickBadge: {
    fontSize: 10.5,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
    letterSpacing: 0.8,
    color: colors.primary,
  },
  quickText: {
    color: colors.textPrimary,
    fontWeight: '800',
    fontSize: 14,
    fontFamily: typography.fontFamily,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: typography.fontFamily,
    color: colors.textPrimary,
    letterSpacing: 0.15,
  },
  modeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  list: {
    gap: 12,
  },
  skeletonCard: {
    height: 94,
    borderRadius: 18,
  },
});

export default HomeScreen;
