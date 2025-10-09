import { API } from "../constants/APIGitHub";
import type { ApiError, GitHubApiResponse } from "../type/github";

/**
 * Realiza una petición a la API de GitHub con manejo de errores
 */
export const fetchFromGitHubApi = async (url: string): Promise<GitHubApiResponse> => {
  const controller = new AbortController();

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'RepoSearch-App',
      },
    });

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