import { useEffect, useRef, useState } from 'react';

/**
 * Hook simplificado que gestiona animaciones solo para elementos nuevos.
 * @param itemsLength - Longitud total de los elementos.
 * @param columnCount - Número de columnas actual del layout (no usado pero mantenido para compatibilidad).
 * @param previousCount - Cantidad de elementos que ya estaban visibles (para cargas incrementales).
 * @returns Set<number> de índices que deben estar visibles para aplicar la clase de animación.
 */
export const useStaggeredAnimation = (
  itemsLength: number, 
  _columnCount: number, 
  previousCount: number = 0
): Set<number> => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const previousCountRef = useRef(previousCount);
  const DELAY_MS = 120;
  const INITIAL_DELAY_MS = 200;

  useEffect(() => {
    if (itemsLength === 0) return;

    // Si es una carga incremental (hay elementos previos)
    if (previousCount > previousCountRef.current) {
      // Marcar todos los elementos anteriores como visibles inmediatamente
      const allPreviousVisible = new Set<number>();
      for (let i = 0; i < previousCount; i++) {
        allPreviousVisible.add(i);
      }
      setVisibleCards(allPreviousVisible);
      
      // Animar solo los nuevos elementos uno por uno
      if (itemsLength > previousCount) {
        for (let i = previousCount; i < itemsLength; i++) {
          const index = i;
          const delay = (i - previousCount) * DELAY_MS; // Delay relativo a los nuevos elementos
          
          setTimeout(() => {
            setVisibleCards(prev => new Set([...prev, index]));
          }, delay);
        }
      }
      
      previousCountRef.current = previousCount;
    } else if (previousCount === 0) {
      // Carga inicial - todos aparecen a la vez después de un pequeño delay
      const allVisibleSet = new Set<number>();
      for (let i = 0; i < itemsLength; i++) {
        allVisibleSet.add(i);
      }
      
      const initialTimer = setTimeout(() => {
        setVisibleCards(allVisibleSet);
      }, INITIAL_DELAY_MS);
      
      return () => clearTimeout(initialTimer);
    }
  }, [itemsLength, previousCount]);

  return visibleCards;
};