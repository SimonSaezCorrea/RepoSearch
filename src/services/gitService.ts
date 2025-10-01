import Data from '../utils/datos.json';

export interface RepositoryOwner {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  size: number;
  stargazers_count: number;
  language: string;
  owner: RepositoryOwner;
}

interface DataResult {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

// Estado para simular paginación y generación dinámica
let currentPage = 1;
let totalGeneratedItems = 0;
const itemsPerPage = 30; // Cantidad por carga
const originalDataLength = (Data as any).items.length;

interface DataResult {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

const getDescription = (description: string | null): string => {
  return description || 'Sin descripción disponible';
};

const getLanguage = (language: string | null): string => {
  return language || 'No especificado';
};

/**
 * Procesa un objeto de repositorio crudo para asegurar los tipos y valores por defecto.
 */
const processRepository = (item: any): Repository => ({
  id: item.id,
  name: item.name,
  owner: {
    login: item.owner.login,
    avatar_url: item.owner.avatar_url,
    html_url: item.owner.html_url,
  },
  html_url: item.html_url,
  description: getDescription(item.description),
  size: item.size,
  stargazers_count: item.stargazers_count,
  language: getLanguage(item.language),
});


/**
 * Genera una copia específica de un repositorio con ID único
 */
const generateRepositoryCopy = (originalItem: any, copyNumber: number): any => {
  const baseId = originalItem.id;
  const uniqueId = baseId + (copyNumber * 10000000); // Asegura IDs únicos para miles de copias
  
  return {
    ...originalItem,
    id: uniqueId,
    name: copyNumber === 0 ? originalItem.name : `${originalItem.name}-copy${copyNumber}`,
    description: copyNumber === 0 
      ? originalItem.description 
      : originalItem.description 
        ? `${originalItem.description} (Copia #${copyNumber})` 
        : `Repositorio copia #${copyNumber}`
  };
};

/**
 * Función principal del servicio para obtener datos iniciales (solo originales).
 */
export const getRepositoryData = (): DataResult => {
  const rawData = Data as any;
  
  // Solo retornamos los datos originales, sin copias
  const initialItems = rawData.items.slice(0, Math.min(itemsPerPage, originalDataLength));
  totalGeneratedItems = initialItems.length;
  
  return {
    total_count: Infinity, // Podemos generar infinitas copias
    incomplete_results: true,
    items: initialItems.map(processRepository),
  };
};

/**
 * Función para cargar más repositorios (genera copias dinámicamente)
 */
export const loadMoreRepositories = (): Repository[] => {
  const rawData = Data as any;
  const originalItems = rawData.items;
  const newItems: any[] = [];
  
  // Determinar qué "serie" de copias estamos generando
  const copyNumber = Math.floor(totalGeneratedItems / originalDataLength);
  
  // Generar los siguientes 30 elementos de la misma serie
  for (let i = 0; i < itemsPerPage; i++) {
    const originalIndex = (totalGeneratedItems + i) % originalDataLength;
    
    const originalItem = originalItems[originalIndex];
    const generatedItem = generateRepositoryCopy(originalItem, copyNumber);
    newItems.push(generatedItem);
  }
  
  totalGeneratedItems += itemsPerPage;
  currentPage++;
  
  return newItems.map(processRepository);
};

/**
 * Función para resetear la paginación y el contador de elementos generados
 */
export const resetPagination = (): void => {
  currentPage = 1;
  totalGeneratedItems = 0;
};