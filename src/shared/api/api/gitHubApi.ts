import { API } from "../constants/APIGitHub";

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
  forks_count: number;
  language: string | null;
  owner: RepositoryOwner;
}

export interface GitHubApiResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export interface ApiError {
  message: string;
  documentation_url?: string;
}

/**
 * Realiza una petición a la API de GitHub con manejo de errores y timeout
 */
export const fetchFromGitHubApi = async (url: string): Promise<GitHubApiResponse> => {
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
 * Construye la URL de la API con los parámetros especificados
 */
export const buildApiUrl = (
  query: string, 
  page: number, 
  sort?: string, 
  order?: string
): string => {
  const params = new URLSearchParams({
    q: query,
    sort: sort || API.SORT,
    order: order || API.ORDER,
    per_page: API.PER_PAGE.toString(),
    page: page.toString(),
  });
  
  return `${API.BASE_URL}?${params.toString()}`;
};