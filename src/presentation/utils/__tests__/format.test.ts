import {
  capitalize,
  formatHeight,
  formatPokemonId,
  formatPokemonName,
  formatStatName,
  formatWeight,
} from '../format';

describe('format utils', () => {
  describe('capitalize', () => {
    it('returns empty string when value is empty', () => {
      expect(capitalize('')).toBe('');
    });

    it('capitalizes the first letter', () => {
      expect(capitalize('pikachu')).toBe('Pikachu');
    });
  });

  describe('formatPokemonName', () => {
    it('replaces hyphens with spaces and capitalizes the first letter', () => {
      expect(formatPokemonName('mr-mime')).toBe('Mr mime');
    });
  });

  describe('formatStatName', () => {
    it('replaces hyphens with spaces and capitalizes the first letter', () => {
      expect(formatStatName('special-attack')).toBe('Special attack');
    });
  });

  describe('formatHeight', () => {
    it('formats decimeters to meters', () => {
      expect(formatHeight(7)).toBe('0.7 m');
    });
  });

  describe('formatWeight', () => {
    it('formats hectograms to kilograms', () => {
      expect(formatWeight(69)).toBe('6.9 kg');
    });
  });

  describe('formatPokemonId', () => {
    it('formats id with leading zeros', () => {
      expect(formatPokemonId(1)).toBe('#001');
      expect(formatPokemonId(25)).toBe('#025');
      expect(formatPokemonId(150)).toBe('#150');
    });
  });
});
