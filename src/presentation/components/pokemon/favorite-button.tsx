import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';

type Props = {
  isActive: boolean;
  onPress: () => void;
  accessibilityLabel?: string;
};

export function FavoriteButton({ isActive, onPress, accessibilityLabel }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.button}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? (isActive ? 'Remove from favorites' : 'Add to favorites')}
      accessibilityHint="Toggles favorite state"
    >
      <Text style={[styles.icon, isActive ? styles.iconActive : styles.iconInactive]}>
        {isActive ? '★' : '☆'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
  iconActive: {
    color: colors.danger,
  },
  iconInactive: {
    color: colors.textMuted,
  },
});
