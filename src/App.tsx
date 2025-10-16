import { useEffect } from 'react';

import './App.css';
import { HelpButton } from './features/help';
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
      <aside className="app-sidebar" aria-label="Panel de búsqueda">
        <Sidebar
          onManualSearch={searchManual}
          onRandomSearch={generateNewSearch}
          isLoading={isLoading || isInitialLoading}
          currentQuery={currentQuery}
          queryType={queryType}
          repositoryCount={repositories.length}
        />
      </aside>

      {/* Área principal de contenido */}
      <main className="app-main-content">
        {/* Alertas */}
        {(isRateLimited || error) && (<section className="app-alerts" aria-live="polite" aria-atomic="true">
          {/* Alerta de Rate Limiting */}
          {isRateLimited && (
            <div className="alert alert-warning" role="alert">
              <div className="alert-container">
                <div className="alert-content">
                  <div className="alert-icon" aria-hidden="true">
                    <span className="alert-icon-emoji">⚠️</span>
                  </div>
                  <div className="alert-text">
                    <h3 className="alert-title alert-title--warning">
                      Límite de API alcanzado
                    </h3>
                    <p className="alert-message alert-message--warning">
                      Has alcanzado el límite de peticiones de GitHub API. 
                      {rateLimitReset && (
                        <span> Se reinicia: <time dateTime={rateLimitReset.toISOString()}>{rateLimitReset.toLocaleString()}</time></span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="alert alert-error" role="alert">
              <div className="alert-container">
                <ErrorMessage 
                  message={error} 
                  onRetry={retryLastOperation}
                />
              </div>
            </div>
          )}
        </section>)}

        {/* Área principal con scroll */}
        <section className="app-content-area" aria-label="Repositorios encontrados">
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
        </section>
      </main>
      
      {/* Help Button */}
      <HelpButton />
    </div>
  );
}

export default App;