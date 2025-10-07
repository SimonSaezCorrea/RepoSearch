import React, { useState } from 'react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'repository' | 'user'>('repository');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    sort: 'updated',
    order: 'desc',
  });

  const handleManualSearch = () => {
    if (searchQuery.trim()) {
      onManualSearch(searchQuery.trim(), searchType, filters);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleManualSearch();
    }
  };

  const updateFilter = (key: keyof SearchFilters, value: string | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header Principal */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🃏 Explorador de Repositorios
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Descubre repositorios increíbles en GitHub
          </p>
        </div>

        {/* Barra de Búsqueda Manual */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="flex rounded-lg shadow-sm">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'repository' | 'user')}
                className="rounded-l-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="repository">📦 Repositorio</option>
                <option value="user">👤 Usuario</option>
              </select>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={searchType === 'repository' ? 'Buscar repositorios...' : 'Buscar por usuario...'}
                className="flex-1 border-t border-b border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleManualSearch}
                disabled={isLoading || !searchQuery.trim()}
                className="rounded-r-lg bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 transition-colors duration-200 flex items-center gap-2"
              >
                🔍 Buscar
              </button>
            </div>
          </div>
          
          <button
            onClick={onRandomSearch}
            disabled={isLoading}
            className="px-6 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
          >
            🎲 Búsqueda Aleatoria
          </button>
        </div>

        {/* Filtros Expandibles */}
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <span className="font-medium text-gray-900 dark:text-white">
              ⚙️ Filtros de Búsqueda
            </span>
            {showFilters ? (
              <span className="text-gray-500 text-lg">⬆️</span>
            ) : (
              <span className="text-gray-500 text-lg">⬇️</span>
            )}
          </button>
          
          {showFilters && (
            <div className="border-t border-gray-200 dark:border-gray-600 p-4 bg-gray-50 dark:bg-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Ordenar por */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    📊 Ordenar por
                  </label>
                  <select
                    value={filters.sort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    {SORT_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Orden */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    🔄 Orden
                  </label>
                  <select
                    value={filters.order}
                    onChange={(e) => updateFilter('order', e.target.value)}
                    className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="desc">Descendente</option>
                    <option value="asc">Ascendente</option>
                  </select>
                </div>

                {/* Lenguaje */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    💻 Lenguaje
                  </label>
                  <select
                    value={filters.language || ''}
                    onChange={(e) => updateFilter('language', e.target.value || undefined)}
                    className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos los lenguajes</option>
                    {LANGUAGES.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                {/* Estrellas */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ⭐ Estrellas
                  </label>
                  <select
                    value={filters.stars || ''}
                    onChange={(e) => updateFilter('stars', e.target.value || undefined)}
                    className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
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
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="text-center sm:text-left">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  🔍 <span className="font-semibold">"{currentQuery}"</span> • 
                  <span className="ml-2">🏷️ {queryType}</span> • 
                  <span className="ml-2">📦 {repositoryCount} repositorios</span>
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