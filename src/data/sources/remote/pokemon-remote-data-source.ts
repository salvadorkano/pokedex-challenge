import { PokemonDetailDto } from '../../dto/pokemon-detail.dto';
import { PokemonListResponseDto } from '../../dto/pokemon-list.dto';
import { ApiClient } from '../../../infrastructure/api/api-client';
import { endpoints } from '../../../infrastructure/api/endpoints';

export class PokemonRemoteDataSource {
  constructor(private readonly apiClient: ApiClient) {}

  async getPokemonList(limit: number, offset: number): Promise<PokemonListResponseDto> {
    return this.apiClient.get<PokemonListResponseDto>(endpoints.pokemonList(limit, offset));
  }

  async getPokemonDetail(nameOrId: string | number): Promise<PokemonDetailDto> {
    return this.apiClient.get<PokemonDetailDto>(endpoints.pokemonDetail(nameOrId));
  }
}
