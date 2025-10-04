import { API } from '../../constants';
import type { Repository } from '../api/gitHubApi';
import { buildApiUrl, fetchFromGitHubApi } from '../api/gitHubApi';
import { processRepository } from '../data/repositoryProcessor';
import {
    addToBuffer,
    addToLoadedRepositories,
    extractFromBuffer,
    getCurrentQuery,
    getHasMoreData,
    incrementApiPage,
    incrementClientPage,
    needsData,
    resetBufferState,
    setHasMoreApiData,
    setPreloadingState,
    shouldPreload,
} from '../state/bufferState';

/**
 * Carga una página completa de 100 elementos desde la API
 */
const fetchApiPage = async (query: string, page: number): Promise<Repository[]> => {
  
  const url = buildApiUrl(query, page);
  const data = await fetchFromGitHubApi(url);
  
  const processedItems = data.items.map(processRepository);
  
  // Actualizar estado de API
  const hasMore = data.items.length === API.PER_PAGE && page < 10; // GitHub limita a ~1000 resultados
  setHasMoreApiData(hasMore);
  
  return processedItems;
};

/**
 * Asegura que el buffer tenga datos disponibles
 */
export const ensureBufferHasData = async (): Promise<void> => {
  // Si el buffer está vacío y hay más datos en la API, cargar una página
  if (needsData()) {
    const { currentApiPage } = (await import('../state/bufferState')).getBufferState();
    
    const query = getCurrentQuery();
    const newItems = await fetchApiPage(query, currentApiPage);
    addToBuffer(newItems);
    incrementApiPage();
  }
};

/**
 * Pre-carga la siguiente página cuando el buffer está casi vacío
 */
export const preloadNextPageIfNeeded = async (): Promise<void> => {
  // Pre-cargar cuando quedan pocos elementos en el buffer
  if (shouldPreload()) {
    const { currentApiPage } = (await import('../state/bufferState')).getBufferState();
    setPreloadingState(true);
    
    try {
      const query = getCurrentQuery();
      const newItems = await fetchApiPage(query, currentApiPage);
      addToBuffer(newItems);
      incrementApiPage();
    } catch (error) {
      console.error('Error en pre-carga:', error);
    } finally {
      setPreloadingState(false);
    }
  }
};

/**
 * Obtiene elementos del buffer para servir al cliente
 */
export const getItemsFromBuffer = async (): Promise<{
  items: Repository[];
  hasMore: boolean;
}> => {
  // Asegurar que tenemos datos en el buffer
  await ensureBufferHasData();
  
  // Si no hay datos en el buffer y no hay más en la API, terminamos
  const { repositoryBuffer, hasMoreApiData } = (await import('../state/bufferState')).getBufferState();
  if (repositoryBuffer.length === 0 && !hasMoreApiData) {
    return {
      items: [],
      hasMore: false,
    };
  }
  
  // Servir los siguientes elementos desde el buffer
  const itemsToServe = extractFromBuffer(API.CLIENT_PAGE_SIZE);
  addToLoadedRepositories(itemsToServe);
  incrementClientPage();
  
  // Pre-cargar siguiente página si es necesario
  preloadNextPageIfNeeded();
  
  const hasMore = getHasMoreData();
  
  return {
    items: itemsToServe,
    hasMore,
  };
};

/**
 * Resetea todo el estado del buffering
 */
export const resetBuffering = (): void => {
  resetBufferState();
};