import { PokemonRepositoryImpl } from '../../data/repositories/pokemon-repository.impl';
import { PokemonLocalDataSource } from '../../data/sources/local/pokemon-local-data-source';
import { PokemonRemoteDataSource } from '../../data/sources/remote/pokemon-remote-data-source';
import { GetPokemonDetailUseCase } from '../../domain/use-cases/get-pokemon-detail';
import { GetPokemonListUseCase } from '../../domain/use-cases/get-pokemon-list';
import { ApiClient } from '../../infrastructure/api/api-client';

const apiClient = new ApiClient();
const pokemonRemoteDataSource = new PokemonRemoteDataSource(apiClient);
const pokemonLocalDataSource = new PokemonLocalDataSource();
const pokemonRepository = new PokemonRepositoryImpl(
  pokemonRemoteDataSource,
  pokemonLocalDataSource,
);

export const container = {
  apiClient,
  pokemonRemoteDataSource,
  pokemonLocalDataSource,
  pokemonRepository,
  getPokemonListUseCase: new GetPokemonListUseCase(pokemonRepository),
  getPokemonDetailUseCase: new GetPokemonDetailUseCase(pokemonRepository),
};
