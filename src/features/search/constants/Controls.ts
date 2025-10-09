import { type SelectOption } from "../types/search";
export const SORT_OPTIONS: SelectOption[] = [
  { value: 'updated', label: '🕒 Más reciente' },
  { value: 'stars', label: '⭐ Más estrellas' },
  { value: 'created', label: '🆕 Más nuevo' },
  { value: 'forks', label: '🍴 Más forks' },
];

export const SEARCH_TYPE_OPTIONS: SelectOption[] = [
  { value: 'repository', label: '📦 Repositorios', icon: '📦' },
  { value: 'user', label: '👤 Usuarios', icon: '👤' },
];

export const ORDER_OPTIONS: SelectOption[] = [
  { value: 'desc', label: '⬇️ Descendente' },
  { value: 'asc', label: '⬆️ Ascendente' },
];

export const LANGUAGE_OPTIONS: SelectOption[] = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'C++', 'C#', 
  'PHP', 'Ruby', 'Swift', 'Kotlin', 'Dart', 'Vue', 'React'
].map(lang => ({ value: lang.toLowerCase(), label: lang }));

export const STAR_RANGE_OPTIONS: SelectOption[] = [
  { value: '>1', label: '⭐ Más de 1 estrella' },
  { value: '>10', label: '⭐ Más de 10 estrellas' },
  { value: '>50', label: '⭐ Más de 50 estrellas' },
  { value: '>100', label: '⭐ Más de 100 estrellas' },
  { value: '>500', label: '⭐ Más de 500 estrellas' },
  { value: '>1000', label: '⭐ Más de 1000 estrellas' },
];