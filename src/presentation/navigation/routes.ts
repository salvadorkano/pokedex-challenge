export const ROUTES = {
  pokemonList: 'pokemon-list',
  pokemonDetail: 'pokemon-detail',
} as const;

export type RouteName = typeof ROUTES[keyof typeof ROUTES];

export type NavigationState =
  | {
      name: typeof ROUTES.pokemonList;
    }
  | {
      name: typeof ROUTES.pokemonDetail;
      params: {
        nameOrId: string | number;
      };
    };
