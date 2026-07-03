import { useCallback, useEffect, useState } from 'react';
import { Pokemon } from '../../domain/entities/pokemon';
import { container } from '../../core/di/container';

type UsePokemonListState = {
  data: readonly Pokemon[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
};

export function usePokemonList(): UsePokemonListState {
  const [data, setData] = useState<readonly Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await container.getPokemonListUseCase.execute(20, 0);
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unexpected error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    data,
    isLoading,
    error,
    reload: load,
  };
}
