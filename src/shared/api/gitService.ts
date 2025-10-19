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
  repositoryQuery: string,
  userQuery: string,
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

    // Construir la query combinando repositorio y usuario
    const queryParts = [];


    // Agregar parte de repositorio y usuario
    if (repositoryQuery.trim()) {
      queryParts.push(`in:name ${repositoryQuery.trim()}`);
    }
    
    if (userQuery.trim()) {
      queryParts.push(`user:${userQuery.trim()}`);
    }


    let fullQuery = queryParts.length > 0 ? queryParts.join(' ') : '';

    // Agregar filtros a la query
    const filterParts = [];

    if (filters.language) {
      filterParts.push(`language:${filters.language}`);
    }
    if (filters.stars) {
      filterParts.push(`stars:>=${filters.stars}`);
    } else {
      filterParts.push(`stars:>=0`);
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
    fullQuery = `${fullQuery.trim()} ${filterParts.join(' ')}`;

    setCurrentQuery(fullQuery);

    // Cargar datos desde el buffer
    const { items } = await getItemsFromBuffer();

    // Determinar el tipo de query basado en los inputs
    let queryType = '';
    if (repositoryQuery.trim() && userQuery.trim()) {
      queryType = 'Repositorio y Usuario';
    } else if (repositoryQuery.trim()) {
      queryType = 'Por Repositorio';
    } else if (userQuery.trim()) {
      queryType = 'Por Usuario';
    } else {
      queryType = 'Solo Filtros';
    }

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
