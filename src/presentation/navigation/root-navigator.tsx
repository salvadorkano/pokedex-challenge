import React from 'react';
import { PokemonDetailScreen } from '../screens/pokemon-detail.screen';
import { PokemonListScreen } from '../screens/pokemon-list.screen';
import { useNavigation } from './navigation.context';
import { ROUTES } from './routes';

export function RootNavigator() {
  const { currentRoute } = useNavigation();

  if (currentRoute.name === ROUTES.pokemonDetail) {
    return <PokemonDetailScreen nameOrId={currentRoute.params.nameOrId} />;
  }

  return <PokemonListScreen />;
}
