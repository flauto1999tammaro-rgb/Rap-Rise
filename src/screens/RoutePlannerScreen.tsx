import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

import { colors } from '../theme/colors';
import { GeocodeResult, reverseGeocode, searchPlaces } from '../services/geocodingService';
import { getCurrentPosition } from '../services/locationService';
import { planTrip } from '../services/routingService';
import RouteOptionCard from '../components/RouteOptionCard';
import { RoutePlan } from '../types/routing';
import RevealView from '../components/RevealView';
import SkeletonBlock from '../components/SkeletonBlock';
import { typography } from '../theme/typography';
import { SavedPlace, loadSettings } from '../services/settingsService';

const toSelection = (prefix: string, place: SavedPlace): GeocodeResult => ({
  id: `${prefix}-${place.label.toLowerCase().replace(/\s+/g, '-')}`,
  label: place.label,
  lat: place.lat,
  lon: place.lon,
});

const parseTimeToMinutes = (time: string): number | null => {
  const [hh, mm] = time.split(':');
  if (!hh || !mm) {
    return null;
  }
  const h = Number(hh);
  const m = Number(mm);
  if (!Number.isFinite(h) || !Number.isFinite(m)) {
    return null;
  }
  return h * 60 + m;
};

const RoutePlannerScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 980;
  const [originQuery, setOriginQuery] = useState('');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [originResults, setOriginResults] = useState<GeocodeResult[]>([]);
  const [destinationResults, setDestinationResults] = useState<GeocodeResult[]>([]);
  const [origin, setOrigin] = useState<GeocodeResult | null>(null);
  const [destination, setDestination] = useState<GeocodeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<RoutePlan[]>([]);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [goNowAdvice, setGoNowAdvice] = useState('');
  const [homePlace, setHomePlace] = useState<SavedPlace | null>(null);
  const [workPlace, setWorkPlace] = useState<SavedPlace | null>(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const results = await searchPlaces(originQuery);
      setOriginResults(results);
    }, 400);

    return () => clearTimeout(timer);
  }, [originQuery]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const results = await searchPlaces(destinationQuery);
      setDestinationResults(results);
    }, 400);

    return () => clearTimeout(timer);
  }, [destinationQuery]);

  useEffect(() => {
    const hydrate = async () => {
      const settings = await loadSettings();
      setHomePlace(settings.homePlace);
      setWorkPlace(settings.workPlace);
    };
    hydrate();
  }, []);

  const handleUseMyLocation = async () => {
    setError('');
    try {
      const position = await getCurrentPosition();
      const label = await reverseGeocode(position.lat, position.lon);
      const selection = { id: 'me', label, lat: position.lat, lon: position.lon };
      setOrigin(selection);
      setOriginQuery(label);
      setOriginResults([]);
    } catch {
      setError('Permesso posizione negato o GPS non disponibile.');
    }
  };

  const handlePlan = async () => {
    if (!origin || !destination) {
      setError('Inserisci origine e destinazione.');
      setInfo('');
      return;
    }

    setError('');
    setInfo('');
    setGoNowAdvice('');
    setLoading(true);
    try {
      const results = await planTrip({
        fromLat: origin.lat,
        fromLon: origin.lon,
        toLat: destination.lat,
        toLon: destination.lon,
      });
      setPlans(results);
      if (results[0]?.advisory) {
        setInfo(results[0].advisory);
      }
      const firstLeg = results[0]?.legs?.[0];
      if (firstLeg?.startTime) {
        const now = new Date();
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        const departureMinutes = parseTimeToMinutes(firstLeg.startTime);
        if (departureMinutes !== null) {
          const rawWait = departureMinutes - nowMinutes;
          const waitMinutes = rawWait >= 0 ? rawWait : rawWait + 24 * 60;
          if (waitMinutes <= 5) {
            setGoNowAdvice('Go now: la prossima corsa parte praticamente subito.');
          } else if (waitMinutes <= 20) {
            setGoNowAdvice(`Pronti a partire: hai circa ${waitMinutes} minuti prima della prima corsa.`);
          } else {
            setGoNowAdvice(`Partenza comoda: la prima corsa utile e tra ${waitMinutes} minuti.`);
          }
        }
      }
      if (results.length === 0) {
        setError('Nessun percorso trovato. Attiva OTP per percorsi completi.');
      }
    } catch {
      setPlans([]);
      setInfo('');
      setGoNowAdvice('');
      setError('Impossibile calcolare il percorso. Controlla il backend.');
    } finally {
      setLoading(false);
    }
  };

  const handleSmartCommute = async (type: 'home-work' | 'here-home' | 'here-work') => {
    if (!homePlace || !workPlace) {
      setError('Configura casa e lavoro in Impostazioni per usare commute smart.');
      return;
    }

    setError('');
    setInfo('Composizione tragitto smart in corso...');

    if (type === 'home-work') {
      const nextOrigin = toSelection('home', homePlace);
      const nextDestination = toSelection('work', workPlace);
      setOrigin(nextOrigin);
      setOriginQuery(nextOrigin.label);
      setDestination(nextDestination);
      setDestinationQuery(nextDestination.label);
      setInfo('Percorso casa-lavoro pronto. Premi Calcola percorso.');
      return;
    }

    try {
      const me = await getCurrentPosition();
      const meLabel = await reverseGeocode(me.lat, me.lon);
      const meSelection = { id: 'me', label: meLabel, lat: me.lat, lon: me.lon };
      const target = type === 'here-home' ? homePlace : workPlace;
      const targetSelection = toSelection(type === 'here-home' ? 'home' : 'work', target);
      setOrigin(meSelection);
      setOriginQuery(meSelection.label);
      setDestination(targetSelection);
      setDestinationQuery(targetSelection.label);
      setInfo('Percorso smart pronto. Premi Calcola percorso.');
    } catch {
      setError('Non riesco a leggere la posizione attuale per il commute smart.');
      setInfo('');
    }
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <View style={[styles.contentWrap, isDesktop ? styles.contentWrapDesktop : null]}>
      <RevealView delay={20}>
        <View style={styles.heroCard}>
          <Text style={styles.kicker}>ROUTE STUDIO</Text>
          <Text style={styles.title}>Da A a B</Text>
          <Text style={styles.subtitle}>Inserisci origine e destinazione per il percorso completo.</Text>
        </View>
      </RevealView>

      {homePlace && workPlace ? (
        <RevealView delay={45}>
          <View style={styles.smartRow}>
            <Pressable style={styles.smartButton} onPress={() => handleSmartCommute('home-work')}>
              <Text style={styles.smartButtonText}>Casa {'->'} Lavoro</Text>
            </Pressable>
            <Pressable style={styles.smartButton} onPress={() => handleSmartCommute('here-home')}>
              <Text style={styles.smartButtonText}>Qui {'->'} Casa</Text>
            </Pressable>
            <Pressable style={styles.smartButton} onPress={() => handleSmartCommute('here-work')}>
              <Text style={styles.smartButtonText}>Qui {'->'} Lavoro</Text>
            </Pressable>
          </View>
        </RevealView>
      ) : null}

      <RevealView delay={70}>
        <View style={styles.field}>
          <Text style={styles.label}>Origine</Text>
          <TextInput
            value={originQuery}
            onChangeText={(text) => {
              setOriginQuery(text);
              setOrigin(null);
            }}
            placeholder="Es. Piazza Garibaldi"
            placeholderTextColor={colors.textMuted}
            style={styles.input}
          />
          <Pressable style={styles.secondaryButton} onPress={handleUseMyLocation}>
            <Text style={styles.secondaryText}>Usa la mia posizione</Text>
          </Pressable>
          {originResults.length > 0 ? (
            <View style={styles.resultList}>
              {originResults.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.resultRow}
                  onPress={() => {
                    setOrigin(item);
                    setOriginQuery(item.label);
                    setOriginResults([]);
                  }}
                >
                  <Text style={styles.resultText}>{item.label}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
      </RevealView>

      <RevealView delay={120}>
        <View style={styles.field}>
          <Text style={styles.label}>Destinazione</Text>
          <TextInput
            value={destinationQuery}
            onChangeText={(text) => {
              setDestinationQuery(text);
              setDestination(null);
            }}
            placeholder="Es. Universita Federico II"
            placeholderTextColor={colors.textMuted}
            style={styles.input}
          />
          {destinationResults.length > 0 ? (
            <View style={styles.resultList}>
              {destinationResults.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.resultRow}
                  onPress={() => {
                    setDestination(item);
                    setDestinationQuery(item.label);
                    setDestinationResults([]);
                  }}
                >
                  <Text style={styles.resultText}>{item.label}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
      </RevealView>

      <RevealView delay={170}>
        <Pressable style={styles.primaryButton} onPress={handlePlan}>
          <Text style={styles.primaryText}>Calcola percorso</Text>
        </Pressable>
      </RevealView>

      {info ? <Text style={styles.info}>{info}</Text> : null}
      {goNowAdvice ? <Text style={styles.goNow}>{goNowAdvice}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <RevealView delay={220} style={styles.resultsWrap}>
        {loading ? (
          <View style={styles.list}>
            <SkeletonBlock style={styles.skeletonCard} />
            <SkeletonBlock style={styles.skeletonCard} />
          </View>
        ) : (
          <View style={styles.list}>
            {plans.map((item) => (
              <RouteOptionCard key={item.id} plan={item} />
            ))}
          </View>
        )}
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
  container: {
    flexGrow: 1,
    padding: 18,
    paddingBottom: 100,
    backgroundColor: colors.background,
  },
  contentWrap: {
    width: '100%',
    gap: 16,
  },
  contentWrapDesktop: {
    maxWidth: 980,
    alignSelf: 'center',
  },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  smartRow: {
    flexDirection: 'row',
    gap: 8,
  },
  smartButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: 10,
    alignItems: 'center',
  },
  smartButtonText: {
    color: colors.textPrimary,
    fontSize: 11.5,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
  },
  kicker: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
    letterSpacing: 0.9,
    color: colors.primary,
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: 5,
    fontSize: 13.5,
    fontFamily: typography.fontFamily,
    color: colors.textMuted,
  },
  field: {
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },
  label: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: typography.fontFamily,
  },
  input: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
  },
  secondaryText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
  },
  primaryButton: {
    backgroundColor: colors.primaryDark,
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.3,
    fontFamily: typography.fontFamily,
  },
  resultRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontFamily: typography.fontFamily,
  },
  resultList: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  list: {
    gap: 12,
    paddingBottom: 24,
  },
  resultsWrap: {
    minHeight: 180,
  },
  skeletonCard: {
    height: 162,
    borderRadius: 20,
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    fontFamily: typography.fontFamily,
  },
  info: {
    color: colors.success,
    fontSize: 12,
    fontFamily: typography.fontFamily,
  },
  goNow: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
  },
});

export default RoutePlannerScreen;
