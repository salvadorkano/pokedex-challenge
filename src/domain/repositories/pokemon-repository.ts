import { Pokemon } from '../entities/pokemon';
import { PokemonDetail } from '../entities/pokemon-detail';

export interface PokemonRepository {
  getPokemonList(limit: number, offset: number): Promise<readonly Pokemon[]>;
  getPokemonDetail(nameOrId: string | number): Promise<PokemonDetail>;
}
