import { useCallback, useState } from 'react';

import { type SearchFilters, type SearchType } from '../types/search';

// Definición de los filtros iniciales para resetear o comenzar
const INITIAL_FILTERS: SearchFilters = {
  sort: 'relevance',
  order: 'desc',
  language: null,
  stars: null,
  organization: null,
  createdDate: null,
  pushedDate: null,
  topic: null,
  size: null,
};

/**
 * Hook personalizado para gestionar el estado del formulario de búsqueda manual.
 * Incluye el input de texto, el tipo de búsqueda y los filtros avanzados.
 */
export const useSearchForm = (
  onManualSearch: (
    query: string, 
    type: SearchType, 
    filters: SearchFilters
  ) => void,
  isLoading: boolean
) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchType, setSearchType] = useState<SearchType>('repository');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<SearchFilters>(INITIAL_FILTERS);

  /**
   * Actualiza un filtro específico, manejando la conversión a string simple o null.
   */
  const updateFilter = useCallback(
    <K extends keyof SearchFilters>(
      key: K, 
      value: SearchFilters[K] | string | string[] | null
    ) => {
      // Asegura que valores como lenguaje y estrellas se guarden como string o null
      const stringValue = Array.isArray(value) ? value[0] : value;

      setFilters(prev => ({
        ...prev,
        [key]: stringValue === '' ? null : stringValue, // Usa null para "Cualquier"
      }));
    },
    []
  );

  /**
   * Maneja el envío del formulario, validando la entrada y llamando a la función
   * de búsqueda proporcionada por el componente padre (App.tsx).
   * Permite búsquedas vacías (aleatorias) si no hay input pero sí filtros.
   */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      
      if (isLoading) return;
      
      const query = searchInput.trim();
      
      // Si hay query, búsqueda normal
      if (query) {
        onManualSearch(query, searchType, filters);
        return;
      }
      
      // Si no hay query pero hay filtros aplicados, hacer búsqueda con filtros
      const hasFilters = Object.values(filters).some(value => 
        value !== null && value !== 'relevance' && value !== 'desc'
      );
      
      if (hasFilters) {
        // Búsqueda con filtros pero sin query específico
        onManualSearch('', searchType, filters);
        return;
      }
      
      // Si no hay query ni filtros, búsqueda aleatoria
      // Llamar a la función de búsqueda aleatoria a través de un query vacío
      onManualSearch('', searchType, filters);
    },
    [searchInput, searchType, filters, onManualSearch, isLoading]
  );
  
  /**
   * Alterna la visibilidad de los filtros avanzados.
   */
  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  return {
    // Estado
    searchInput,
    searchType,
    showFilters,
    filters,
    
    // Acciones
    setSearchInput,
    setSearchType,
    toggleFilters,
    updateFilter,
    handleSubmit,
  };
};
