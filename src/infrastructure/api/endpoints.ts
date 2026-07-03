export const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const endpoints = {
  pokemonList(limit: number, offset: number): string {
    return API_BASE_URL + '/pokemon?limit=' + limit + '&offset=' + offset;
  },

  pokemonDetail(nameOrId: string | number): string {
    return API_BASE_URL + '/pokemon/' + nameOrId;
  },
};
