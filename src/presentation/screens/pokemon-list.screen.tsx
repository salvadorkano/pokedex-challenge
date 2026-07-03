import React, { useMemo, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { EmptyView } from '../components/common/empty-view';
import { ErrorView } from '../components/common/error-view';
import { FavoriteButton } from '../components/pokemon/favorite-button';
import { PokemonCard } from '../components/pokemon/pokemon-card';
import { FilterTabs, PokemonFilterType } from '../components/search/filter-tabs';
import { SearchBar } from '../components/search/search-bar';
import { PokemonListSkeleton } from '../components/skeletons/pokemon-list-skeleton';
import { useFavorites } from '../favorites/favorites.context';
import { usePokemonList } from '../hooks/use-pokemon-list';
import { useNavigation } from '../navigation/navigation.context';
import { ROUTES } from '../navigation/routes';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { getUserFriendlyErrorMessage } from '../utils/error-message';

export function PokemonListScreen() {
  const { data, isLoading, error, reload } = usePokemonList();
  const { navigate } = useNavigation();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<PokemonFilterType>('all');

  const filteredData = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return data.filter((pokemon) => {
      const matchesSearch =
        !normalizedSearch ||
        pokemon.name.toLowerCase().includes(normalizedSearch) ||
        String(pokemon.id).includes(normalizedSearch);

      const matchesFilter = filter === 'all' || isFavorite(pokemon.id);

      return matchesSearch && matchesFilter;
    });
  }, [data, search, filter, isFavorite]);

  if (isLoading) {
    return <PokemonListSkeleton />;
  }

  if (error) {
    return <ErrorView message={getUserFriendlyErrorMessage(error)} onRetry={() => void reload()} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
        <Text style={styles.subtitle}>Explore the first 20 Pokémon</Text>
      </View>

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search by name or id"
      />

      <FilterTabs value={filter} onChange={setFilter} />

      {!filteredData.length ? (
        <EmptyView
          message={
            filter === 'favorites'
              ? 'No favorite Pokémon match your search'
              : 'No Pokémon match your search'
          }
        />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => void reload()}
              tintColor={colors.danger}
            />
          }
          renderItem={({ item }) => {
            const favorite = isFavorite(item.id);

            return (
              <PokemonCard
                pokemon={item}
                onPress={() => {
                  navigate(ROUTES.pokemonDetail, {
                    nameOrId: item.name,
                  });
                }}
                rightAccessory={
                  <FavoriteButton
                    isActive={favorite}
                    onPress={() => {
                      toggleFavorite(item.id);
                    }}
                    accessibilityLabel={
                      favorite
                        ? `Remove ${item.name} from favorites`
                        : `Add ${item.name} to favorites`
                    }
                  />
                }
              />
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: 15,
    color: colors.textSecondary,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
});
