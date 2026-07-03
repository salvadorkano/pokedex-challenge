import { Pokemon } from '../../domain/entities/pokemon';
import { PokemonDetail } from '../../domain/entities/pokemon-detail';
import { PokemonDetailDto } from '../dto/pokemon-detail.dto';
import { PokemonListItemDto, PokemonListResponseDto } from '../dto/pokemon-list.dto';

const extractPokemonIdFromUrl = (url: string): number => {
  const segments = url.split('/').filter(Boolean);
  return Number(segments[segments.length - 1]);
};

const buildPokemonImageUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const mapPokemonListItemDtoToEntity = (dto: PokemonListItemDto): Pokemon => {
  const id = extractPokemonIdFromUrl(dto.url);

  return {
    id,
    name: dto.name,
    imageUrl: buildPokemonImageUrl(id),
  };
};

export const mapPokemonListResponseDtoToEntities = (
  dto: PokemonListResponseDto,
): readonly Pokemon[] => {
  return dto.results.map(mapPokemonListItemDtoToEntity);
};

export const mapPokemonDetailDtoToEntity = (dto: PokemonDetailDto): PokemonDetail => {
  const officialArtwork =
    dto.sprites.other?.['official-artwork']?.front_default ?? buildPokemonImageUrl(dto.id);

  return {
    id: dto.id,
    name: dto.name,
    imageUrl: officialArtwork,
    types: dto.types.map((item) => item.type.name),
    abilities: dto.abilities.map((item) => item.ability.name),
    stats: dto.stats.map((item) => ({
      name: item.stat.name,
      value: item.base_stat,
    })),
    weight: dto.weight,
    height: dto.height,
    baseExperience: dto.base_experience,
  };
};
