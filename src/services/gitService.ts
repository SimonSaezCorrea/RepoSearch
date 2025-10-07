// Re-exportar tipos principales
export type { ApiError, Repository, RepositoryOwner } from './api/gitHubApi';

// Interfaces para las respuestas del servicio
export interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
  currentQuery: string;
  queryType: string;
}

export interface SearchFilters {
  sort: 'updated' | 'stars' | 'created' | 'forks';
  order: 'desc' | 'asc';
  language?: string;
  stars?: string;
  size?: string;
  pushed?: string;
  topics?: string[];
}

// Importar funcionalidades de los módulos especializados
import type { Repository } from './api/gitHubApi';
import {
  getItemsFromBuffer,
  resetBuffering,
} from './buffering/bufferingManager';
import { generateRandomQuery, getQueryType } from './query/queryGenerator';
import {
  getAllLoadedRepositories as getBufferedRepositories,
  getCurrentQuery,
  getPaginationInfo,
  setCurrentQuery,
  setSortParams,
} from './state/bufferState';

/**
 * Función principal para obtener los datos iniciales (página 1)
 */
export const getRepositoryData = async (): Promise<SearchResponse> => {
  try {
    // Reset completo para nueva búsqueda
    resetBuffering();

    // Generar nueva query aleatoria
    const query = generateRandomQuery();
    setCurrentQuery(query);

    // Cargar datos desde el buffer
    const { items } = await getItemsFromBuffer();

    return {
      items,
      total_count: items.length, // Este será actualizado por la UI
      incomplete_results: false,
      currentQuery: query,
      queryType: getQueryType(query),
    };
  } catch (error) {
    console.error('Error fetching initial repository data:', error);
    throw error;
  }
};

/**
 * Función para búsqueda manual con filtros
 */
export const searchRepositoriesManual = async (
  query: string,
  searchType: 'repository' | 'user',
  filters: SearchFilters
): Promise<SearchResponse> => {
  try {
    // Reset completo para nueva búsqueda
    resetBuffering();

    // Configurar parámetros de ordenamiento
    setSortParams(filters.sort, filters.order);

    // Construir query con filtros
    let fullQuery = query;

    if (searchType === 'user') {
      fullQuery = `user:${query}`;
    }

    // Agregar filtros a la query
    if (filters.language) {
      fullQuery += ` language:${filters.language}`;
    }
    if (filters.stars) {
      fullQuery += ` stars:${filters.stars}`;
    }
    if (filters.size) {
      fullQuery += ` size:${filters.size}`;
    }
    if (filters.pushed) {
      fullQuery += ` pushed:${filters.pushed}`;
    }

    setCurrentQuery(fullQuery);

    // Cargar datos desde el buffer
    const { items } = await getItemsFromBuffer();

    const queryType = searchType === 'user' ? 'Por Usuario' : 'Manual';

    return {
      items,
      total_count: items.length,
      incomplete_results: false,
      currentQuery: fullQuery,
      queryType,
    };
  } catch (error) {
    console.error('Error in manual search:', error);
    throw error;
  }
};

/**
 * Función para cargar más repositorios desde el buffer local
 */
export const loadMoreRepositories = async (): Promise<{
  items: Repository[];
  hasMore: boolean;
  currentQuery: string;
  queryType: string;
}> => {
  try {
    const { items, hasMore } = await getItemsFromBuffer();
    const query = getCurrentQuery();

    return {
      items,
      hasMore,
      currentQuery: query,
      queryType: getQueryType(query),
    };
  } catch (error) {
    console.error('Error loading more repositories:', error);
    throw error;
  }
};

/**
 * Obtiene todos los repositorios cargados hasta el momento
 */
export const getAllLoadedRepositories = (): Repository[] => {
  return getBufferedRepositories();
};

/**
 * Función para resetear el estado de paginación
 */
export const resetPagination = (): void => {
  resetBuffering();
};

/**
 * Función para obtener el estado actual de la paginación
 */
export const getPaginationState = () => {
  const paginationInfo = getPaginationInfo();
  const query = getCurrentQuery();

  return {
    ...paginationInfo,
    queryType: getQueryType(query),
  };
};

/**
 * Función para forzar una nueva query aleatoria
 */
export const generateNewRandomQuery = (): string => {
  const newQuery = generateRandomQuery();
  setCurrentQuery(newQuery);
  return newQuery;
};
