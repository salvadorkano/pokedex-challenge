import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { spacing } from '../../theme/spacing';
import { SkeletonBlock } from './skeleton-block';

export function PokemonCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <SkeletonBlock width={72} height={72} borderRadius={36} />
      </View>

      <View style={styles.content}>
        <SkeletonBlock width={60} height={12} style={styles.id} />
        <SkeletonBlock width="70%" height={24} style={styles.name} />
        <SkeletonBlock width={110} height={12} style={styles.cta} />
      </View>

      <SkeletonBlock width={40} height={40} borderRadius={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.xl,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },
  imageContainer: {
    width: 88,
    height: 88,
    borderRadius: radius.lg,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  content: {
    flex: 1,
    marginRight: spacing.md,
  },
  id: {
    marginBottom: spacing.sm,
  },
  name: {
    marginBottom: spacing.md,
  },
  cta: {},
});
