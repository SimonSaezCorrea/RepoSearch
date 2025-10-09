import { QUERY } from '../constants/APIGitHub';

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
export const generateRandomQuery = (): string => {
  const strategy = Math.floor(getTrueRandom() * 100);
  
  if (strategy < 15) {
    // 15% - Caracteres individuales (incluyendo símbolos)
    return getRandomElement(QUERY.SINGLE_CHAR_QUERIES);
  } else if (strategy < 25) {
    // 10% - Palabras muy cortas
    return getRandomElement(QUERY.SHORT_QUERIES);
  } else if (strategy < 35) {
    // 10% - Palabras inventadas/creativas
    return getRandomElement(QUERY.CREATIVE_QUERIES);
  } else if (strategy < 45) {
    // 10% - Números y versiones
    return getRandomElement(QUERY.NUMERIC_QUERIES);
  } else if (strategy < 55) {
    // 10% - Patrones especiales
    return getRandomElement(QUERY.SPECIAL_PATTERNS);
  } else if (strategy < 70) {
    // 15% - Queries temáticas normales
    return getRandomElement(QUERY.THEMATIC_QUERIES);
  } else if (strategy < 80) {
    // 10% - Combinación de dos elementos aleatorios
    const first = getRandomElement([
      ...QUERY.SHORT_QUERIES,
      ...QUERY.CREATIVE_QUERIES,
      ...QUERY.THEMATIC_QUERIES.slice(0, 20) // Solo algunas temáticas
    ]);
    const second = getRandomElement([
      ...QUERY.SINGLE_CHAR_QUERIES.slice(0, 26), // Solo letras
      ...QUERY.NUMERIC_QUERIES.slice(0, 10),
      ...QUERY.SHORT_QUERIES
    ]);
    return `${first} ${second}`;
  } else if (strategy < 90) {
    // 10% - Queries con modificadores GitHub
    const base = getRandomElement([
      ...QUERY.THEMATIC_QUERIES,
      ...QUERY.SHORT_QUERIES,
      ...QUERY.CREATIVE_QUERIES
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
          elements.push(getRandomElement(QUERY.SINGLE_CHAR_QUERIES));
          break;
        case 1:
          elements.push(getRandomElement(QUERY.SHORT_QUERIES));
          break;
        case 2:
          elements.push(getRandomElement(QUERY.CREATIVE_QUERIES));
          break;
        case 3:
          elements.push(getRandomElement(QUERY.NUMERIC_QUERIES));
          break;
        case 4:
          elements.push(getRandomElement(QUERY.SPECIAL_PATTERNS));
          break;
        default:
          elements.push(getRandomElement(QUERY.THEMATIC_QUERIES));
      }
    }
    
    return elements.join(' ');
  }
};

/**
 * Determina el tipo de query para mostrar al usuario
 */
export const getQueryType = (query: string): string => {
  if (QUERY.SINGLE_CHAR_QUERIES.includes(query as (typeof QUERY.SINGLE_CHAR_QUERIES)[number])) {
    return 'Carácter único';
  } else if (QUERY.SHORT_QUERIES.includes(query as (typeof QUERY.SHORT_QUERIES)[number])) {
    return 'Palabra corta';
  } else if (QUERY.CREATIVE_QUERIES.includes(query as (typeof QUERY.CREATIVE_QUERIES)[number])) {
    return 'Palabra creativa';
  } else if (QUERY.NUMERIC_QUERIES.includes(query as (typeof QUERY.NUMERIC_QUERIES)[number])) {
    return 'Numérica';
  } else if (QUERY.SPECIAL_PATTERNS.includes(query as (typeof QUERY.SPECIAL_PATTERNS)[number])) {
    return 'Patrón especial';
  } else if (QUERY.THEMATIC_QUERIES.includes(query as (typeof QUERY.THEMATIC_QUERIES)[number])) {
    return 'Temática';
  } else if (query.includes('stars:') || query.includes('language:') || query.includes('topic:')) {
    return 'Con filtros';
  } else if (query.includes(' ')) {
    return 'Combinada';
  } else {
    return 'Mixta';
  }
};