import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import { Stop } from '../types/transit';
import {
  getDepartureStatusForStop,
  getModeLabel,
  getNearbyStops,
  getStopsByMode,
} from '../services/transitService';
import StopListItem from '../components/StopListItem';
import { useFavorites } from '../state/FavoritesContext';
import { RootStackParamList } from '../navigation/types';
import { getCurrentPosition } from '../services/locationService';
import RevealView from '../components/RevealView';
import SkeletonBlock from '../components/SkeletonBlock';

type DepartureStatus = {
  nextTwoHours: Array<{ time: string }>;
  firstAfterNow: { time: string } | null;
};

const DISTANCE_FILTERS: Array<{ key: 'all' | '800' | '1000'; label: string; meters?: number }> = [
  { key: 'all', label: 'Tutte' },
  { key: '800', label: 'Entro 800 m', meters: 800 },
  { key: '1000', label: 'Entro 1000 m', meters: 1000 },
];

const timeToMinutes = (time: string): number => {
  const [hh, mm] = time.split(':').map((part) => Number(part));
  return hh * 60 + mm;
};

const minutesUntil = (time: string): number => {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const target = timeToMinutes(time);
  return target >= nowMinutes ? target - nowMinutes : target + 24 * 60 - nowMinutes;
};

const ModeScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 980;
  const route = useRoute<RouteProp<RootStackParamList, 'Mode'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { mode } = route.params;
  const [stops, setStops] = useState<Stop[]>([]);
  const [query, setQuery] = useState('');
  const [distanceMap, setDistanceMap] = useState<Record<string, number>>({});
  const [statusMap, setStatusMap] = useState<Record<string, DepartureStatus>>({});
  const [position, setPosition] = useState<{ lat: number; lon: number } | null>(null);
  const [distanceFilter, setDistanceFilter] = useState<'all' | '800' | '1000'>('all');
  const [loading, setLoading] = useState(true);
  const [sortingByWait, setSortingByWait] = useState(true);
  const [locating, setLocating] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [error, setError] = useState('');
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [modeStops, nearbyStops] = await Promise.all([
        getStopsByMode(mode),
        position ? getNearbyStops(position.lat, position.lon) : Promise.resolve([]),
      ]);

      if (!position) {
        const alphaStops = [...modeStops].sort((a, b) => a.name.localeCompare(b.name));
        setStops(alphaStops);
        setDistanceMap({});
        setLoading(false);
        return;
      }

      const nearbyByMode = nearbyStops.filter((item) => item.stop.modes.includes(mode));
      const nextDistanceMap = nearbyByMode.reduce<Record<string, number>>((acc, item) => {
        acc[item.stop.id] = item.distance;
        return acc;
      }, {});

      const sortedStops = [...modeStops].sort((a, b) => {
        const da = nextDistanceMap[a.id] ?? Number.POSITIVE_INFINITY;
        const db = nextDistanceMap[b.id] ?? Number.POSITIVE_INFINITY;
        if (da !== db) {
          return da - db;
        }
        return a.name.localeCompare(b.name);
      });

      setDistanceMap(nextDistanceMap);
      setStops(sortedStops);
      setLoading(false);
    };

    load();
  }, [mode, position]);

  useEffect(() => {
    const loadStatuses = async () => {
      if (stops.length === 0) {
        setStatusMap({});
        return;
      }

      setLoadingStatus(true);
      const targets = stops.slice(0, 60);
      const entries = await Promise.all(
        targets.map(async (stop) => {
          const status = await getDepartureStatusForStop(stop.id);
          return [stop.id, status] as const;
        })
      );

      setStatusMap(Object.fromEntries(entries));
      setLoadingStatus(false);
    };

    loadStatuses();
  }, [stops]);

  const filteredStops = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const distanceLimit = DISTANCE_FILTERS.find((item) => item.key === distanceFilter)?.meters;

    const searched = stops.filter((stop) => {
      const byName = stop.name.toLowerCase().includes(normalized);
      const byArea = stop.area.toLowerCase().includes(normalized);
      const byLine = stop.lines.some((line) => line.toLowerCase().includes(normalized));
      return normalized ? byName || byArea || byLine : true;
    });

    const ranged = distanceLimit
      ? searched.filter((stop) => {
          const dist = distanceMap[stop.id];
          return dist !== undefined && dist <= distanceLimit;
        })
      : searched;

    if (!sortingByWait) {
      return ranged;
    }

    return [...ranged].sort((a, b) => {
      const aTime = statusMap[a.id]?.nextTwoHours?.[0]?.time;
      const bTime = statusMap[b.id]?.nextTwoHours?.[0]?.time;

      const aWait = aTime ? minutesUntil(aTime) : Number.POSITIVE_INFINITY;
      const bWait = bTime ? minutesUntil(bTime) : Number.POSITIVE_INFINITY;

      if (aWait !== bWait) {
        return aWait - bWait;
      }

      const da = distanceMap[a.id] ?? Number.POSITIVE_INFINITY;
      const db = distanceMap[b.id] ?? Number.POSITIVE_INFINITY;
      if (da !== db) {
        return da - db;
      }

      return a.name.localeCompare(b.name);
    });
  }, [query, stops, distanceFilter, distanceMap, sortingByWait, statusMap]);

  const handleUseLocation = async () => {
    setLocating(true);
    setError('');
    try {
      const current = await getCurrentPosition();
      setPosition(current);
    } catch {
      setError('Posizione non disponibile. Verifica i permessi del browser.');
    } finally {
      setLocating(false);
    }
  };

  const subtitle = position
    ? 'Fermate ordinate in base alla tua posizione. Tocca una fermata per vedere passaggi e direzioni.'
    : 'Cerca una fermata o linea. Attiva la posizione per vedere prima le fermate vicine.';

  return (
    <View style={styles.container}>
      <View style={[styles.contentWrap, isDesktop ? styles.contentWrapDesktop : null]}>
      <RevealView delay={20}>
        <Text style={styles.title}>{getModeLabel(mode)}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </RevealView>

      <RevealView delay={70}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={`Cerca ${getModeLabel(mode).toLowerCase()} per linea o fermata`}
          placeholderTextColor={colors.textMuted}
          style={styles.input}
        />
      </RevealView>

      <RevealView delay={110}>
        <View style={styles.filtersRow}>
          {DISTANCE_FILTERS.map((item) => (
            <Pressable
              key={item.key}
              style={[styles.chip, distanceFilter === item.key ? styles.chipActive : null]}
              onPress={() => setDistanceFilter(item.key)}
            >
              <Text style={[styles.chipText, distanceFilter === item.key ? styles.chipTextActive : null]}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </RevealView>

      <Pressable style={styles.secondaryButton} onPress={() => setSortingByWait((prev) => !prev)}>
        <Text style={styles.secondaryText}>
          {sortingByWait ? 'Ordinamento: attesa piu breve' : 'Ordinamento: alfabetico/distanza'}
        </Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={handleUseLocation} disabled={locating}>
        <Text style={styles.secondaryText}>{locating ? 'Rilevo posizione...' : 'Usa la mia posizione'}</Text>
      </Pressable>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loadingStatus ? <Text style={styles.hint}>Aggiorno i tempi di attesa...</Text> : null}

      <RevealView delay={170} style={styles.resultsWrap}>
        {loading ? (
          <View style={styles.list}>
            <SkeletonBlock style={styles.skeletonCard} />
            <SkeletonBlock style={styles.skeletonCard} />
            <SkeletonBlock style={styles.skeletonCard} />
          </View>
        ) : (
          <FlatList
            data={filteredStops}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            ListEmptyComponent={<Text style={styles.empty}>Nessuna fermata trovata per la ricerca.</Text>}
            renderItem={({ item }) => (
              <StopListItem
                stop={{
                  ...item,
                  nextArrivals:
                    statusMap[item.id]?.nextTwoHours?.length > 0
                      ? statusMap[item.id].nextTwoHours.slice(0, 2).map((dep) => dep.time)
                      : statusMap[item.id]?.firstAfterNow
                        ? ['Nessuna corsa entro 2h', `Prima utile ${statusMap[item.id].firstAfterNow?.time}`]
                        : item.nextArrivals,
                  area:
                    distanceMap[item.id] !== undefined
                      ? `${item.area} • ${Math.round(distanceMap[item.id])} m`
                      : item.area,
                }}
                isFavorite={isFavorite(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
                onPress={() => navigation.navigate('StopDetails', { stopId: item.id })}
              />
            )}
          />
        )}
      </RevealView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: '#E7F2EE',
  },
  chipText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextActive: {
    color: colors.primary,
  },
  secondaryButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
  },
  secondaryText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  error: {
    color: colors.danger,
    fontSize: 12,
  },
  hint: {
    color: colors.textMuted,
    fontSize: 12,
  },
  list: {
    gap: 12,
    paddingBottom: 24,
  },
  resultsWrap: {
    minHeight: 180,
  },
  skeletonCard: {
    height: 94,
    borderRadius: 18,
  },
  empty: {
    color: colors.textMuted,
  },
});

export default ModeScreen;
