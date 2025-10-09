import React, { memo } from 'react';

import {
  LANGUAGE_OPTIONS,
  ORDER_OPTIONS,
  SEARCH_TYPE_OPTIONS,
  SORT_OPTIONS,
  STAR_RANGE_OPTIONS
} from '../constants/Controls';
import { useSearchForm } from '../hooks/useSearchForm';
import '../styles/SearchControls.css';
import { type SearchFilters, type SearchType } from '../types/search';

import CustomSelect from './CustomSelect';

// Re-exportar SearchFilters desde el archivo de tipos central
export type { SearchFilters };

interface SearchControlsProps {
  onManualSearch: (query: string, type: SearchType, filters: SearchFilters) => void;
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
  queryType = '', 
  repositoryCount = 0 
}) => {
  
  const {
    searchInput,
    searchType,
    showFilters,
    filters,
    setSearchInput,
    setSearchType,
    toggleFilters,
    updateFilter,
    handleSubmit,
  } = useSearchForm(onManualSearch, isLoading);

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
              {/* Selector de Tipo de Búsqueda */}
              <CustomSelect
                options={SEARCH_TYPE_OPTIONS}
                value={searchType}
                onChange={(value) => setSearchType(value as SearchType)}
                placeholder="Tipo de búsqueda"
                isDisabled={isLoading}
                className="search-controls-type-select"
                isCompact={true}
                maxMenuHeight={120}
                menuPlacement="bottom"
              />

              {/* Input de Búsqueda */}
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={searchType === 'repository' ? 'Buscar repositorios...' : 'Buscar usuarios...'}
                className="search-controls-input"
                disabled={isLoading}
                aria-label={`Buscar ${searchType === 'repository' ? 'repositorios' : 'usuarios'}`}
              />

              {/* Botón de Búsqueda */}
              <button
                type="submit"
                disabled={isLoading || !searchInput.trim()}
                className="search-controls-button"
                aria-disabled={isLoading || !searchInput.trim()}
              >
                {isLoading ? '🔄' : '🔍'} Buscar
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
              Filtros Avanzados {showFilters ? '🔽' : '▶️'}
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

                {/* Lenguaje (Language) */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">Lenguaje</label>
                  <CustomSelect
                    options={[
                      { value: '', label: 'Cualquier lenguaje' },
                      ...LANGUAGE_OPTIONS
                    ]}
                    value={filters.language || ''}
                    onChange={(value) => updateFilter('language', value)}
                    className="search-controls-filter-input"
                    placeholder="Seleccionar lenguaje"
                    isCompact={true}
                    maxMenuHeight={160}
                    menuPlacement="bottom"
                  />
                </div>

                {/* Estrellas (Stars) */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">Estrellas</label>
                  <CustomSelect
                    options={[
                      { value: '', label: 'Cualquier cantidad' },
                      ...STAR_RANGE_OPTIONS
                    ]}
                    value={filters.stars || ''}
                    onChange={(value) => updateFilter('stars', value)}
                    className="search-controls-filter-input"
                    placeholder="Rango de estrellas"
                    isCompact={true}
                    maxMenuHeight={180}
                    smartPlacement={true}
                    menuPlacement="auto"
                  />
                </div>
                {/* Nota: Se omiten 'size', 'pushed', 'topics' para mantener el foco en la refactorización principal, 
                pero se ha sentado la base para incluirlos con 'updateFilter'. */}
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
                  🔍 <span className="search-controls-info-query">"{currentQuery}"</span> •
                  <span className="search-controls-info-type">🏷️ {queryType}</span> •
                  <span className="search-controls-info-count">📦 {repositoryCount} repositorios</span>
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
