import { useState, useEffect } from 'react';
import { calculateHorizontalMasonryOrder } from '../utils/layoutUtils';

/**
 * Hook que gestiona el estado de visibilidad para una animación escalonada.
 * @param itemsLength - Longitud total de los elementos.
 * @param columnCount - Número de columnas actual del layout.
 * @returns Set<number> de índices que deben estar visibles para aplicar la clase de animación.
 */
export const useStaggeredAnimation = (itemsLength: number, columnCount: number): Set<number> => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const DELAY_MS = 120;
  const INITIAL_DELAY_MS = 200;

  useEffect(() => {
    // Limpiar animaciones previas (ej. al cambiar la data o el tamaño de la ventana)
    setVisibleCards(new Set());

    if (itemsLength === 0 || columnCount === 0) return;

    const animateCards = () => {
      // Usar la utilidad de layout para obtener el orden correcto
      const horizontalOrder = calculateHorizontalMasonryOrder(itemsLength, columnCount);
      
      horizontalOrder.forEach((originalIndex, orderIndex) => {
        setTimeout(() => {
          setVisibleCards(prev => new Set([...prev, originalIndex]));
        }, orderIndex * DELAY_MS);
      });
    };

    const initialTimer = setTimeout(animateCards, INITIAL_DELAY_MS);

    return () => clearTimeout(initialTimer); // Limpieza
  }, [itemsLength, columnCount]);

  return visibleCards;
};