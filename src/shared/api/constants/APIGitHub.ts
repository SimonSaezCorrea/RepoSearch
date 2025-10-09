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

} as const;

export const QUERY = {
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