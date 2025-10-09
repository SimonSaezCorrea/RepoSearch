import { useCallback, useState } from 'react';

import { type SearchFilters } from '../../features/search/types/search';
import {
    generateNewRandomQuery,
    getPaginationState,
    getRepositoryData,
    loadMoreRepositories,
    resetPagination,
    searchRepositoriesManual,
} from '../api/gitService';
import type { Repository } from '../api/type/github';
import { MESSAGES } from '../constants/css_menssages';

interface UseRepositoryDataResult {
  repositories: Repository[];
  isLoading: boolean;
  isInitialLoading: boolean;
  hasMoreData: boolean;
  error: string | null;
  previousCount: number;
  currentQuery: string;
  queryType: string;
  retryCount: number;
  isRateLimited: boolean;
  rateLimitReset: Date | null;
  loadInitialData: () => Promise<void>;
  loadMoreRepositories: () => Promise<void>;
  generateNewSearch: () => Promise<void>;
  searchManual: (
    repositoryQuery: string,
    userQuery: string,
    filters: SearchFilters
  ) => Promise<void>;
  retryLastOperation: () => Promise<void>;
}

const MAX_RETRY_ATTEMPTS = 3;

/**
 * Hook personalizado para gestionar el estado y operaciones de repositorios
 */
export const useRepositoryData = (): UseRepositoryDataResult => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previousCount, setPreviousCount] = useState(0);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [queryType, setQueryType] = useState<string>('');
  const [retryCount, setRetryCount] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitReset, setRateLimitReset] = useState<Date | null>(null);

  /**
   * Actualiza el estado con los datos de paginación
   */
  const updatePaginationState = useCallback(
    (items: Repository[], query: string, type: string) => {
      const paginationState = getPaginationState();
      setCurrentQuery(query);
      setQueryType(type);
      setHasMoreData(paginationState.hasMore);
      if (items.length > 0) {
        setError(null);
        setRetryCount(0);
        setIsRateLimited(false);
        setRateLimitReset(null);
      }
    },
    []
  );

  /**
   * Maneja errores de rate limiting de GitHub API
   */
  const handleRateLimitError = useCallback((error: Error) => {
    if (
      error.message.includes('API límite alcanzado') ||
      error.message.includes('rate limit')
    ) {
      setIsRateLimited(true);
      // Intentar extraer el tiempo de reset del mensaje de error
      const resetMatch = error.message.match(
        /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)/
      );
      if (resetMatch) {
        setRateLimitReset(new Date(resetMatch[1]));
      } else {
        // Estimar 1 hora de reset por defecto
        setRateLimitReset(new Date(Date.now() + 60 * 60 * 1000));
      }
    }
  }, []);

  /**
   * Carga inicial de datos con manejo de resultados vacíos
   */
  const loadInitialData = useCallback(async () => {
    try {
      setIsInitialLoading(true);
      setError(null);
      setRetryCount(0);

      const result = await getRepositoryData();

      if (result.items.length === 0) {
        // Intentar hasta MAX_RETRY_ATTEMPTS veces
        let attempts = 0;
        let successResult = null;

        while (attempts < MAX_RETRY_ATTEMPTS) {
          attempts++;
          setRetryCount(attempts);

          // Generar nueva query y reintentar
          generateNewRandomQuery();

          try {
            const retryResult = await getRepositoryData();
            if (retryResult.items.length > 0) {
              successResult = retryResult;
              break;
            }
          } catch (retryErr) {
            console.error('Error en reintento:', retryErr);
            if (retryErr instanceof Error) {
              handleRateLimitError(retryErr);
            }
          }
        }

        if (successResult) {
          setRepositories(successResult.items);
          updatePaginationState(
            successResult.items,
            successResult.currentQuery || '',
            successResult.queryType || ''
          );
        } else {
          setRepositories([]);
          setError(
            'No se encontraron repositorios después de varios intentos. Intenta generar una nueva búsqueda.'
          );
        }
      } else {
        setRepositories(result.items);
        updatePaginationState(
          result.items,
          result.currentQuery || '',
          result.queryType || ''
        );
      }
    } catch (err) {
      console.error('Error loading initial data:', err);
      if (err instanceof Error) {
        handleRateLimitError(err);
      }
      setError(err instanceof Error ? err.message : MESSAGES.ERROR_LOADING);
    } finally {
      setIsInitialLoading(false);
    }
  }, [updatePaginationState, handleRateLimitError]);

  /**
   * Carga más repositorios con manejo de resultados vacíos
   */
  const loadMoreRepositoriesData = useCallback(async () => {
    if (isLoading || !hasMoreData || isInitialLoading) return;

    setIsLoading(true);
    setError(null);
    const currentCount = repositories.length;

    try {
      const result = await loadMoreRepositories();

      if (result.items.length === 0) {
        setHasMoreData(false);
      } else {
        setPreviousCount(currentCount);
        setRepositories(prev => [...prev, ...result.items]);
        setHasMoreData(result.hasMore);
        setRetryCount(0);
      }
    } catch (err) {
      console.error('Error al cargar más repositorios:', err);
      if (err instanceof Error) {
        handleRateLimitError(err);
      }
      setError(err instanceof Error ? err.message : MESSAGES.ERROR_LOADING);
    } finally {
      setIsLoading(false);
    }
  }, [
    repositories.length,
    isLoading,
    hasMoreData,
    isInitialLoading,
    handleRateLimitError,
  ]);

  /**
   * Genera una nueva búsqueda completamente aleatoria
   */
  const generateNewSearch = useCallback(async () => {
    if (isInitialLoading || isLoading) return;

    try {
      setIsInitialLoading(true);
      setError(null);
      setRetryCount(0);

      // Resetear todo y generar nueva query
      resetPagination();
      generateNewRandomQuery();

      const result = await getRepositoryData();

      if (result.items.length === 0) {
        // Intentar hasta MAX_RETRY_ATTEMPTS veces para esta nueva búsqueda también
        let attempts = 0;
        let successResult = null;

        while (attempts < MAX_RETRY_ATTEMPTS) {
          attempts++;
          setRetryCount(attempts);

          generateNewRandomQuery();

          try {
            const retryResult = await getRepositoryData();
            if (retryResult.items.length > 0) {
              successResult = retryResult;
              break;
            }
          } catch (retryErr) {
            console.error('Error en reintento de nueva búsqueda:', retryErr);
            if (retryErr instanceof Error) {
              handleRateLimitError(retryErr);
            }
          }
        }

        if (successResult) {
          setRepositories(successResult.items);
          updatePaginationState(
            successResult.items,
            successResult.currentQuery || '',
            successResult.queryType || ''
          );
        } else {
          setRepositories([]);
          setError(
            'No se encontraron repositorios después de varios intentos. Intenta de nuevo más tarde.'
          );
        }
      } else {
        setRepositories(result.items);
        updatePaginationState(
          result.items,
          result.currentQuery || '',
          result.queryType || ''
        );
        setRetryCount(0);
      }
    } catch (err) {
      console.error('Error en nueva búsqueda aleatoria:', err);
      setError(err instanceof Error ? err.message : MESSAGES.ERROR_LOADING);
    } finally {
      setIsInitialLoading(false);
    }
  }, [
    isInitialLoading,
    isLoading,
    updatePaginationState,
    handleRateLimitError,
  ]);

  /**
   * Búsqueda manual con filtros
   */
  const searchManual = useCallback(
    async (
      repositoryQuery: string,
      userQuery: string,
      filters: SearchFilters
    ) => {
      if (isInitialLoading || isLoading) return;

      try {
        setIsInitialLoading(true);
        setError(null);
        setRetryCount(0);

        const result = await searchRepositoriesManual(repositoryQuery, userQuery, filters);

        if (result.items.length === 0) {
          setRepositories([]);
          setError(
            'No se encontraron repositorios con los criterios especificados.'
          );
        } else {
          setRepositories(result.items);
          updatePaginationState(
            result.items,
            result.currentQuery || '',
            result.queryType || ''
          );
          setRetryCount(0);
        }
      } catch (err) {
        console.error('Error en búsqueda manual:', err);
        if (err instanceof Error) {
          handleRateLimitError(err);
        }
        setError(err instanceof Error ? err.message : MESSAGES.ERROR_LOADING);
      } finally {
        setIsInitialLoading(false);
      }
    },
    [isInitialLoading, isLoading, updatePaginationState, handleRateLimitError]
  );

  /**
   * Reintenta la última operación
   */
  const retryLastOperation = useCallback(async () => {
    if (repositories.length === 0) {
      await loadInitialData();
    } else {
      await loadMoreRepositoriesData();
    }
  }, [repositories.length, loadInitialData, loadMoreRepositoriesData]);

  return {
    repositories,
    isLoading,
    isInitialLoading,
    hasMoreData,
    error,
    previousCount,
    currentQuery,
    queryType,
    retryCount,
    isRateLimited,
    rateLimitReset,
    loadInitialData,
    loadMoreRepositories: loadMoreRepositoriesData,
    generateNewSearch,
    searchManual,
    retryLastOperation,
  };
};
