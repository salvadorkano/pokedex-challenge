import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { spacing } from '../../theme/spacing';
import { SkeletonBlock } from './skeleton-block';

export function PokemonDetailSkeleton() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <SkeletonBlock width={90} height={40} borderRadius={12} style={styles.backButton} />

        <View style={styles.heroCard}>
          <SkeletonBlock width={180} height={180} borderRadius={90} />
          <SkeletonBlock width={180} height={28} style={styles.heroTitle} />
          <SkeletonBlock width={80} height={18} style={styles.heroSubtitle} />

          <View style={styles.typeRow}>
            <SkeletonBlock width={80} height={32} borderRadius={999} style={styles.typeChip} />
            <SkeletonBlock width={80} height={32} borderRadius={999} style={styles.typeChip} />
          </View>
        </View>

        <View style={styles.section}>
          <SkeletonBlock width={100} height={24} style={styles.sectionTitle} />
          <View style={styles.badgeRow}>
            <SkeletonBlock width={100} height={34} borderRadius={999} style={styles.badge} />
            <SkeletonBlock width={120} height={34} borderRadius={999} style={styles.badge} />
          </View>
        </View>

        <View style={styles.section}>
          <SkeletonBlock width={120} height={24} style={styles.sectionTitle} />
          <View style={styles.metricRow}>
            <SkeletonBlock width="31%" height={76} borderRadius={16} />
            <SkeletonBlock width="31%" height={76} borderRadius={16} />
            <SkeletonBlock width="31%" height={76} borderRadius={16} />
          </View>
        </View>

        <View style={styles.section}>
          <SkeletonBlock width={80} height={24} style={styles.sectionTitle} />
          <SkeletonBlock height={18} style={styles.statSpacing} />
          <SkeletonBlock height={18} style={styles.statSpacing} />
          <SkeletonBlock height={18} style={styles.statSpacing} />
          <SkeletonBlock height={18} style={styles.statSpacing} />
          <SkeletonBlock height={18} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  backButton: {
    marginBottom: spacing.lg,
  },
  heroCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  heroTitle: {
    marginTop: spacing.lg,
  },
  heroSubtitle: {
    marginTop: spacing.sm,
  },
  typeRow: {
    flexDirection: 'row',
    marginTop: spacing.lg,
  },
  typeChip: {
    marginHorizontal: 4,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statSpacing: {
    marginBottom: spacing.md,
  },
});
