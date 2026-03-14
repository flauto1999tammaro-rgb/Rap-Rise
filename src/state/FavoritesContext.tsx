import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const FAVORITES_KEY = 'napoli-transit.favorites.v1';

type FavoritesContextValue = {
  favoriteIds: string[];
  isReady: boolean;
  toggleFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const FavoritesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const raw = await AsyncStorage.getItem(FAVORITES_KEY);
        if (raw) {
          setFavoriteIds(JSON.parse(raw));
        }
      } catch {
        setFavoriteIds([]);
      } finally {
        setIsReady(true);
      }
    };

    loadFavorites();
  }, []);

  const persistFavorites = async (nextIds: string[]) => {
    setFavoriteIds(nextIds);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(nextIds));
  };

  const toggleFavorite = async (id: string) => {
    const exists = favoriteIds.includes(id);
    const nextIds = exists ? favoriteIds.filter((item) => item !== id) : [...favoriteIds, id];
    await persistFavorites(nextIds);
  };

  const isFavorite = (id: string) => favoriteIds.includes(id);

  const value = useMemo(
    () => ({ favoriteIds, isReady, toggleFavorite, isFavorite }),
    [favoriteIds, isReady]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
