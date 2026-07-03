export interface PokemonStat {
  readonly name: string;
  readonly value: number;
}

export interface PokemonDetail {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
  readonly types: readonly string[];
  readonly abilities: readonly string[];
  readonly stats: readonly PokemonStat[];
  readonly weight: number;
  readonly height: number;
  readonly baseExperience: number;
}
