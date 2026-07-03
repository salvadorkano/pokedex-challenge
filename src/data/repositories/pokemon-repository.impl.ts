import { Pokemon } from '../../domain/entities/pokemon';
import { PokemonDetail } from '../../domain/entities/pokemon-detail';
import { PokemonRepository } from '../../domain/repositories/pokemon-repository';
import {
  mapPokemonDetailDtoToEntity,
  mapPokemonListResponseDtoToEntities,
} from '../mappers/pokemon.mapper';
import { PokemonLocalDataSource } from '../sources/local/pokemon-local-data-source';
import { PokemonRemoteDataSource } from '../sources/remote/pokemon-remote-data-source';

export class PokemonRepositoryImpl implements PokemonRepository {
  constructor(
    private readonly remoteDataSource: PokemonRemoteDataSource,
    private readonly localDataSource: PokemonLocalDataSource,
  ) {}

  async getPokemonList(limit: number, offset: number): Promise<readonly Pokemon[]> {
    const cachedList = await this.localDataSource.getPokemonList();

    try {
      const response = await this.remoteDataSource.getPokemonList(limit, offset);
      const pokemonList = mapPokemonListResponseDtoToEntities(response);

      if (offset === 0) {
        await this.localDataSource.savePokemonList(pokemonList);
      }

      return pokemonList;
    } catch (error) {
      if (cachedList && cachedList.length > 0 && offset === 0) {
        return cachedList;
      }

      throw error;
    }
  }

  async getPokemonDetail(nameOrId: string | number): Promise<PokemonDetail> {
    const cachedDetail = await this.localDataSource.getPokemonDetail(nameOrId);

    try {
      const response = await this.remoteDataSource.getPokemonDetail(nameOrId);
      const detail = mapPokemonDetailDtoToEntity(response);

      await this.localDataSource.savePokemonDetail(detail);

      return detail;
    } catch (error) {
      if (cachedDetail) {
        return cachedDetail;
      }

      throw error;
    }
  }
}
