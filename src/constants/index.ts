/**
 * Constantes centralizadas de la aplicación
 */

// Configuración de animaciones
export const ANIMATION = {
  DELAY_MS: 120,
  INITIAL_LOAD_DELAY_MS: 100,
  LOADING_DELAY_MS: 1500,
  TRANSITION_DURATION: 'duration-300',
  TRANSITION_EASING: 'ease-out',
} as const;

// Configuración de layout
export const LAYOUT = {
  MASONRY_BREAKPOINTS: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4,
  },
  MASONRY_SPACING: {
    xs: 1,
    sm: 1.25,
    md: 1.25,
    lg: 1.5,
    xl: 1.5,
  },
} as const;

// Configuración de datos
export const DATA = {
  ITEMS_PER_PAGE: 20,
  DEFAULT_DESCRIPTION: 'Sin descripción disponible',
  DEFAULT_LANGUAGE: 'No especificado',
} as const;

// Clases CSS reutilizables
export const CSS_CLASSES = {
  BUTTON_BASE: 'py-3 px-6 rounded-full transition-all duration-300 hover:cursor-pointer hover:scale-105 shadow-lg',
  BUTTON_ACTIVE: 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white',
  BUTTON_DISABLED: 'bg-gray-400 dark:bg-gray-600 text-gray-200 cursor-not-allowed transform-none',
  ANIMATION_BASE: 'break-inside-avoid mb-4 sm:mb-5 md:mb-6 inline-block w-full transition-opacity duration-300 ease-out',
  ANIMATION_VISIBLE: 'opacity-100',
  ANIMATION_HIDDEN: 'opacity-0',
} as const;

// Mensajes de la aplicación
export const MESSAGES = {
  LOADING: 'Cargando...',
  LOAD_MORE: 'Cargar más repositorios',
  ALL_LOADED: '¡Has cargado todos los repositorios disponibles!',
  LOADING_ARIA_LABEL: 'Cargando repositorios',
  LOAD_MORE_ARIA_LABEL: 'Cargar más repositorios',
} as const;