import { type SearchFilters, type SearchResponse } from '../../features/search/types/search';

import {
  getItemsFromBuffer,
  resetBuffering
} from './buffering/bufferingManager';
import { generateRandomQuery, getQueryType } from './query/queryGenerator';
import {
  getAllLoadedRepositories as getBufferedRepositories,
  getCurrentQuery,
  getPaginationInfo,
  setCurrentQuery,
  setSortParams,
} from './state/bufferState';
import type { Repository } from './type/github';

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
  searchType: 'repository' | 'user' | 'both',
  filters: SearchFilters
): Promise<SearchResponse> => {
  try {
    // Reset completo para nueva búsqueda
    resetBuffering();

    // Configurar parámetros de ordenamiento
    // Si es relevancia, no establecer sort para que GitHub use su algoritmo
    if (filters.sort !== 'relevance') {
      setSortParams(filters.sort, filters.order);
    }

    // Construir query con filtros
    let fullQuery = query;

    // Verificar si hay filtros aplicados (diferentes a los valores por defecto)
    const hasFilters = filters.language || 
                      (filters.stars !== null && filters.stars !== undefined) ||
                      filters.organization ||
                      filters.createdDate ||
                      filters.pushedDate ||
                      filters.topic ||
                      filters.size ||
                      (filters.sort !== 'relevance') ||
                      (filters.order !== 'desc');

    // Si no hay query ni filtros, generar una búsqueda aleatoria
    if (!query.trim() && !hasFilters) {
      fullQuery = generateRandomQuery();
    }
    // Si solo hay filtros sin query, dejar fullQuery vacío para que solo se usen los filtros

    // Manejar tipo de búsqueda
    if (searchType === 'user' && fullQuery.trim()) {
      fullQuery = `user:${fullQuery}`;
    } else if (searchType === 'both' && fullQuery.trim()) {
      // Para búsqueda en ambos, se busca el término tanto en repos como en usuarios
      // GitHub buscará en nombres de repo, descripciones, y nombres de usuario
      fullQuery = `${fullQuery} in:name,description`;
    }

    // Agregar filtros a la query
    const filterParts = [];
    
    if (filters.language) {
      filterParts.push(`language:${filters.language}`);
    }
    if (filters.stars !== null && filters.stars !== undefined) {
      filterParts.push(`stars:>=${filters.stars}`);
    }
    if (filters.organization) {
      filterParts.push(`org:${filters.organization}`);
    }
    if (filters.createdDate) {
      filterParts.push(`created:>=${filters.createdDate}`);
    }
    if (filters.pushedDate) {
      filterParts.push(`pushed:>=${filters.pushedDate}`);
    }
    if (filters.topic) {
      filterParts.push(`topic:${filters.topic}`);
    }
    if (filters.size) {
      filterParts.push(`size:${filters.size}`);
    }

    // Combinar query base con filtros
    if (fullQuery.trim() && filterParts.length > 0) {
      fullQuery = `${fullQuery.trim()} ${filterParts.join(' ')}`;
    } else if (filterParts.length > 0) {
      fullQuery = filterParts.join(' ');
    }

    setCurrentQuery(fullQuery);

    // Cargar datos desde el buffer
    const { items } = await getItemsFromBuffer();

    const queryType = searchType === 'user' ? 'Por Usuario' : 
                     searchType === 'both' ? 'Búsqueda Completa' : 
                     query.trim() ? 'Manual' : 
                     hasFilters ? 'Solo Filtros' : 
                     'Aleatoria';

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
