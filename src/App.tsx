import { useEffect } from 'react';

import './App.css';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollableCardArea from './components/ScrollableCardArea';
import SearchControls from './components/SearchControls';
import { useRepositoryData } from './hooks/useRepositoryData';

function App() {
  const {
    repositories,
    isLoading,
    isInitialLoading,
    hasMoreData,
    error,
    previousCount,
    currentQuery,
    queryType,
    retryCount,
    isRateLimited,
    rateLimitReset,
    loadInitialData,
    loadMoreRepositories,
    generateNewSearch,
    searchManual,
    retryLastOperation,
  } = useRepositoryData();

  /**
   * Carga inicial de datos
   */
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Controles de búsqueda fijos en la parte superior */}
      <SearchControls
        onManualSearch={searchManual}
        onRandomSearch={generateNewSearch}
        isLoading={isLoading || isInitialLoading}
        currentQuery={currentQuery}
        queryType={queryType}
        repositoryCount={repositories.length}
      />
      
      {/* Alerta de Rate Limiting */}
      {isRateLimited && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border-b border-orange-200 dark:border-orange-800 px-4 py-3">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200">
                  Límite de API alcanzado
                </h3>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Has alcanzado el límite de peticiones de GitHub API. 
                  {rateLimitReset && (
                    <span> Se reinicia: {rateLimitReset.toLocaleString()}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 px-4 py-3">
          <div className="max-w-7xl mx-auto">
            <ErrorMessage 
              message={error} 
              onRetry={retryLastOperation}
            />
          </div>
        </div>
      )}

      {/* Área principal con scroll */}
      {isInitialLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <ScrollableCardArea
          repositories={repositories}
          previousCount={previousCount}
          hasMoreData={hasMoreData}
          isLoading={isLoading}
          isRateLimited={isRateLimited}
          onLoadMore={loadMoreRepositories}
          error={error}
        />
      )}
      
      {/* Debug Panel - Temporal */}
      {import.meta.env.DEV && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-t border-yellow-200 dark:border-yellow-800 p-2">
          <div className="max-w-7xl mx-auto">
            <div className="text-xs text-yellow-700 dark:text-yellow-300">
              🐛 Debug: {repositories.length} repos • {isLoading ? 'Loading...' : 'Idle'} • 
              Query: "{currentQuery}" • Type: {queryType} • Retries: {retryCount}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;