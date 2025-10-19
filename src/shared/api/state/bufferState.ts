import { API } from '../constants/APIGitHub';
import type { Repository } from "../type/github";

// Estado global para manejo de paginación y buffering
interface BufferState {
  currentApiPage: number;
  currentClientPage: number;
  repositoryBuffer: Repository[];
  allLoadedRepositories: Repository[];
  hasMoreApiData: boolean;
  isPreloading: boolean;
  currentQuery: string;
  currentSort: string;
  currentOrder: string;
}

let state: BufferState = {
  currentApiPage: 1,
  currentClientPage: 0,
  repositoryBuffer: [],
  allLoadedRepositories: [],
  hasMoreApiData: true,
  isPreloading: false,
  currentQuery: '',
  currentSort: 'updated',
  currentOrder: 'desc',
};

/**
 * Resetea todo el estado del buffer para una nueva búsqueda
 */
export const resetBufferState = (): void => {
  state = {
    currentApiPage: 1,
    currentClientPage: 0,
    repositoryBuffer: [],
    allLoadedRepositories: [],
    hasMoreApiData: true,
    isPreloading: false,
    currentQuery: '',
    currentSort: 'updated',
    currentOrder: 'desc',
  };
};

/**
 * Obtiene el estado actual del buffer
 */
export const getBufferState = (): Readonly<BufferState> => ({ ...state });

/**
 * Actualiza la query actual
 */
export const setCurrentQuery = (query: string): void => {
  state.currentQuery = query;
};

/**
 * Obtiene la query actual
 */
export const getCurrentQuery = (): string => state.currentQuery;

/**
 * Actualiza los parámetros de ordenamiento
 */
export const setSortParams = (sort: string, order: string): void => {
  state.currentSort = sort;
  state.currentOrder = order;
};

/**
 * Obtiene los parámetros de ordenamiento actuales
 */
export const getSortParams = (): { sort: string; order: string } => ({
  sort: state.currentSort,
  order: state.currentOrder,
});

/**
 * Añade elementos al buffer de repositorios
 */
export const addToBuffer = (repositories: Repository[]): void => {
  state.repositoryBuffer = [...state.repositoryBuffer, ...repositories];
};

/**
 * Extrae elementos del buffer (los primeros N elementos)
 */
export const extractFromBuffer = (count: number): Repository[] => {
  const extracted = state.repositoryBuffer.splice(0, count);
  return extracted;
};

/**
 * Añade elementos a la lista de repositorios cargados
 */
export const addToLoadedRepositories = (repositories: Repository[]): void => {
  state.allLoadedRepositories = [...state.allLoadedRepositories, ...repositories];
};

/**
 * Obtiene todos los repositorios cargados
 */
export const getAllLoadedRepositories = (): Repository[] => {
  return [...state.allLoadedRepositories];
};

/**
 * Actualiza el número de página de la API
 */
export const incrementApiPage = (): void => {
  state.currentApiPage++;
};

/**
 * Actualiza el número de página del cliente
 */
export const incrementClientPage = (): void => {
  state.currentClientPage++;
};

/**
 * Actualiza si hay más datos disponibles en la API
 */
export const setHasMoreApiData = (hasMore: boolean): void => {
  state.hasMoreApiData = hasMore;
};

/**
 * Obtiene si hay más datos disponibles
 */
export const getHasMoreData = (): boolean => {
  return state.repositoryBuffer.length > 0 || state.hasMoreApiData;
};

/**
 * Actualiza el estado de precarga
 */
export const setPreloadingState = (isPreloading: boolean): void => {
  state.isPreloading = isPreloading;
};

/**
 * Verifica si se debe hacer precarga
 */
export const shouldPreload = (): boolean => {
  return (
    state.repositoryBuffer.length <= API.CLIENT_PAGE_SIZE &&
    state.hasMoreApiData &&
    !state.isPreloading
  );
};

/**
 * Verifica si el buffer está vacío y necesita datos
 */
export const needsData = (): boolean => {
  return state.repositoryBuffer.length === 0 && state.hasMoreApiData && !state.isPreloading;
};

/**
 * Obtiene información completa del estado de paginación
 */
export const getPaginationInfo = () => {
  return {
    currentPage: state.currentClientPage,
    totalLoaded: state.allLoadedRepositories.length,
    hasMore: getHasMoreData(),
    currentQuery: state.currentQuery,
    bufferSize: state.repositoryBuffer.length,
    apiPage: state.currentApiPage,
    isPreloading: state.isPreloading,
  };
};