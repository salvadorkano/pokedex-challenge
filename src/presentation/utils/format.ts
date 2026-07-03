export function capitalize(value: string): string {
  if (!value) {
    return '';
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatPokemonName(value: string): string {
  return capitalize(value.replace(/-/g, ' '));
}

export function formatStatName(value: string): string {
  return capitalize(value.replace(/-/g, ' '));
}

export function formatHeight(decimeters: number): string {
  return `${(decimeters / 10).toFixed(1)} m`;
}

export function formatWeight(hectograms: number): string {
  return `${(hectograms / 10).toFixed(1)} kg`;
}

export function formatPokemonId(id: number): string {
  return `#${String(id).padStart(3, '0')}`;
}
