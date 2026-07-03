import {
  mapPokemonDetailDtoToEntity,
  mapPokemonListItemDtoToEntity,
  mapPokemonListResponseDtoToEntities,
} from '../pokemon.mapper';

describe('pokemon mapper', () => {
  it('maps pokemon list item dto to entity', () => {
    const dto = {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    };

    expect(mapPokemonListItemDtoToEntity(dto)).toEqual({
      id: 1,
      name: 'bulbasaur',
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    });
  });

  it('maps pokemon list response dto to entities', () => {
    const dto = {
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
        {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon/2/',
        },
      ],
    };

    expect(mapPokemonListResponseDtoToEntities(dto)).toEqual([
      {
        id: 1,
        name: 'bulbasaur',
        imageUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      },
      {
        id: 2,
        name: 'ivysaur',
        imageUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
      },
    ]);
  });

  it('maps pokemon detail dto to entity', () => {
    const dto = {
      id: 25,
      name: 'pikachu',
      weight: 60,
      height: 4,
      base_experience: 112,
      types: [
        {
          slot: 1,
          type: {
            name: 'electric',
            url: 'https://pokeapi.co/api/v2/type/13/',
          },
        },
      ],
      abilities: [
        {
          ability: {
            name: 'static',
            url: 'https://pokeapi.co/api/v2/ability/9/',
          },
          is_hidden: false,
          slot: 1,
        },
      ],
      stats: [
        {
          base_stat: 35,
          effort: 0,
          stat: {
            name: 'hp',
            url: 'https://pokeapi.co/api/v2/stat/1/',
          },
        },
      ],
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'https://example.com/pikachu.png',
          },
        },
      },
    };

    expect(mapPokemonDetailDtoToEntity(dto)).toEqual({
      id: 25,
      name: 'pikachu',
      imageUrl: 'https://example.com/pikachu.png',
      types: ['electric'],
      abilities: ['static'],
      stats: [
        {
          name: 'hp',
          value: 35,
        },
      ],
      weight: 60,
      height: 4,
      baseExperience: 112,
    });
  });

  it('falls back to generated artwork when official artwork is missing', () => {
    const dto = {
      id: 4,
      name: 'charmander',
      weight: 85,
      height: 6,
      base_experience: 62,
      types: [],
      abilities: [],
      stats: [],
      sprites: {
        other: {
          'official-artwork': {
            front_default: null,
          },
        },
      },
    };

    expect(mapPokemonDetailDtoToEntity(dto).imageUrl).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    );
  });
});
