// components/CardGrid.tsx

import { useResponsiveColumns } from '../hooks/useResponsiveColumns';
import { useStaggeredAnimation } from '../hooks/useStaggeredAnimation';
import { getRepositoryData, type Repository } from '../services/gitService'; // Importa tipos y servicio
import { getAnimationClasses } from '../utils/layoutUtils';

import Card from './Card';


const CardGrid = () => {
  // 1. Uso del Servicio para obtener datos
  const data = getRepositoryData();
  const items = data.items;
  const itemsLength = items.length;

  // 2. Uso de Hooks para la Lógica de UI/Layout
  const columnCount = useResponsiveColumns();
  const visibleCards = useStaggeredAnimation(itemsLength, columnCount);

  // El componente es ahora mucho más legible y declarativo.

  return (
    <section 
      className="w-full max-w-7xl mx-auto px-4 mt-8"
      aria-label="Repositorios de GitHub"
    >
      <div 
        className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-4 gap-6 space-y-0"
        style={{ columnFill: 'balance' }}
      >
        {items.map((item: Repository, index: number) => (
          <div 
            key={item.id}
            // La única lógica es la clase de animación, que usa una utilidad
            className={getAnimationClasses(visibleCards.has(index))}
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
        ))}
      </div>
    </section>
  );
};

export default CardGrid;