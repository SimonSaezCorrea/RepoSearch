// components/CardGrid.tsx

import { useResponsiveColumns } from '../hooks/useResponsiveColumns';
import { useStaggeredAnimation } from '../hooks/useStaggeredAnimation';
import { type Repository } from '../services/gitService'; // Importa tipos
import { getAnimationClasses } from '../utils/layoutUtils';

import Card from './Card';

interface CardGridProps {
  repositories: Repository[];
  previousCount: number; // Cantidad de cards que ya estaban visibles
}

const CardGrid: React.FC<CardGridProps> = ({ repositories, previousCount }) => {
  // 1. Usamos los repositorios que vienen por props
  const items = repositories;
  const itemsLength = items.length;

  // 2. Uso de Hooks para la Lógica de UI/Layout
  const columnCount = useResponsiveColumns();
  const visibleCards = useStaggeredAnimation(itemsLength, columnCount, previousCount);

  // 3. Distribuir items en columnas respetando orden horizontal (masonry inteligente)
  const distributeInColumns = (items: Repository[], columns: number) => {
    const columnArrays: Repository[][] = Array.from({ length: columns }, () => []);
    const columnHeights = new Array(columns).fill(0);
    
    items.forEach((item, index) => {
      // Para mantener cierto orden horizontal, pero optimizar altura
      if (index < columns) {
        // Primera fila va en orden
        columnArrays[index].push(item);
        columnHeights[index] += 1; // Estimación simple de altura
      } else {
        // Para el resto, buscar la columna más corta
        const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        columnArrays[shortestColumnIndex].push(item);
        columnHeights[shortestColumnIndex] += 1;
      }
    });
    
    return columnArrays;
  };

  const columnArrays = distributeInColumns(items, columnCount);

  // El componente es ahora mucho más legible y declarativo.

  return (
    <section 
      className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 mt-8"
      aria-label="Repositorios de GitHub"
    >
      <div 
        className="masonry-grid"
        data-columns={columnCount}
        style={{ 
          display: 'grid',
          gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
          gap: '1rem',
          alignItems: 'start'
        }}
      >
        {columnArrays.map((columnItems, columnIndex) => (
          <div key={columnIndex} className="masonry-column">
            {columnItems.map((item: Repository) => {
              const originalIndex = items.findIndex(originalItem => originalItem.id === item.id);
              return (
                <div 
                  key={item.id}
                  className={getAnimationClasses(visibleCards.has(originalIndex))}
                  style={{ marginBottom: '1rem' }}
                >
                  <Card
                    title={item.name}
                    username={item.owner.login}
                    avatar_url={item.owner.avatar_url}
                    git_user_url={item.owner.html_url}
                    project_url={item.html_url}
                    description={item.description}
                    size={item.size}
                    stars={item.stargazers_count}
                    language={item.language}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardGrid;