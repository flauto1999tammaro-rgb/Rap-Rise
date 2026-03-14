import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { TransitMode } from '../types/transit';
import { getModeLabel } from '../services/transitService';
import { radius, spacing } from '../theme/tokens';
import { typography } from '../theme/typography';
import TransitIcon, { TransitIconName } from './TransitIcon';

const MODE_ICONS: Record<TransitMode, TransitIconName> = {
  bus: 'bus',
  metro: 'metro',
  funicolare: 'funicolare',
  tram: 'tram',
  cumana: 'cumana',
};

type ModeCardProps = {
  mode: TransitMode;
  onPress?: () => void;
};

const ModeCard: React.FC<ModeCardProps> = ({ mode, onPress }) => {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed ? styles.cardPressed : null]} onPress={onPress}>
      <View style={styles.iconWrap}>
        <TransitIcon name={MODE_ICONS[mode]} size={22} color={colors.primary} strokeWidth={1.9} />
      </View>
      <Text style={styles.label}>{getModeLabel(mode)}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    minWidth: 160,
  },
  cardPressed: {
    transform: [{ scale: 0.985 }],
    shadowOpacity: 0.16,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: '#E6F5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: typography.body.fontSize,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
    color: colors.textPrimary,
  },
});

export default ModeCard;
