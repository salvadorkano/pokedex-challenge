import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { spacing } from '../../theme/spacing';

export type PokemonFilterType = 'all' | 'favorites';

type Props = {
  value: PokemonFilterType;
  onChange: (value: PokemonFilterType) => void;
};

export function FilterTabs({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.tab, value === 'all' ? styles.tabActive : styles.tabInactive]}
        onPress={() => onChange('all')}
      >
        <Text style={[styles.tabText, value === 'all' ? styles.tabTextActive : styles.tabTextInactive]}>
          All
        </Text>
      </Pressable>

      <Pressable
        style={[styles.tab, value === 'favorites' ? styles.tabActive : styles.tabInactive]}
        onPress={() => onChange('favorites')}
      >
        <Text
          style={[
            styles.tabText,
            value === 'favorites' ? styles.tabTextActive : styles.tabTextInactive,
          ]}
        >
          Favorites
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
  },
  tab: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    marginRight: spacing.sm,
  },
  tabActive: {
    backgroundColor: colors.danger,
  },
  tabInactive: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
  },
  tabTextActive: {
    color: colors.white,
  },
  tabTextInactive: {
    color: colors.textPrimary,
  },
});
