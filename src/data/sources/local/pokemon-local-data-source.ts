import { Pokemon } from '../../../domain/entities/pokemon';
import { PokemonDetail } from '../../../domain/entities/pokemon-detail';

type PokemonDetailCache = Record<string, PokemonDetail>;

export class PokemonLocalDataSource {
  private pokemonListCache: readonly Pokemon[] | null = null;
  private pokemonDetailCache: PokemonDetailCache = {};

  async savePokemonList(pokemonList: readonly Pokemon[]): Promise<void> {
    this.pokemonListCache = pokemonList;
  }

  async getPokemonList(): Promise<readonly Pokemon[] | null> {
    return this.pokemonListCache;
  }

  async savePokemonDetail(detail: PokemonDetail): Promise<void> {
    this.pokemonDetailCache[String(detail.id).toLowerCase()] = detail;
    this.pokemonDetailCache[detail.name.toLowerCase()] = detail;
  }

  async getPokemonDetail(nameOrId: string | number): Promise<PokemonDetail | null> {
    return this.pokemonDetailCache[String(nameOrId).toLowerCase()] ?? null;
  }

  async clearAll(): Promise<void> {
    this.pokemonListCache = null;
    this.pokemonDetailCache = {};
  }
}
