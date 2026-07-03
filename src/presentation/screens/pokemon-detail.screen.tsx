import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ErrorView } from '../components/common/error-view';
import { getUserFriendlyErrorMessage } from '../utils/error-message';
import { FavoriteButton } from '../components/pokemon/favorite-button';
import { PokemonDetailSkeleton } from '../components/skeletons/pokemon-detail-skeleton';
import { PokemonImage } from '../components/pokemon/pokemon-image';
import { PokemonTypeChip } from '../components/pokemon/pokemon-type-chip';
import { StatBar } from '../components/pokemon/stat-bar';
import { useFavorites } from '../favorites/favorites.context';
import { usePokemonDetail } from '../hooks/use-pokemon-detail';
import { useNavigation } from '../navigation/navigation.context';
import { colors } from '../theme/colors';
import { radius } from '../theme/radius';
import { spacing } from '../theme/spacing';
import {
  formatHeight,
  formatPokemonId,
  formatPokemonName,
  formatWeight,
} from '../utils/format';
import { getPokemonPrimaryColor } from '../utils/pokemon-type';

type Props = {
  nameOrId: string | number;
};

export function PokemonDetailScreen({ nameOrId }: Props) {
  const { data, isLoading, error, reload } = usePokemonDetail(nameOrId);
  const { goBack } = useNavigation();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading) {
    return <PokemonDetailSkeleton />;
  }

  if (error || !data) {
    return (
      <ErrorView
        message={getUserFriendlyErrorMessage(error ?? 'Pokémon detail not available')}
        onRetry={() => void reload()}
      />
    );
  }

  const primaryColor = getPokemonPrimaryColor(data.types);
  const favorite = isFavorite(data.id);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topBar}>
          <Pressable
            style={styles.backButton}
            onPress={goBack}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Go back"
            accessibilityHint="Returns to the previous screen"
          >
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>

          <FavoriteButton
            isActive={favorite}
            onPress={() => {
              toggleFavorite(data.id);
            }}
            accessibilityLabel={
              favorite
                ? `Remove ${data.name} from favorites`
                : `Add ${data.name} to favorites`
            }
          />
        </View>

        <View style={[styles.heroCard, { backgroundColor: primaryColor }]}>
          <PokemonImage
            uri={data.imageUrl}
            width={200}
            height={200}
            resizeMode="contain"
            rounded
          />

          <Text style={styles.name}>{formatPokemonName(data.name)}</Text>
          <Text style={styles.id}>{formatPokemonId(data.id)}</Text>

          <View style={styles.typeList}>
            {data.types.map((type) => (
              <PokemonTypeChip key={type} type={type} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Abilities</Text>
          <View style={styles.wrapRow}>
            {data.abilities.map((ability) => (
              <View key={ability} style={styles.badge}>
                <Text style={styles.badgeText}>{formatPokemonName(ability)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Physical Data</Text>
          <View style={styles.metricRow}>
            <View style={[styles.metricCard, styles.metricCardSpacing]}>
              <Text style={styles.metricLabel}>Height</Text>
              <Text style={styles.metricValue}>{formatHeight(data.height)}</Text>
            </View>

            <View style={[styles.metricCard, styles.metricCardSpacing]}>
              <Text style={styles.metricLabel}>Weight</Text>
              <Text style={styles.metricValue}>{formatWeight(data.weight)}</Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Base Exp</Text>
              <Text style={styles.metricValue}>{data.baseExperience}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stats</Text>
          {data.stats.map((stat) => (
            <StatBar
              key={stat.name}
              label={stat.name}
              value={stat.value}
              color={primaryColor}
            />
          ))}
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.danger,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.md,
  },
  backButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
  heroCard: {
    alignItems: 'center',
    borderRadius: 28,
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  name: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  id: {
    marginTop: spacing.xs,
    fontSize: 15,
    color: '#fef2f2',
  },
  typeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#eef2ff',
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  badgeText: {
    color: '#4338ca',
    fontSize: 13,
    fontWeight: '700',
  },
  metricRow: {
    flexDirection: 'row',
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  metricCardSpacing: {
    marginRight: spacing.sm,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
});
