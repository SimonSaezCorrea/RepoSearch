import { API, DATA } from '../constants';

// Interfaces para tipado de la respuesta de GitHub API
export interface RepositoryOwner {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  size: number;
  stargazers_count: number;
  language: string | null;
  owner: RepositoryOwner;
}

export interface GitHubApiResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
  currentQuery: string;
  queryType: string;
}

export interface ApiError {
  message: string;
  documentation_url?: string;
}

// Estado para manejo de paginación
let currentPage = 1;
let allRepositories: Repository[] = [];
let hasMoreData = true;
let currentQuery = ''; // Query actual para mantener consistencia en la sesión

/**
 * Genera un número completamente aleatorio usando múltiples fuentes de entropía
 */
const getTrueRandom = (): number => {
  const crypto = window.crypto || (window as typeof window & { msCrypto?: Crypto }).msCrypto;
  if (crypto && crypto.getRandomValues) {
    // Usar crypto API para verdadera aleatoriedad
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] / 0xffffffff;
  } else {
    // Fallback con múltiples fuentes de aleatoriedad
    return Math.random() * Date.now() * Math.random() * performance.now() % 1;
  }
};

/**
 * Selecciona un elemento aleatorio de un array
 */
const getRandomElement = <T>(array: readonly T[]): T => {
  const randomIndex = Math.floor(getTrueRandom() * array.length);
  return array[randomIndex];
};

/**
 * Genera una query completamente aleatoria usando múltiples estrategias
 */
const generateRandomQuery = (): string => {
  const strategy = Math.floor(getTrueRandom() * 100);
  
  if (strategy < 15) {
    // 15% - Caracteres individuales (incluyendo símbolos)
    return getRandomElement(API.SINGLE_CHAR_QUERIES);
  } else if (strategy < 25) {
    // 10% - Palabras muy cortas
    return getRandomElement(API.SHORT_QUERIES);
  } else if (strategy < 35) {
    // 10% - Palabras inventadas/creativas
    return getRandomElement(API.CREATIVE_QUERIES);
  } else if (strategy < 45) {
    // 10% - Números y versiones
    return getRandomElement(API.NUMERIC_QUERIES);
  } else if (strategy < 55) {
    // 10% - Patrones especiales
    return getRandomElement(API.SPECIAL_PATTERNS);
  } else if (strategy < 70) {
    // 15% - Queries temáticas normales
    return getRandomElement(API.THEMATIC_QUERIES);
  } else if (strategy < 80) {
    // 10% - Combinación de dos elementos aleatorios
    const first = getRandomElement([
      ...API.SHORT_QUERIES,
      ...API.CREATIVE_QUERIES,
      ...API.THEMATIC_QUERIES.slice(0, 20) // Solo algunas temáticas
    ]);
    const second = getRandomElement([
      ...API.SINGLE_CHAR_QUERIES.slice(0, 26), // Solo letras
      ...API.NUMERIC_QUERIES.slice(0, 10),
      ...API.SHORT_QUERIES
    ]);
    return `${first} ${second}`;
  } else if (strategy < 90) {
    // 10% - Queries con modificadores GitHub
    const base = getRandomElement([
      ...API.THEMATIC_QUERIES,
      ...API.SHORT_QUERIES,
      ...API.CREATIVE_QUERIES
    ]);
    const modifiers = [
      'stars:>10', 'stars:>50', 'stars:>100', 'stars:>500',
      'language:TypeScript', 'language:JavaScript', 'language:Python', 'language:Go', 'language:Rust',
      'size:<1000', 'size:>1000', 'pushed:>2023-01-01', 'created:>2023-01-01',
      'topic:web', 'topic:mobile', 'topic:game', 'topic:cli', 'topic:library'
    ];
    const modifier = getRandomElement(modifiers);
    return `${base} ${modifier}`;
  } else {
    // 10% - Queries completamente caóticas (mezcla de todo)
    const elements = [];
    const numElements = Math.floor(getTrueRandom() * 3) + 1; // 1-3 elementos
    
    for (let i = 0; i < numElements; i++) {
      const elementType = Math.floor(getTrueRandom() * 6);
      switch (elementType) {
        case 0:
          elements.push(getRandomElement(API.SINGLE_CHAR_QUERIES));
          break;
        case 1:
          elements.push(getRandomElement(API.SHORT_QUERIES));
          break;
        case 2:
          elements.push(getRandomElement(API.CREATIVE_QUERIES));
          break;
        case 3:
          elements.push(getRandomElement(API.NUMERIC_QUERIES));
          break;
        case 4:
          elements.push(getRandomElement(API.SPECIAL_PATTERNS));
          break;
        default:
          elements.push(getRandomElement(API.THEMATIC_QUERIES));
      }
    }
    
    return elements.join(' ');
  }
};

/**
 * Obtiene la query actual o genera una nueva si no existe
 */
const getCurrentQuery = (): string => {
  if (!currentQuery) {
    currentQuery = generateRandomQuery();
  }
  return currentQuery;
};

/**
 * Determina el tipo de query para mostrar al usuario
 */
