import { DATA } from '../constants';
import Data from '../utils/datos.json';

// Interfaces para tipado
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

// Estado para simulación de paginación
let totalGeneratedItems = 0;
const originalDataLength = (Data as DataResult).items.length;

/**
 * Retorna una descripción por defecto si no existe.
 */
const getDescription = (description: string | null): string => {
  return description || DATA.DEFAULT_DESCRIPTION;
};

const getLanguage = (language: string | null): string => {
  return language || DATA.DEFAULT_LANGUAGE;
};

/**
 * Procesa un objeto de repositorio crudo para asegurar los tipos y valores por defecto.
 */
const processRepository = (item: Repository): Repository => ({
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
const generateRepositoryCopy = (originalItem: Repository, copyNumber: number): Repository => {
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
  const rawData = Data as DataResult;
  
  // Solo retornamos los datos originales, sin copias
  const initialItems = rawData.items.slice(0, Math.min(DATA.ITEMS_PER_PAGE, originalDataLength));
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
  const rawData = Data as DataResult;
  const originalItems = rawData.items;
  const newItems: Repository[] = [];
  
  // Determinar qué "serie" de copias estamos generando
  const copyNumber = Math.floor(totalGeneratedItems / originalDataLength);
  
  // Generar los siguientes elementos de la misma serie
  for (let i = 0; i < DATA.ITEMS_PER_PAGE; i++) {
    const originalIndex = (totalGeneratedItems + i) % originalDataLength;
    
    const originalItem = originalItems[originalIndex];
    const generatedItem = generateRepositoryCopy(originalItem, copyNumber);
    newItems.push(generatedItem);
  }
  
  totalGeneratedItems += DATA.ITEMS_PER_PAGE;
  
  return newItems.map(processRepository);
};

/**
 * Función para resetear la paginación y el contador de elementos generados
 */
export const resetPagination = (): void => {
  totalGeneratedItems = 0;
};