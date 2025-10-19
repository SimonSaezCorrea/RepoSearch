import { useCallback, useState } from 'react';

import { type SearchFilters } from '../types/search';

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
    repositoryQuery: string,
    userQuery: string, 
    filters: SearchFilters
  ) => void,
  isLoading: boolean
) => {
  const [repositoryInput, setRepositoryInput] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
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
   * Maneja el envío del formulario y llama a la función de búsqueda.
   * Con stars:>0 por defecto, siempre hay contenido válido en la query.
   */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      
      if (isLoading) return;
      
      const repositoryQuery = repositoryInput.trim();
      const userQuery = userInput.trim();
      
      // Realizar búsqueda con los queries y filtros proporcionados
      // Siempre se agregará stars:>0 si no se especifica otro valor
      onManualSearch(repositoryQuery, userQuery, filters);
    },
    [repositoryInput, userInput, filters, onManualSearch, isLoading]
  );
  
  /**
   * Alterna la visibilidad de los filtros avanzados.
   */
  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  return {
    // Estado
    repositoryInput,
    userInput,
    showFilters,
    filters,
    
    // Acciones
    setRepositoryInput,
    setUserInput,
    toggleFilters,
    updateFilter,
    handleSubmit,
  };
};
