import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type FavoritesContextValue = {
  favorites: number[];
  isFavorite: (pokemonId: number) => boolean;
  toggleFavorite: (pokemonId: number) => void;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function FavoritesProvider({ children }: Props) {
  const [favorites, setFavorites] = useState<number[]>([]);

  function isFavorite(pokemonId: number): boolean {
    return favorites.includes(pokemonId);
  }

  function toggleFavorite(pokemonId: number): void {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(pokemonId)) {
        return currentFavorites.filter((id) => id !== pokemonId);
      }

      return [...currentFavorites, pokemonId];
    });
  }

  function clearFavorites(): void {
    setFavorites([]);
  }

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      clearFavorites,
    }),
    [favorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
}
