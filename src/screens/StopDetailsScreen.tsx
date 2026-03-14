import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { colors } from '../theme/colors';
import { Departure, Stop } from '../types/transit';
import { getDeparturesForStop, getStopById } from '../services/transitService';
import { useFavorites } from '../state/FavoritesContext';
import { RootStackParamList } from '../navigation/types';
import RevealView from '../components/RevealView';
import SkeletonBlock from '../components/SkeletonBlock';
import TransitIcon from '../components/TransitIcon';

const StopDetailsScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 980;
  const route = useRoute<RouteProp<RootStackParamList, 'StopDetails'>>();
  const { stopId } = route.params;
  const [stop, setStop] = useState<Stop | null>(null);
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [stopData, nextDepartures] = await Promise.all([
        getStopById(stopId),
        getDeparturesForStop(stopId),
      ]);
      setStop(stopData);
      setDepartures(nextDepartures);
      setLoading(false);
    };

    load();
  }, [stopId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <View style={[styles.contentWrap, isDesktop ? styles.contentWrapDesktop : null]}>
          <SkeletonBlock style={styles.skeletonHero} />
          <SkeletonBlock style={styles.skeletonRow} />
          <SkeletonBlock style={styles.skeletonRow} />
        </View>
      </View>
    );
  }

  if (!stop) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Fermata non trovata.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.contentWrap, isDesktop ? styles.contentWrapDesktop : null]}>
      <RevealView delay={20}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{stop.name}</Text>
            <Text style={styles.subtitle}>{`${stop.area} • ${stop.lines.join(', ')}`}</Text>
          </View>
          <Pressable style={styles.favorite} onPress={() => toggleFavorite(stop.id)}>
            <TransitIcon
              name="favorites"
              filled={isFavorite(stop.id)}
              size={24}
              color={isFavorite(stop.id) ? colors.accent : colors.textMuted}
              strokeWidth={1.9}
            />
          </Pressable>
        </View>
      </RevealView>

      <RevealView delay={90}>
        <Text style={styles.sectionTitle}>Prossime partenze</Text>
        {departures.length === 0 ? (
          <Text style={styles.empty}>Nessun orario disponibile al momento.</Text>
        ) : (
          <FlatList
            data={departures}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View>
                  <Text style={styles.line}>{item.line}</Text>
                  <Text style={styles.destination}>{item.destination}</Text>
                </View>
                <Text style={styles.time}>{item.time}</Text>
              </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },
  favorite: {
    padding: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  list: {
    gap: 12,
    paddingBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  line: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  destination: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },
  time: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  center: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  skeletonHero: {
    height: 78,
    borderRadius: 16,
  },
  skeletonRow: {
    height: 76,
    borderRadius: 14,
  },
  empty: {
    color: colors.textMuted,
  },
});

export default StopDetailsScreen;
