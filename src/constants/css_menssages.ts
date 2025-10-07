// Clases CSS reutilizables
export const CSS_CLASSES = {
  BUTTON_BASE: 'py-3 px-6 rounded-full transition-all duration-300 hover:cursor-pointer hover:scale-105 shadow-lg',
  BUTTON_ACTIVE: 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white',
  BUTTON_DISABLED: 'bg-gray-400 dark:bg-gray-600 text-gray-200 cursor-not-allowed transform-none',
} as const;

// Mensajes de la aplicación
export const MESSAGES = {
  LOADING: 'Cargando...',
  LOAD_MORE: 'Cargar más repositorios',
  ALL_LOADED: '¡Has cargado todos los repositorios disponibles!',
  LOADING_ARIA_LABEL: 'Cargando repositorios',
  LOAD_MORE_ARIA_LABEL: 'Cargar más repositorios',
  ERROR_LOADING: 'Error al cargar los repositorios',
  ERROR_NETWORK: 'Error de conexión. Verifica tu internet e intenta nuevamente.',
  ERROR_API_LIMIT: 'Se ha alcanzado el límite de la API de GitHub. Intenta más tarde.',
  RETRY: 'Reintentar',
} as const;