import { PokemonDetail } from '../entities/pokemon-detail';
import { PokemonRepository } from '../repositories/pokemon-repository';

export class GetPokemonDetailUseCase {
  constructor(private readonly repository: PokemonRepository) {}

  async execute(nameOrId: string | number): Promise<PokemonDetail> {
    return this.repository.getPokemonDetail(nameOrId);
  }
}
