import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RoutePlan } from '../types/routing';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/tokens';
import { typography } from '../theme/typography';

type RouteOptionCardProps = {
  plan: RoutePlan;
};

const RouteOptionCard: React.FC<RouteOptionCardProps> = ({ plan }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.summary}>{plan.summary}</Text>
        <Text style={styles.cost}>{`EUR ${plan.totalCostEur.toFixed(2)}`}</Text>
      </View>
      <Text style={styles.duration}>{`${plan.totalDurationMinutes} min`}</Text>
      {plan.isEstimate ? <Text style={styles.estimate}>Stima basata su GTFS statico.</Text> : null}
      <View style={styles.legs}>
        {plan.legs.map((leg) => (
          <View key={`${plan.id}-${leg.line}-${leg.startTime}`} style={styles.legRow}>
            <Text style={styles.legMode}>{leg.mode}</Text>
            <Text style={styles.legLine}>{leg.line}</Text>
            <Text style={styles.legStops}>{`${leg.fromStop} -> ${leg.toStop}`}</Text>
            <Text style={styles.legTime}>{`${leg.startTime} - ${leg.endTime}`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summary: {
    fontSize: 15.5,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
    color: colors.textPrimary,
  },
  cost: {
    fontSize: typography.body.fontSize,
    color: colors.primaryDark,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
  },
  duration: {
    fontSize: 13.5,
    color: colors.textMuted,
    fontWeight: '600',
    fontFamily: typography.fontFamily,
  },
  estimate: {
    fontSize: typography.caption.fontSize,
    color: colors.textMuted,
    fontStyle: 'italic',
    fontFamily: typography.fontFamily,
  },
  legs: {
    gap: 8,
  },
  legRow: {
    paddingTop: 9,
    paddingBottom: 2,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  legMode: {
    fontSize: 11,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    fontWeight: '700',
    fontFamily: typography.fontFamily,
  },
  legLine: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    fontFamily: typography.fontFamily,
    color: colors.textPrimary,
  },
  legStops: {
    fontSize: typography.caption.fontSize,
    fontFamily: typography.fontFamily,
    color: colors.textMuted,
  },
  legTime: {
    fontSize: typography.caption.fontSize,
    fontFamily: typography.fontFamily,
    color: colors.textPrimary,
  },
});

export default RouteOptionCard;
