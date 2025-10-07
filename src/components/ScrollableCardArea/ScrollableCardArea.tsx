import React from 'react';

import type { Repository } from '../../services/gitService';
import CardGrid from '../CardGrid';
import LoadMoreButton from '../LoadMoreButton';
import './ScrollableCardArea.css';

interface ScrollableCardAreaProps {
  repositories: Repository[];
  previousCount: number;
  hasMoreData: boolean;
  isLoading: boolean;
  isRateLimited: boolean;
  onLoadMore: () => void;
  error?: string | null;
}

const ScrollableCardArea: React.FC<ScrollableCardAreaProps> = ({
  repositories,
  previousCount,
  hasMoreData,
  isLoading,
  isRateLimited,
  onLoadMore,
  error
}) => {
  return (
    <div className="scrollable-card-area">
      <div className="scrollable-card-area-content">
        <div className="scrollable-card-area-container">
          {repositories.length > 0 ? (
            <>
              <CardGrid 
                repositories={repositories}
                previousCount={previousCount}
              />
              
              {/* Botón de cargar más dentro del área de scroll */}
              {hasMoreData && !isRateLimited && (
                <div className="scrollable-card-area-load-more">
                  <LoadMoreButton 
                    onClick={onLoadMore}
                    isLoading={isLoading}
                  />
                </div>
              )}
              
              {/* Mensaje de final */}
              {!hasMoreData && (
                <div className="scrollable-card-area-end-state">
                  <p className="scrollable-card-area-end-message">
                    🎉 Has llegado al final de los resultados
                  </p>
                </div>
              )}
            </>
          ) : !isLoading && !error ? (
            <div className="scrollable-card-area-empty-state">
              <div className="scrollable-card-area-empty-icon">🔍</div>
              <h3 className="scrollable-card-area-empty-title">
                No hay repositorios
              </h3>
              <p className="scrollable-card-area-empty-message">
                Realiza una búsqueda para encontrar repositorios increíbles
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollableCardArea;