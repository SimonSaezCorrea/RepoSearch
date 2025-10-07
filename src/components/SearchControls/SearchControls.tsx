import React, { useState } from 'react';
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
  onRandomSearch: () => void;
  isLoading?: boolean;
  currentQuery?: string;
  queryType?: string;
  repositoryCount?: number;
}

const SORT_OPTIONS = [
  { value: 'updated', label: 'Más reciente' },
  { value: 'stars', label: 'Más estrellas' },
  { value: 'created', label: 'Más nuevo' },
  { value: 'forks', label: 'Más forks' },
];

const LANGUAGES = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'C++', 'C#', 
  'PHP', 'Ruby', 'Swift', 'Kotlin', 'Dart', 'Vue', 'React'
];

const STAR_RANGES = [
  { value: '>1', label: 'Más de 1 estrella' },
  { value: '>10', label: 'Más de 10 estrellas' },
  { value: '>50', label: 'Más de 50 estrellas' },
  { value: '>100', label: 'Más de 100 estrellas' },
  { value: '>500', label: 'Más de 500 estrellas' },
  { value: '>1000', label: 'Más de 1000 estrellas' },
];

const SearchControls: React.FC<SearchControlsProps> = ({
  onManualSearch,
  onRandomSearch,
  isLoading = false,
  currentQuery = '',
  queryType = '',
  repositoryCount = 0
}) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchType, setSearchType] = useState<'repository' | 'user'>('repository');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<SearchFilters>({
    sort: 'updated',
    order: 'desc',
  });

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onManualSearch(searchInput.trim(), searchType, filters);
    }
  };

  const handleRandomSearch = () => {
    setSearchInput('');
    onRandomSearch();
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
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'repository' | 'user')}
                className="search-controls-type-select"
                disabled={isLoading}
              >
                <option value="repository">📦 Repositorios</option>
                <option value="user">👤 Usuarios</option>
              </select>
              
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

          <button
            onClick={handleRandomSearch}
            disabled={isLoading}
            className="search-controls-random-button"
          >
            {isLoading ? '🔄' : '🎲'} Búsqueda Aleatoria
          </button>
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
                  <select
                    value={filters.sort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="search-controls-filter-input"
                  >
                    {SORT_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Orden */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">
                    Orden
                  </label>
                  <select
                    value={filters.order}
                    onChange={(e) => updateFilter('order', e.target.value)}
                    className="search-controls-filter-input"
                  >
                    <option value="desc">Descendente</option>
                    <option value="asc">Ascendente</option>
                  </select>
                </div>

                {/* Lenguaje */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">
                    Lenguaje
                  </label>
                  <select
                    value={filters.language || ''}
                    onChange={(e) => updateFilter('language', e.target.value || undefined)}
                    className="search-controls-filter-input"
                  >
                    <option value="">Cualquier lenguaje</option>
                    {LANGUAGES.map(lang => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Estrellas */}
                <div className="search-controls-filter-field">
                  <label className="search-controls-filter-label">
                    Estrellas
                  </label>
                  <select
                    value={filters.stars || ''}
                    onChange={(e) => updateFilter('stars', e.target.value || undefined)}
                    className="search-controls-filter-input"
                  >
                    <option value="">Cualquier cantidad</option>
                    {STAR_RANGES.map(range => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
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