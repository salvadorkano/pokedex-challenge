import React, { useEffect, useRef, useState } from 'react';
import { Animated, ImageResizeMode, StyleSheet, Text, View } from 'react-native';

type Props = {
  uri: string;
  width: number;
  height: number;
  resizeMode?: ImageResizeMode;
  rounded?: boolean;
};

export function PokemonImage({
  uri,
  width,
  height,
  resizeMode = 'contain',
  rounded = false,
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    opacity.setValue(0);
  }, [uri, opacity]);

  const borderRadius = rounded ? Math.min(width, height) / 2 : 0;

  function handleLoad() {
    setIsLoaded(true);

    Animated.timing(opacity, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }

  function handleError() {
    setHasError(true);
    setIsLoaded(true);
  }

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
        },
      ]}
    >
      {!isLoaded && !hasError && (
        <View style={[styles.skeleton, { borderRadius }]}>
          <View style={styles.innerSkeleton} />
        </View>
      )}

      {!hasError ? (
        <Animated.Image
            key={uri}
            source={{ uri }}
            accessible={false}
            importantForAccessibility="no"
            style={[
            styles.image,
            {
              width,
              height,
              borderRadius,
              opacity,
            },
            ]}
            resizeMode={resizeMode}
            onLoad={handleLoad}
            onError={handleError}
        />
      ) : (
        <View style={[styles.fallback, { borderRadius }]}>
          <Text style={styles.fallbackEmoji}>📦</Text>
          <Text style={styles.fallbackText}>Image not available</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  skeleton: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerSkeleton: {
    width: '65%',
    height: '65%',
    borderRadius: 999,
    backgroundColor: '#d1d5db',
    opacity: 0.6,
  },
  image: {
    backgroundColor: 'transparent',
  },
  fallback: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  fallbackEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  fallbackText: {
    fontSize: 12,
    color: '#4b5563',
    textAlign: 'center',
  },
});
