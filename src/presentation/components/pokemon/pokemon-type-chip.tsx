import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatPokemonName } from '../../utils/format';
import { getPokemonTypeColor } from '../../utils/pokemon-type';

type Props = {
  type: string;
};

export function PokemonTypeChip({ type }: Props) {
  const backgroundColor = getPokemonTypeColor(type);

  return (
    <View style={[styles.chip, { backgroundColor }]}>
      <Text style={styles.text}>{formatPokemonName(type)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});
