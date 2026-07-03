import { Pokemon } from '../entities/pokemon';
import { PokemonRepository } from '../repositories/pokemon-repository';

export class GetPokemonListUseCase {
  constructor(private readonly repository: PokemonRepository) {}

  async execute(limit = 20, offset = 0): Promise<readonly Pokemon[]> {
    return this.repository.getPokemonList(limit, offset);
  }
}
