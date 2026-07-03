import { useCallback, useEffect, useState } from 'react';
import { PokemonDetail } from '../../domain/entities/pokemon-detail';
import { container } from '../../core/di/container';

type UsePokemonDetailState = {
  data: PokemonDetail | null;
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
};

export function usePokemonDetail(nameOrId: string | number): UsePokemonDetailState {
  const [data, setData] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await container.getPokemonDetailUseCase.execute(nameOrId);
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unexpected error');
    } finally {
      setIsLoading(false);
    }
  }, [nameOrId]);

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
