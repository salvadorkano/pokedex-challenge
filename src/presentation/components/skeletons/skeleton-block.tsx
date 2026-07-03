import React from 'react';
import { DimensionValue, StyleSheet, View, ViewStyle } from 'react-native';

type Props = {
  width?: DimensionValue;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
};

export function SkeletonBlock({
  width = '100%',
  height,
  borderRadius = 12,
  style,
}: Props) {
  return <View style={[styles.block, { width, height, borderRadius }, style]} />;
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#e5e7eb',
  },
});
