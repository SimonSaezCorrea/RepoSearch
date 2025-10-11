import { type ReactNode } from "react";

import { type Repository } from "../../../shared/api/type/github";

/**
 * Define la estructura de los filtros de búsqueda manual.
 */
export interface SearchFilters {
  sort: 'relevance' | 'updated' | 'stars' | 'created' | 'forks';
  order: 'desc' | 'asc';
  language?: string | null;
  stars?: number | null;
  organization?: string | null;
  createdDate?: string | null;
  pushedDate?: string | null;
  topic?: string | null;
  size?: string | null;
}

/**
 * Define la estructura de la respuesta de búsqueda del servicio.
 */
export interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
  currentQuery: string;
  queryType: string;
}

/**
 * Define los tipos de búsqueda que el usuario puede seleccionar.
 */
export type SearchType = 'repository' | 'user' | 'both';

/**
 * Props para el componente Sidebar.
 */
export interface SidebarProps {
  onManualSearch: (repositoryQuery: string, userQuery: string, filters: SearchFilters) => void;
  onRandomSearch: () => void;
  isLoading?: boolean;
  currentQuery?: string;
  queryType?: string;
  repositoryCount?: number;
}

/**
 * Props para el componente de selección.
 */
export interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

/**
 * Props para el componente CustomSelect.
 */

export interface CustomSelectProps {
  options: SelectOption[];
  value?: string | string[];
  onChange: (value: string | string[] | null) => void;
  placeholder?: string;
  isMulti?: boolean;
  isDisabled?: boolean;
  className?: string;
  menuPlacement?: 'auto' | 'bottom' | 'top';
  maxMenuHeight?: number;
  isCompact?: boolean; // Nueva prop para sidebar compacto
  smartPlacement?: boolean; // Nueva prop para colocación inteligente
}