import { useCallback, useEffect, useRef, useState } from 'react';

import { ANIMATION } from '../constants/animation';

/**
 * Hook que gestiona animaciones escalonadas para elementos de una lista.
 * Evita el parpadeo en cargas incrementales manteniendo elementos visibles.
 * 
 * @param itemsLength - Número total de elementos en la lista
 * @param previousCount - Número de elementos que ya estaban visibles (para cargas incrementales)
 * @returns Set de índices de elementos que deben estar visibles
 */
export const useStaggeredAnimation = (
  itemsLength: number, 
  previousCount: number = 0
): Set<number> => {
  
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const previousCountRef = useRef(previousCount);
  const previousItemsLengthRef = useRef(itemsLength);
  const isInitialLoad = useRef(true);

  /**
   * Crea un Set con todos los índices hasta el límite especificado
   */
  const createVisibleSet = useCallback((limit: number): Set<number> => {
    const set = new Set<number>();
    for (let i = 0; i < limit; i++) {
      set.add(i);
    }
    return set;
  }, []);

  /**
   * Anima la aparición de nuevos elementos con delay escalonado
   */
  const animateNewElements = useCallback((startIndex: number, endIndex: number) => {
    for (let i = startIndex; i < endIndex; i++) {
      const orderPosition = i - startIndex;
      const delay = orderPosition * ANIMATION.DELAY_MS;
      
      setTimeout(() => {
        setVisibleCards(prev => new Set([...prev, i]));
      }, delay);
    }
  }, []);

  useEffect(() => {
    
    if (itemsLength === 0) {
      setVisibleCards(new Set());
      previousCountRef.current = 0;
      previousItemsLengthRef.current = 0;
      return;
    }

    // Detectar nueva búsqueda: previousCount es 0 y hay items
    const isNewSearch = previousCount === 0 && itemsLength > 0 && !isInitialLoad.current;
    
    // Detectar reemplazo completo: el número de items cambió drásticamente hacia abajo
    const isFullReset = itemsLength < previousItemsLengthRef.current && previousCount === 0;

    // Manejo de carga inicial O nueva búsqueda
    if (isInitialLoad.current || isNewSearch || isFullReset) {
      const allVisibleSet = createVisibleSet(itemsLength);
      
      const initialTimer = setTimeout(() => {
        setVisibleCards(allVisibleSet);
        isInitialLoad.current = false;
        // En nueva búsqueda, resetear a 0 para que la siguiente carga incremental funcione
        previousCountRef.current = 0;
        previousItemsLengthRef.current = itemsLength;
      }, ANIMATION.INITIAL_LOAD_DELAY_MS);
      
      return () => clearTimeout(initialTimer);
    }
    
    // Manejo de carga incremental (cargar más)
    // Esta condición ahora funcionará correctamente después de nueva búsqueda
    if (previousCount >= previousCountRef.current && itemsLength > previousItemsLengthRef.current) {
      // Asegurar que elementos previos permanezcan visibles
      setVisibleCards(prev => {
        const updated = new Set(prev);
        for (let i = 0; i < previousCount; i++) {
          updated.add(i);
        }
        return updated;
      });
      
      // Animar solo los nuevos elementos
      if (itemsLength > previousCount) {
        animateNewElements(previousCount, itemsLength);
      }
      
      previousCountRef.current = previousCount;
      previousItemsLengthRef.current = itemsLength;
    }
  }, [itemsLength, previousCount, createVisibleSet, animateNewElements]);

  return visibleCards;
};