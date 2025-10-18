import { useEffect } from 'react';

import './App.css';
import { ScrollableCardArea } from './features/repository';
import { Sidebar } from './features/search';
import { ErrorMessage, LoadingSpinner, useRepositoryData } from './shared';

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
    <div className="app-container">
      {/* Sidebar con título y controles de búsqueda */}
      <div className="app-sidebar">
        <Sidebar
          onManualSearch={searchManual}
          onRandomSearch={generateNewSearch}
          isLoading={isLoading || isInitialLoading}
          currentQuery={currentQuery}
          queryType={queryType}
          repositoryCount={repositories.length}
        />
      </div>

      {/* Área principal de contenido */}
      <div className="app-main-content">
        {/* Alertas */}
        {(isRateLimited || error) && (<div className="app-alerts">
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
        </div>)}

        {/* Área principal con scroll */}
        <div className="app-content-area">
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
        </div>
      </div>
    </div>
  );
}

export default App;