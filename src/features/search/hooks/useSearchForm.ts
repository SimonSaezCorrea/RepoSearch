import { useCallback, useState } from 'react';

import { type SearchFilters, type SearchType } from '../types/search';

// Definición de los filtros iniciales para resetear o comenzar
const INITIAL_FILTERS: SearchFilters = {
  sort: 'updated',
  order: 'desc',
  language: null,
  stars: null,
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
   */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      
      const query = searchInput.trim();
      if (query && !isLoading) {
        onManualSearch(query, searchType, filters);
      }
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
