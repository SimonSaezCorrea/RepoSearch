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
 * Función principal del servicio para obtener datos.
 * En un caso real, aquí iría la llamada a 'fetch' o 'axios'.
 */
export const getRepositoryData = (): DataResult => {
  const rawData = Data as any;
  
  // En un caso real, podríamos añadir lógica de caché o manejo de errores aquí.
  return {
    total_count: rawData.total_count,
    incomplete_results: rawData.incomplete_results,
    items: rawData.items.map(processRepository),
  };
};