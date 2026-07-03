export interface PokemonListItemDto {
  readonly name: string;
  readonly url: string;
}

export interface PokemonListResponseDto {
  readonly count: number;
  readonly next: string | null;
  readonly previous: string | null;
  readonly results: readonly PokemonListItemDto[];
}
