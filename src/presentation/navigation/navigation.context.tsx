import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { NavigationState, ROUTES, RouteName } from './routes';

type NavigateParams = {
  [ROUTES.pokemonList]: undefined;
  [ROUTES.pokemonDetail]: {
    nameOrId: string | number;
  };
};

type NavigationContextValue = {
  currentRoute: NavigationState;
  navigate: <T extends RouteName>(routeName: T, params: NavigateParams[T]) => void;
  goBack: () => void;
};

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function NavigationProvider({ children }: Props) {
  const [history, setHistory] = useState<NavigationState[]>([
    {
      name: ROUTES.pokemonList,
    },
  ]);

  const currentRoute = history[history.length - 1];

  const navigate = <T extends RouteName>(routeName: T, params: NavigateParams[T]) => {
    if (routeName === ROUTES.pokemonList) {
      setHistory((prev) => [
        ...prev,
        {
          name: ROUTES.pokemonList,
        },
      ]);
      return;
    }

    setHistory((prev) => [
      ...prev,
      {
        name: ROUTES.pokemonDetail,
        params: params as NavigateParams[typeof ROUTES.pokemonDetail],
      },
    ]);
  };

  const goBack = () => {
    setHistory((prev) => {
      if (prev.length <= 1) {
        return prev;
      }

      return prev.slice(0, prev.length - 1);
    });
  };

  const value = useMemo(
    () => ({
      currentRoute,
      navigate,
      goBack,
    }),
    [currentRoute],
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }

  return context;
}
