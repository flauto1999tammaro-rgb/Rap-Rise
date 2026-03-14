import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import { Stop } from '../types/transit';
import { searchStops } from '../services/transitService';
import StopListItem from '../components/StopListItem';
import { useFavorites } from '../state/FavoritesContext';
import { RootStackParamList } from '../navigation/types';
import RevealView from '../components/RevealView';
import SkeletonBlock from '../components/SkeletonBlock';
import { typography } from '../theme/typography';

const SearchScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 980;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Stop[]>([]);
  const [loading, setLoading] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      const nextResults = await searchStops(query);
      setResults(nextResults);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={[styles.contentWrap, isDesktop ? styles.contentWrapDesktop : null]}>
      <RevealView delay={20}>
        <View style={styles.heroCard}>
          <Text style={styles.kicker}>RICERCA RAPIDA</Text>
          <Text style={styles.heroTitle}>Trova fermate e linee in un attimo</Text>
        </View>
      </RevealView>

      <RevealView delay={70}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Cerca fermata, linea o zona"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
        />
      </RevealView>

      <RevealView delay={120} style={styles.resultsWrap}>
      {loading ? (
        <View style={styles.list}>
          <SkeletonBlock style={styles.skeletonCard} />
          <SkeletonBlock style={styles.skeletonCard} />
          <SkeletonBlock style={styles.skeletonCard} />
        </View>
      ) : results.length === 0 ? (
        <Text style={styles.empty}>Nessun risultato. Prova con "Garibaldi".</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <StopListItem
              stop={item}
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
  kicker: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
    letterSpacing: 0.9,
    color: colors.primary,
  },
  heroTitle: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
    color: colors.textPrimary,
    lineHeight: 25,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 15,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
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
    height: 94,
    borderRadius: 18,
  },
  empty: {
    color: colors.textMuted,
    fontSize: 13,
    fontFamily: typography.fontFamily,
  },
});

export default SearchScreen;
