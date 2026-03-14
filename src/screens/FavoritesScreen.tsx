import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import { Stop } from '../types/transit';
import StopListItem from '../components/StopListItem';
import { useFavorites } from '../state/FavoritesContext';
import { getStopsByIds } from '../services/transitService';
import { RootStackParamList } from '../navigation/types';

const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { favoriteIds, isReady, isFavorite, toggleFavorite } = useFavorites();
  const [favorites, setFavorites] = useState<Stop[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!isReady) {
        return;
      }
      setLoading(true);
      const stops = await getStopsByIds(favoriteIds);
      setFavorites(stops);
      setLoading(false);
    };

    load();
  }, [favoriteIds, isReady]);

  if (!isReady || loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Nessun preferito ancora salvato.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  list: {
    gap: 12,
    paddingBottom: 24,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  empty: {
    color: colors.textMuted,
  },
});

export default FavoritesScreen;
