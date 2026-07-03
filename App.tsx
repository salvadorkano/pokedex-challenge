import React from 'react';
import { FavoritesProvider } from './src/presentation/favorites/favorites.context';
import { NavigationProvider } from './src/presentation/navigation/navigation.context';
import { RootNavigator } from './src/presentation/navigation/root-navigator';

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationProvider>
        <RootNavigator />
      </NavigationProvider>
    </FavoritesProvider>
  );
}
