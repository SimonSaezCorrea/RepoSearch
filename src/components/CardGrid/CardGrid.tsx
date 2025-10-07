import Masonry from '@mui/lab/Masonry';
import { memo } from 'react';

import { LAYOUT } from '../../constants/Layout';
import { useStaggeredAnimation } from '../../hooks/useStaggeredAnimation';
import { type Repository } from '../../services/gitService';
import Card from '../Card';
import './CardGrid.css';

interface CardGridProps {
  repositories: Repository[];
  previousCount: number;
}

/**
 * Componente que renderiza una cuadrícula de tarjetas de repositorios 
 * usando MUI Masonry para layout responsivo con animaciones escalonadas.
 */
const CardGrid: React.FC<CardGridProps> = ({ repositories, previousCount }) => {
  
  const visibleCards = useStaggeredAnimation(repositories.length, previousCount);

  return (
    <section 
      className="card-grid-container"
      aria-label="Repositorios de GitHub"
    >
      <Masonry
        columns={LAYOUT.MASONRY_BREAKPOINTS}
        spacing={LAYOUT.MASONRY_SPACING}
        defaultHeight={200}
        defaultColumns={4}
        defaultSpacing={1}
        sx={{
          margin: 0,
          '& > div': {
            transition: 'none !important', // Prevenir conflictos con nuestras animaciones
          }
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
              language={repository.language || undefined}
            />
          </div>
        ))}
      </Masonry>
    </section>
  );
};

// Memoizar el componente para evitar re-renders innecesarios
export default memo(CardGrid);