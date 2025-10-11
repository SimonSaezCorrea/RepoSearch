import { memo } from 'react';

import { type Repository } from '../../../shared/api/type/github';
import { useMasonry } from '../hooks/useMasonry';
import { useResponsiveColumns } from '../hooks/useResponsiveColumns';
import { useStaggeredAnimation } from '../hooks/useStaggeredAnimation';
import '../styles/CardGrid.css';
import type { CardGridProps } from '../types/card';

import Card from './Card';


const CardGrid: React.FC<CardGridProps> = ({ repositories, previousCount }) => {
  
  const visibleCards = useStaggeredAnimation(repositories.length, previousCount);
  const { columns, spacingHorizontal, spacingVertical } = useResponsiveColumns();
  
  // Convertir spacing a píxeles (asumiendo 16px por unidad)
  const gapHorizontalInPixels = spacingHorizontal * 16;
  const gapVerticalInPixels = spacingVertical * 16;
  
  const { containerRef, isReady } = useMasonry({
    columns,
    gapHorizontal: gapHorizontalInPixels,
    gapVertical: gapVerticalInPixels,
    items: repositories
  });

  return (
    <section 
      className="card-grid-container"
      aria-label="Repositorios de GitHub"
    >
      {/* Skeleton loader mientras se organiza el layout */}
      {!isReady && repositories.length > 0 && (
        <div className="masonry-loading">
          <div className="loading-message">Organizando layout...</div>
        </div>
      )}
      
      <div 
        ref={containerRef}
        className="custom-masonry-container"
        style={{
          position: 'relative',
          width: '100%',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.5s ease'
        }}
      >
        {repositories.map((repository: Repository, index: number) => (
          <div 
            key={repository.id}
            className={`card-grid-item ${visibleCards.has(index) ? 'card-grid-item--visible' : 'card-grid-item--hidden'}`}
          >
            <Card
              title={repository.name}
              username={repository.owner.login}
              avatar_url={repository.owner.avatar_url}
              git_user_url={repository.owner.html_url}
              project_url={repository.html_url}
              description={repository.description || undefined}
              size={repository.size}
              stars={repository.stargazers_count}
              forks={repository.forks_count}
              language={repository.language || undefined}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

// Memoizar el componente para evitar re-renders innecesarios
export default memo(CardGrid);