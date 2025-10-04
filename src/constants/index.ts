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

// Configuración de API
export const API = {
  BASE_URL: 'https://api.github.com/search/repositories',
  DEFAULT_QUERY: 'javascript', // Fallback si falla la generación aleatoria
  SORT: 'updated',
  ORDER: 'desc',
  PER_PAGE: 100, // Máximo permitido por GitHub para optimizar rate limiting
  CLIENT_PAGE_SIZE: 20, // Cuántos elementos mostrar al usuario de una vez
  TIMEOUT_MS: 10000,
  // Queries de caracteres individuales y símbolos
  SINGLE_CHAR_QUERIES: [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    '#', '@', '$', '%', '&', '*', '+', '-', '=', '_', '!', '?'
  ],
  // Palabras cortas y fragmentos
  SHORT_QUERIES: [
    'ai', 'ui', 'db', 'os', 'fs', 'io', 'ml', 'ar', 'vr', 'cv', 'ux', 'dx',
    'aws', 'api', 'app', 'bot', 'cli', 'cms', 'css', 'gpu', 'ide', 'ios', 'jwt', 'npm',
    'orm', 'php', 'pwa', 'sdk', 'sql', 'svg', 'tcp', 'tdd', 'url', 'xml', 'yml'
  ],
  // Palabras inventadas y combinaciones únicas
  CREATIVE_QUERIES: [
    'zyx', 'qwe', 'asdf', 'zxcv', 'mnbv', 'poiu', 'lkjh', 'gfds', 'trewq', 'yhnb',
    'xyz', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqr', 'stu', 'vwx', 'yzab',
    'foo', 'bar', 'baz', 'qux', 'quux', 'corge', 'grault', 'garply', 'waldo', 'fred'
  ],
  // Queries con números y patrones
  NUMERIC_QUERIES: [
    '2023', '2024', '2025', '100', '200', '300', '500', '1000', '2000', '5000',
    'v1', 'v2', 'v3', 'v4', 'v5', '1.0', '2.0', '3.0', 'beta', 'alpha', 'rc1'
  ],
  // Queries temáticas diversas
  THEMATIC_QUERIES: [
    'javascript', 'python', 'typescript', 'react', 'nodejs', 'vue', 'angular',
    'docker', 'kubernetes', 'web', 'mobile', 'game', 'tool', 'library',
    'framework', 'bot', 'ai', 'machine-learning', 'data', 'blockchain',
    'crypto', 'security', 'database', 'cli', 'automation', 'testing',
    'cloud', 'backend', 'frontend', 'fullstack', 'portfolio', 'starter',
    'template', 'tutorial', 'example', 'demo', 'utility', 'plugin',
    'theme', 'design', 'css', 'html', 'sass', 'bootstrap', 'tailwind',
    'music', 'video', 'photo', 'editor', 'converter', 'downloader',
    'scraper', 'parser', 'generator', 'validator', 'formatter', 'optimizer'
  ],
  // Patrones con caracteres especiales
  SPECIAL_PATTERNS: [
    'a-b', 'x-y', '1-2', 'A-Z', 'test-', '-app', '_util', 'lib_', '.config',
    'my-', 'new-', 'old-', 'mini-', 'micro-', 'super-', 'mega-', 'ultra-',
    'pro-', 'dev-', 'beta-', 'alpha-', 'v1-', 'v2-', 'next-', 'latest-'
  ]
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
  ERROR_LOADING: 'Error al cargar los repositorios',
  ERROR_NETWORK: 'Error de conexión. Verifica tu internet e intenta nuevamente.',
  ERROR_API_LIMIT: 'Se ha alcanzado el límite de la API de GitHub. Intenta más tarde.',
  RETRY: 'Reintentar',
} as const;