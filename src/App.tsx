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
    <div className="app-container">{/* Controles de búsqueda fijos en la parte superior */}
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
        <div className="alert alert-warning">
          <div className="alert-container">
            <div className="alert-content">
              <div className="alert-icon">
                <span className="alert-icon-emoji">⚠️</span>
              </div>
              <div className="alert-text">
                <h3 className="alert-title alert-title--warning">
                  Límite de API alcanzado
                </h3>
                <p className="alert-message alert-message--warning">
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
        <div className="alert alert-error">
          <div className="alert-container">
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
        <div className="alert alert-info">
          <div className="alert-container">
            <div className="alert-message alert-message--info">
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