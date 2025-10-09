import { type SelectOption } from "../types/search";

export const SORT_OPTIONS: SelectOption[] = [
  { value: 'relevance', label: '🎯 Relevancia' },
  { value: 'updated', label: '🕒 Más reciente' },
  { value: 'stars', label: '⭐ Más estrellas' },
  { value: 'created', label: '🆕 Más nuevo' },
  { value: 'forks', label: '🍴 Más forks' },
];

export const SEARCH_TYPE_OPTIONS: SelectOption[] = [
  { value: 'repository', label: '📦 Repositorios', icon: '📦' },
  { value: 'user', label: '👤 Usuarios', icon: '👤' },
  { value: 'both', label: '🔍 Ambos', icon: '🔍' },
];

export const ORDER_OPTIONS: SelectOption[] = [
  { value: 'desc', label: '⬇️ Descendente' },
  { value: 'asc', label: '⬆️ Ascendente' },
];

// Eliminamos LANGUAGE_OPTIONS y STAR_RANGE_OPTIONS ya que ahora serán campos de texto libre