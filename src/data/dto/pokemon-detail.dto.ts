export interface PokemonTypeSlotDto {
  readonly slot: number;
  readonly type: {
    readonly name: string;
    readonly url: string;
  };
}

export interface PokemonAbilitySlotDto {
  readonly ability: {
    readonly name: string;
    readonly url: string;
  };
  readonly is_hidden: boolean;
  readonly slot: number;
}

export interface PokemonStatDto {
  readonly base_stat: number;
  readonly effort: number;
  readonly stat: {
    readonly name: string;
    readonly url: string;
  };
}

export interface PokemonSpritesDto {
  readonly other?: {
    readonly 'official-artwork'?: {
      readonly front_default?: string | null;
    };
  };
}

export interface PokemonDetailDto {
  readonly id: number;
  readonly name: string;
  readonly height: number;
  readonly weight: number;
  readonly base_experience: number;
  readonly types: readonly PokemonTypeSlotDto[];
  readonly abilities: readonly PokemonAbilitySlotDto[];
  readonly stats: readonly PokemonStatDto[];
  readonly sprites: PokemonSpritesDto;
}
