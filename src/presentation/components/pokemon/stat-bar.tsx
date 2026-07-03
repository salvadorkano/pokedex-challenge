import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatStatName } from '../../utils/format';

type Props = {
  label: string;
  value: number;
  color?: string;
};

const MAX_STAT_VALUE = 200;

export function StatBar({ label, value, color = '#ef5350' }: Props) {
  const progress = Math.min(value / MAX_STAT_VALUE, 1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{formatStatName(label)}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${progress * 100}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: '#374151',
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  track: {
    height: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});
