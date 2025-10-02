/**
 * Utilidades para manejo de errores en la aplicación
 */

export interface AppError {
  message: string;
  type: 'network' | 'api' | 'timeout' | 'empty_results' | 'unknown';
  retryable: boolean;
}

/**
 * Crea un objeto de error tipado para la aplicación
 */
export const createAppError = (
  message: string, 
  type: AppError['type'] = 'unknown',
  retryable: boolean = true
): AppError => ({
  message,
  type,
  retryable,
});

/**
 * Procesa errores de la API y los convierte en errores de aplicación
 */
export const processApiError = (error: unknown): AppError => {
  if (error instanceof Error) {
    if (error.message.includes('Timeout')) {
      return createAppError(
        'La solicitud tardó demasiado tiempo. Verifica tu conexión.',
        'timeout',
        true
      );
    } else if (error.message.includes('API límite')) {
      return createAppError(
        'Se ha alcanzado el límite de la API de GitHub. Intenta más tarde.',
        'api',
        false
      );
    } else if (error.message.includes('Error HTTP')) {
      return createAppError(
        'Error de servidor. Intenta nuevamente.',
        'network',
        true
      );
    }
    
    return createAppError(error.message, 'unknown', true);
  }
  
  return createAppError(
    'Error desconocido. Intenta nuevamente.',
    'unknown',
    true
  );
};

/**
 * Determina si se debe reintentar automáticamente basado en el error
 */
export const shouldAutoRetry = (error: AppError, retryCount: number, maxRetries: number): boolean => {
  return error.retryable && retryCount < maxRetries && error.type !== 'api';
};

/**
 * Genera un mensaje de error amigable para el usuario
 */
export const getUserFriendlyErrorMessage = (error: AppError): string => {
  switch (error.type) {
    case 'network':
      return 'Problema de conexión. Verifica tu internet e intenta nuevamente.';
    case 'api':
      return 'Límite de la API alcanzado. Intenta más tarde o genera una nueva búsqueda.';
    case 'timeout':
      return 'La solicitud tardó demasiado. Intenta con una búsqueda más específica.';
    case 'empty_results':
      return 'No se encontraron repositorios. Generando nueva búsqueda automáticamente...';
    default:
      return error.message;
  }
};