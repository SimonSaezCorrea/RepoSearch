import Data from '../utils/datos.json';

/**
 * Función auxiliar para obtener descripción limpia
 */
const getDescription = (description: string | null): string => {
  return description || 'Sin descripción disponible';
};

/**
 * Función auxiliar para obtener lenguaje
 */
const getLanguage = (language: string | null): string => {
  return language || 'No especificado';
};

/**
 * Procesa un repositorio individual de la API de GitHub
 */
const processRepository = (item: any) => ({
  id: item.id,
  name: item.name,
  owner: {
    login: item.owner.login,
    id: item.owner.id,
    avatar_url: item.owner.avatar_url,
    html_url: item.owner.html_url,
  },
  html_url: item.html_url,
  description: getDescription(item.description),
  size: item.size,
  stargazers_count: item.stargazers_count,
  watchers_count: item.watchers_count,
  language: getLanguage(item.language),
});

/**
 * Extrae y procesa los datos de repositorios
 */
export const extractRepositoryData = () => {
  const rawData = Data as any;
  
  return {
    total_count: rawData.total_count,
    incomplete_results: rawData.incomplete_results,
    items: rawData.items.map(processRepository),
  };
};

/**
 * Obtiene solo los repositorios procesados
 */
export const getRepositories = () => {
  return extractRepositoryData().items;
};

// Alias para compatibilidad
export const extractData = extractRepositoryData;