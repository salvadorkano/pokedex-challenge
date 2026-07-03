import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Pokemon } from '../../../domain/entities/pokemon';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { spacing } from '../../theme/spacing';
import { PokemonImage } from './pokemon-image';

type Props = {
  pokemon: Pokemon;
  onPress: () => void;
  rightAccessory?: React.ReactNode;
  subtitle?: string;
  backgroundColor?: string;
};

export function PokemonCard({
  pokemon,
  onPress,
  rightAccessory,
  subtitle = 'Tap to see details',
  backgroundColor = colors.surface,
}: Props) {
  return (
    <Pressable
      style={[styles.card, { backgroundColor }]}
      onPress={onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Open detail for ${pokemon.name}`}
      accessibilityHint={`Shows detailed information for Pokémon ${pokemon.name}`}
    >
      <View style={styles.imageContainer}>
        <PokemonImage uri={pokemon.imageUrl} width={72} height={72} rounded />
      </View>

      <View style={styles.info}>
        <Text style={styles.id}>#{pokemon.id}</Text>
        <Text style={styles.name}>{pokemon.name}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {rightAccessory ? <View style={styles.rightAccessory}>{rightAccessory}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.xl,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },
  imageContainer: {
    width: 88,
    height: 88,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  info: {
    flex: 1,
  },
  id: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
    fontWeight: '600',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  rightAccessory: {
    marginLeft: spacing.md,
  },
});
