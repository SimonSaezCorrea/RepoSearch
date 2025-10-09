import React, { useState } from 'react';

import CustomSelect from '../../components/CustomSelect';
import {
  LANGUAGE_OPTIONS,
  ORDER_OPTIONS,
  SEARCH_TYPE_OPTIONS,
  SORT_OPTIONS,
  STAR_RANGE_OPTIONS
} from '../constants/Controls';
import './SearchControls.css';

export interface SearchFilters {
  sort: 'updated' | 'stars' | 'created' | 'forks';
  order: 'desc' | 'asc';
  language?: string;
  stars?: string;
  size?: string;
  pushed?: string;
  topics?: string[];
}
interface SearchControlsProps {
  onManualSearch: (query: string, type: 'repository' | 'user', filters: SearchFilters) => void;
  isLoading?: boolean;
  currentQuery?: string;
  queryType?: string;
  repositoryCount?: number;
}

const SearchControls: React.FC<SearchControlsProps> = ({ onManualSearch, isLoading = false, currentQuery = '', queryType = '', repositoryCount = 0 }) => {

  const [searchInput, setSearchInput] = useState<string>('');
  const [searchType, setSearchType] = useState<'repository' | 'user'>('repository');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<SearchFilters>({
    sort: 'updated',
    order: 'desc',
  });

  const updateFilter = (key: keyof SearchFilters, value: string | string[] | null) => {
    // Asegurar que solo manejamos strings simples para estos campos específicos
    const stringValue = Array.isArray(value) ? value[0] : value;
    setFilters(prev => ({
      ...prev,
      [key]: stringValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onManualSearch(searchInput.trim(), searchType, filters);
    }
  };

  return (
    <div className="search-controls-header">
      <div className="search-controls-container">
        {/* Título principal */}
        <div className="search-controls-title">
          <h1 className="search-controls-title-gradient">
            Explorador de Repositorios GitHub
          </h1>
          <p className="search-controls-subtitle">
            Descubre proyectos increíbles y encuentra inspiración para tu próximo desarrollo
          </p>
        </div>

        {/* Controles de búsqueda */}
        <div className="search-controls-main">
          <div className="search-controls-input-group">
            <form onSubmit={handleSubmit} className="search-controls-input-container">
              <CustomSelect
                options={SEARCH_TYPE_OPTIONS}
                value={searchType}
                onChange={(value) => setSearchType(value as 'repository' | 'user')}
                placeholder="Tipo de búsqueda"
                isDisabled={isLoading}
                className="search-controls-type-select"
                isCompact={true}
                maxMenuHeight={120}
                menuPlacement="bottom"
              />

              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={searchType === 'repository' ? 'Buscar repositorios...' : 'Buscar usuarios...'}
                className="search-controls-input"
                disabled={isLoading}
              />

              <button
                type="submit"
                disabled={isLoading || !searchInput.trim()}
                className="search-controls-button"
              >
                {isLoading ? '🔄' : '🔍'} Buscar
              </button>
            </form>
          </div>
        </div>

        {/* Filtros expandibles */}
        <div className="search-controls-filters-container">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="search-controls-filters-toggle"
          >
            <span className="search-controls-filters-title">
              Filtros Avanzados {showFilters ? '🔽' : '▶️'}
            </span>
          </button>

          {showFilters && (
            <div className="search-controls-filters-content">
              <div className="search-controls-filters-grid">
                {/* Ordenamiento */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">
                    Ordenar por
                  </label>
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

                {/* Orden */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">
                    Orden
                  </label>
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

                {/* Lenguaje */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">
                    Lenguaje
                  </label>
                  <CustomSelect
                    options={[
                      { value: '', label: 'Cualquier lenguaje' },
                      ...LANGUAGE_OPTIONS
                    ]}
                    value={filters.language || ''}
                    onChange={(value) => updateFilter('language', value || null)}
                    className="search-controls-filter-input"
                    placeholder="Seleccionar lenguaje"
                    isCompact={true}
                    maxMenuHeight={160}
                    menuPlacement="bottom"
                  />
                </div>

                {/* Estrellas */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">
                    Estrellas
                  </label>
                  <CustomSelect
                    options={[
                      { value: '', label: 'Cualquier cantidad' },
                      ...STAR_RANGE_OPTIONS
                    ]}
                    value={filters.stars || ''}
                    onChange={(value) => updateFilter('stars', value || null)}
                    className="search-controls-filter-input"
                    placeholder="Rango de estrellas"
                    isCompact={true}
                    maxMenuHeight={180}
                    smartPlacement={true}
                    menuPlacement="auto"
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

export default SearchControls;