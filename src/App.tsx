import { useEffect } from 'react';

import './App.css';
import CardGrid from './components/CardGrid';
import ErrorMessage from './components/ErrorMessage';
import HeaderSearch from './components/HeaderSearch';
import LoadingSpinner from './components/LoadingSpinner';
import LoadMoreButton from './components/LoadMoreButton';
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
    retryLastOperation,
  } = useRepositoryData();

  /**
   * Carga inicial de datos
   */
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HeaderSearch />
      
      {/* Información de búsqueda actual y controles */}
      {repositories.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                🔍 Búsqueda actual: <span className="font-semibold text-blue-600 dark:text-blue-400">"{currentQuery}"</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                🏷️ Tipo: <span className="font-medium">{queryType}</span> • 
                {repositories.length} repositorios • 
                {retryCount > 0 && <span className="text-orange-600">Reintentos: {retryCount}</span>}
              </p>
            </div>
            <button
              onClick={generateNewSearch}
              disabled={isLoading || isInitialLoading || isRateLimited}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium shadow-md hover:shadow-lg disabled:cursor-not-allowed"
              aria-label="Generar nueva búsqueda completamente aleatoria"
            >
              🎲 Nueva búsqueda aleatoria
            </button>
          </div>
        </div>
      )}
      
      <main className="pt-6 pb-8">
        {/* Debug Panel - Temporal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 text-xs">
            <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">🐛 Debug Info:</h4>
            <div className="space-y-1 text-yellow-700 dark:text-yellow-300">
              <p>• repositories.length: {repositories.length}</p>
              <p>• isInitialLoading: {isInitialLoading.toString()}</p>
              <p>• isLoading: {isLoading.toString()}</p>
              <p>• error: {error || 'null'}</p>
              <p>• hasMoreData: {hasMoreData.toString()}</p>
              <p>• currentQuery: "{currentQuery}"</p>
              <p>• queryType: "{queryType}"</p>
              <p>• retryCount: {retryCount}</p>
              <p>• isRateLimited: {isRateLimited.toString()}</p>
            </div>
          </div>
        </div>
        
        {/* Alerta de Rate Limiting */}
        {isRateLimited && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200">
                    Límite de API alcanzado
                  </h3>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
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
        
        {error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ErrorMessage 
              message={error} 
              onRetry={retryLastOperation}
            />
          </div>
        )}
        
        {isInitialLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {repositories.length > 0 ? (
              <>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
                  <p className="text-green-600 font-medium">✅ Se encontraron {repositories.length} repositorios - Renderizando CardGrid...</p>
                </div>
                <CardGrid 
                  repositories={repositories}
                  previousCount={previousCount}
                />
              </>
            ) : (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-gray-500 text-center">❌ No hay repositorios para mostrar</p>
              </div>
            )}
            
            {hasMoreData && repositories.length > 0 && !isRateLimited && (
              <LoadMoreButton 
                onClick={loadMoreRepositories}
                isLoading={isLoading}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;