import { useCallback, useEffect, useState } from 'react';

import { extractData } from '../../services/dataCards';
import { calculateHorizontalMasonryOrder, getAnimationClasses, getResponsiveColumnCount } from '../../utils/cardUtils';
import Card from '../Card/Card';

// Interfaz para el tipo de datos de los repositorios
interface Repository {
  id: number;
  name: string;
  description?: string;
  html_url: string;
  size: number;
  stargazers_count: number;
  language?: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

const CardGrid = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [columnCount, setColumnCount] = useState(4);
  const data = extractData();

  // Hook para manejar responsive columns
  const updateColumnCount = useCallback(() => {
    setColumnCount(getResponsiveColumnCount());
  }, []);

  useEffect(() => {
    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, [updateColumnCount]);

  // Hook para animación escalonada
  useEffect(() => {
    // Limpiar animaciones previas
    setVisibleCards(new Set());

    const animateCards = () => {
      const horizontalOrder = calculateHorizontalMasonryOrder(data.items.length, columnCount);
      
      horizontalOrder.forEach((originalIndex, orderIndex) => {
        setTimeout(() => {
          setVisibleCards(prev => new Set([...prev, originalIndex]));
        }, orderIndex * 120); // 120ms de delay para mejor efecto
      });
    };

    // Delay inicial para que CSS columns se establezca
    const initialTimer = setTimeout(animateCards, 200);

    return () => clearTimeout(initialTimer);
  }, [data.items.length, columnCount]);

  return (
    <section 
      className="w-full max-w-7xl mx-auto px-4 mt-8"
      aria-label="Repositorios de GitHub"
    >
      {/* CSS Columns para Masonry real */}
      <div 
        className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-4 gap-6 space-y-0"
        style={{ columnFill: 'balance' }}
      >
        {data.items.map((item: Repository, index: number) => (
          <div 
            key={item.id}
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