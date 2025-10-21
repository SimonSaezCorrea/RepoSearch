import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import React, { memo, useMemo } from 'react';

import { LoadingSpinner } from '../../../shared';
import {
  ORDER_OPTIONS,
  SORT_OPTIONS
} from '../constants/Controls';
import { useSearchForm } from '../hooks/useSearchForm';
import '../styles/SearchControls.css';
import { type SearchFilters } from '../types/search';

import CustomSelect from './CustomSelect';




// Re-exportar SearchFilters desde el archivo de tipos central
export type { SearchFilters };

interface SearchControlsProps {
  onManualSearch: (searchQuery: string, repositoryQuery: string, userQuery: string, filters: SearchFilters) => void;
  isLoading?: boolean;
  currentQuery?: string;
  queryType?: string;
  repositoryCount?: number;
}

/**
 * Componente de Controles de Búsqueda, ahora centrado en la UI y delegando
 * la lógica de estado al hook `useSearchForm`.
 */
const SearchControls: React.FC<SearchControlsProps> = ({ 
  onManualSearch, 
  isLoading = false, 
  currentQuery = '',
  repositoryCount = 0 
}) => {
  
  const {
    searchInput,
    repositoryInput,
    userInput,
    showFilters,
    filters,
    setSearchInput,
    setRepositoryInput,
    setUserInput,
    toggleFilters,
    updateFilter,
    handleSubmit,
  } = useSearchForm(onManualSearch, isLoading);

  // Obtener fecha actual en formato YYYY-MM-DD usando zona horaria local
  const getTodayDate = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  return (
    <div className="search-controls-header">
      <div className="search-controls-container">

        {/* Título y subtítulo (oculto en este layout, manejado por HeaderSearch) */}
        <div className="search-controls-title">
          <h1 className="search-controls-title-gradient">
            Explorador de Repositorios GitHub
          </h1>
          <p className="search-controls-subtitle">
            Descubre proyectos increíbles y encuentra inspiración para tu próximo desarrollo
          </p>
        </div>

        {/* Controles de búsqueda principales */}
        <div className="search-controls-main">
          <div className="search-controls-input-group">
            <form onSubmit={handleSubmit} className="search-controls-input-container">
              {/* Buscador generico */}
              <label htmlFor="repository-search" className="search-controls-label">Buscar:</label>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Ingrese términos de búsqueda"
                className="search-controls-input"
                disabled={isLoading}
              />

              {/* Botón de Búsqueda */}
              <button
                type="submit"
                disabled={isLoading}
                className="search-controls-button"
                aria-disabled={isLoading}
              >
                {isLoading ? (<LoadingSpinner message='' size='sm'/>) : (<Search />)} Buscar
              </button>
            </form>
          </div>
        </div>

        {/* Filtros expandibles */}
        <div className="search-controls-filters-container">
          <button
            onClick={toggleFilters}
            className="search-controls-filters-toggle"
            aria-expanded={showFilters}
            aria-controls="advanced-filters-content"
          >
            <span className="search-controls-filters-title">
              Filtros Avanzados {showFilters ? (<ChevronUp />) : (<ChevronDown />)}
            </span>
          </button>

          {showFilters && (
            <div id="advanced-filters-content" className="search-controls-filters-content animate-fadeIn">
              <div className="search-controls-filters-grid">
                
                {/* Ordenamiento (Sort) */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">Ordenar por</label>
                  <CustomSelect
                    options={SORT_OPTIONS}
                    value={filters.sort}
                    onChange={(value) => updateFilter('sort', value)}
                    className="search-controls-filter-input"
                    placeholder="Ordenar por"
                    isCompact={true}
                    maxMenuHeight={140}
                    menuPlacement="bottom"
                  />
                </div>

                {/* Orden (Order) */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">Orden</label>
                  <CustomSelect
                    options={ORDER_OPTIONS}
                    value={filters.order}
                    onChange={(value) => updateFilter('order', value)}
                    className="search-controls-filter-input"
                    placeholder="Orden"
                    isCompact={true}
                    maxMenuHeight={80}
                    menuPlacement="bottom"
                  />
                </div>

                {/* Input de Repositorio */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">Repositorio</label>
                  <input
                    type="text"
                    value={repositoryInput}
                     onChange={(e) => setRepositoryInput(e.target.value)}
                    placeholder="Buscar repositorios..."
                    className="search-controls-filter-input"
                    disabled={isLoading}
                  />
                </div>

                {/* Input de Usuario */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">Usuario</label>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="search-controls-filter-input"
                    placeholder="Buscar usuarios..."
                    disabled={isLoading}
                  />
                </div>

                {/* Lenguaje (Language) */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">Lenguaje</label>
                  <input
                    type="text"
                    value={filters.language || ''}
                    onChange={(e) => updateFilter('language', e.target.value)}
                    className="search-controls-filter-input"
                    placeholder="ej: JavaScript, Python, Go..."
                    disabled={isLoading}
                  />
                </div>

                {/* Estrellas (Stars) */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">Estrellas (mínimo)</label>
                  <input
                    type="number"
                    min="0"
                    value={filters.stars !== null ? filters.stars : ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '') {
                        updateFilter('stars', null);
                      } else {
                        const numValue = parseInt(value);
                        // Validar que el número no sea negativo
                        if (!isNaN(numValue) && numValue >= 0) {
                          updateFilter('stars', numValue);
                        } else if (numValue < 0) {
                          // Si es negativo, establecer a 0
                          updateFilter('stars', 0);
                        } else {
                          updateFilter('stars', null);
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      // Prevenir la entrada de los caracteres '-' y 'e'
                      if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                        e.preventDefault();
                      }
                    }}
                    className="search-controls-filter-input search-controls-filter-input-number"
                    placeholder="ej: 0, 10, 100..."
                    disabled={isLoading}
                  />
                </div>

                {/* Organización */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">Organización</label>
                  <input
                    type="text"
                    value={filters.organization || ''}
                    onChange={(e) => updateFilter('organization', e.target.value)}
                    className="search-controls-filter-input"
                    placeholder="ej: microsoft, google..."
                    disabled={isLoading}
                  />
                </div>

                {/* Fecha de creación */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">Creado después de</label>
                  <input
                    type="date"
                    value={filters.createdDate || ''}
                    onChange={(e) => updateFilter('createdDate', e.target.value)}
                    max={getTodayDate}
                    className="search-controls-filter-input"
                    disabled={isLoading}
                  />
                </div>

                {/* Fecha de último push */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">Último push después de</label>
                  <input
                    type="date"
                    value={filters.pushedDate || ''}
                    onChange={(e) => updateFilter('pushedDate', e.target.value)}
                    max={getTodayDate}
                    className="search-controls-filter-input"
                    disabled={isLoading}
                  />
                </div>

                {/* Tópico */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">Tópico</label>
                  <input
                    type="text"
                    value={filters.topic || ''}
                    onChange={(e) => updateFilter('topic', e.target.value)}
                    className="search-controls-filter-input"
                    placeholder="ej: web, mobile, ai..."
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Información de Búsqueda Actual */}
        {repositoryCount > 0 && (
          <div className="search-controls-info">
            <div className="search-controls-info-content">
              <div className="search-controls-info-details">
                <p className="search-controls-info-text">
                  <span className="search-controls-info-query">🔍 Query: "{currentQuery}"</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SearchControls);
