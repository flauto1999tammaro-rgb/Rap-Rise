import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Stop } from '../types/transit';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/tokens';
import { typography } from '../theme/typography';
import TransitIcon from './TransitIcon';

type StopListItemProps = {
  stop: Stop;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPress?: () => void;
};

const StopListItem: React.FC<StopListItemProps> = ({
  stop,
  isFavorite,
  onToggleFavorite,
  onPress,
}) => {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed ? styles.cardPressed : null]} onPress={onPress}>
      <View style={styles.info}>
        <Text style={styles.name}>{stop.name}</Text>
        <Text style={styles.meta}>{`${stop.area} • ${stop.lines.join(', ')}`}</Text>
        {stop.nextArrivals.length > 0 ? (
          <Text style={styles.arrivals}>{`Prossimi: ${stop.nextArrivals.join(' · ')}`}</Text>
        ) : null}
      </View>
      <Pressable
        style={({ pressed }) => [styles.favorite, pressed ? styles.favoritePressed : null]}
        onPress={(event) => {
          event.stopPropagation();
          onToggleFavorite();
        }}
      >
        <TransitIcon
          name="favorites"
          filled={isFavorite}
          size={22}
          color={isFavorite ? colors.accent : colors.textMuted}
          strokeWidth={1.9}
        />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  cardPressed: {
    transform: [{ scale: 0.992 }],
    shadowOpacity: 0.16,
  },
  info: {
    flex: 1,
    marginRight: spacing.sm,
  },
  name: {
    fontSize: typography.section.fontSize,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
    color: colors.textPrimary,
  },
  meta: {
    marginTop: 5,
    fontSize: typography.body.fontSize,
    fontFamily: typography.fontFamily,
    color: colors.textMuted,
    lineHeight: 18,
  },
  arrivals: {
    marginTop: 8,
    fontSize: 12.5,
    fontFamily: typography.fontFamily,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  favorite: {
    padding: spacing.xs,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
  },
  favoritePressed: {
    opacity: 0.75,
  },
});

export default StopListItem;
