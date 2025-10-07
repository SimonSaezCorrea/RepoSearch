import React from 'react';

import type { Repository } from '../services/gitService';

import CardGrid from './CardGrid';
import LoadMoreButton from './LoadMoreButton';

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
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-y-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-6">
          {repositories.length > 0 ? (
            <>
              <CardGrid 
                repositories={repositories}
                previousCount={previousCount}
              />
              
              {/* Botón de cargar más dentro del área de scroll */}
              {hasMoreData && !isRateLimited && (
                <div className="mt-8 mb-4">
                  <LoadMoreButton 
                    onClick={onLoadMore}
                    isLoading={isLoading}
                  />
                </div>
              )}
              
              {/* Mensaje de final */}
              {!hasMoreData && (
                <div className="text-center mt-8 mb-4">
                  <p className="text-gray-500 dark:text-gray-400">
                    🎉 Has llegado al final de los resultados
                  </p>
                </div>
              )}
            </>
          ) : !isLoading && !error ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No hay repositorios
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
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