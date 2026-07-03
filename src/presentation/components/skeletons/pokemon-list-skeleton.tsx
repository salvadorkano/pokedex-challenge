import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { PokemonCardSkeleton } from './pokemon-card-skeleton';
import { SkeletonBlock } from './skeleton-block';

export function PokemonListSkeleton() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <SkeletonBlock width={140} height={34} style={styles.title} />
          <SkeletonBlock width={220} height={16} />
        </View>

        <View style={styles.searchContainer}>
          <SkeletonBlock width="100%" height={48} borderRadius={16} />
        </View>

        <View style={styles.tabsRow}>
          <SkeletonBlock width={80} height={36} borderRadius={999} style={styles.tab} />
          <SkeletonBlock width={110} height={36} borderRadius={999} />
        </View>

        {Array.from({ length: 6 }).map((_, index) => (
          <PokemonCardSkeleton key={index} />
        ))}
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
    paddingBottom: spacing.xxl,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    marginBottom: spacing.sm,
  },
  searchContainer: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.sm,
  },
  tab: {
    marginRight: spacing.sm,
  },
});