export const getQueryType = (query: string): string => {
  if (API.SINGLE_CHAR_QUERIES.includes(query as (typeof API.SINGLE_CHAR_QUERIES)[number])) {
    return 'Carácter único';
  } else if (API.SHORT_QUERIES.includes(query as (typeof API.SHORT_QUERIES)[number])) {
    return 'Palabra corta';
  } else if (API.CREATIVE_QUERIES.includes(query as (typeof API.CREATIVE_QUERIES)[number])) {
    return 'Palabra creativa';
  } else if (API.NUMERIC_QUERIES.includes(query as (typeof API.NUMERIC_QUERIES)[number])) {
    return 'Numérica';
  } else if (API.SPECIAL_PATTERNS.includes(query as (typeof API.SPECIAL_PATTERNS)[number])) {
    return 'Patrón especial';
  } else if (API.THEMATIC_QUERIES.includes(query as (typeof API.THEMATIC_QUERIES)[number])) {
    return 'Temática';
  } else if (query.includes('stars:') || query.includes('language:') || query.includes('topic:')) {
    return 'Con filtros';
  } else if (query.includes(' ')) {
    return 'Combinada';
  } else {
    return 'Mixta';
  }
};

/**
 * Construye la URL de la API con los parámetros especificados
 */
const buildApiUrl = (page: number): string => {
  const query = getCurrentQuery();
  const params = new URLSearchParams({
    q: query,
    sort: API.SORT,
    order: API.ORDER,
    per_page: API.PER_PAGE.toString(),
    page: page.toString(),
  });
  
  return `${API.BASE_URL}?${params.toString()}`;
};

/**
 * Procesa un repositorio de la API para asegurar tipos y valores por defecto
 */
const processRepository = (item: Repository): Repository => ({
  id: item.id,
  name: item.name,
  description: item.description || DATA.DEFAULT_DESCRIPTION,
  html_url: item.html_url,
  size: item.size,
  stargazers_count: item.stargazers_count,
  language: item.language || DATA.DEFAULT_LANGUAGE,
  owner: {
    login: item.owner.login,
    avatar_url: item.owner.avatar_url,
    html_url: item.owner.html_url,
  },
});

/**
 * Realiza una petición a la API de GitHub con manejo de errores y timeout
 */
const fetchFromGitHubApi = async (url: string): Promise<GitHubApiResponse> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API.TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'RepoSearch-App',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 403) {
        const errorData: ApiError = await response.json();
        // Obtener información de rate limiting de los headers
        const resetTime = response.headers.get('X-RateLimit-Reset');
        const remaining = response.headers.get('X-RateLimit-Remaining');
        
        let errorMessage = `API límite alcanzado: ${errorData.message}`;
        if (resetTime) {
          const resetDate = new Date(parseInt(resetTime) * 1000);
          errorMessage += ` - Se reinicia: ${resetDate.toISOString()}`;
        }
        if (remaining) {
          errorMessage += ` - Requests restantes: ${remaining}`;
        }
        
        throw new Error(errorMessage);
      } else if (response.status === 422) {
        throw new Error('Parámetros de búsqueda inválidos');
      } else {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
    }

    const data: GitHubApiResponse = await response.json();
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Timeout: La solicitud tardó demasiado tiempo');
      }
      throw error;
    }
    
    throw new Error('Error desconocido al conectar con GitHub API');
  }
};

/**
 * Función principal para obtener los datos iniciales (página 1)
 */
export const getRepositoryData = async (): Promise<SearchResponse> => {
  try {
    // Reset del estado
    currentPage = 1;
    allRepositories = [];
    hasMoreData = true;

    const url = buildApiUrl(currentPage);
    
    const data = await fetchFromGitHubApi(url);
    
    const processedItems = data.items.map(processRepository);
    allRepositories = processedItems;
    
    // GitHub API tiene un límite de 1000 resultados (50 páginas con 20 items cada una)
    hasMoreData = data.items.length === API.PER_PAGE && currentPage < 50;
    
    const query = getCurrentQuery();
    
    const result = {
      items: processedItems,
      total_count: data.total_count,
      incomplete_results: data.incomplete_results,
      currentQuery: query,
      queryType: getQueryType(query),
    };
    
    return result;
  } catch (error) {
    console.error('Error fetching initial repository data:', error);
    throw error;
  }
};

/**
 * Función para cargar más repositorios (páginas incrementales)
 */
export const loadMoreRepositories = async (): Promise<{
  items: Repository[];
  hasMore: boolean;
  currentQuery: string;
  queryType: string;
}> => {
  try {
    if (!hasMoreData) {
      const query = getCurrentQuery();
      return { 
        items: [], 
        hasMore: false,
        currentQuery: query,
        queryType: getQueryType(query),
      };
    }

    currentPage += 1;
    const url = buildApiUrl(currentPage);
    const data = await fetchFromGitHubApi(url);
    
    const processedItems = data.items.map(processRepository);
    allRepositories = [...allRepositories, ...processedItems];
    
    // Verificar si hay más datos disponibles
    hasMoreData = data.items.length === API.PER_PAGE && currentPage < 50;
    
    const query = getCurrentQuery();
    
    return {
      items: processedItems,
      hasMore: hasMoreData,
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
  return [...allRepositories];
};

/**
 * Función para resetear el estado de paginación
 */
export const resetPagination = (): void => {
  currentPage = 1;
  allRepositories = [];
  hasMoreData = true;
  currentQuery = ''; // Reset query para generar una nueva
};

/**
 * Función para obtener el estado actual de la paginación
 */
export const getPaginationState = () => {
  const query = getCurrentQuery();
  return {
    currentPage,
    totalLoaded: allRepositories.length,
    hasMore: hasMoreData,
    currentQuery: query,
    queryType: getQueryType(query),
  };
};

/**
 * Función para forzar una nueva query aleatoria
 */
export const generateNewRandomQuery = (): string => {
  currentQuery = generateRandomQuery();
  return currentQuery;
};