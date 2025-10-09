import { useCallback, useEffect, useRef, useState } from 'react';

interface UseMasonryOptions {
  columns: number;
  gapHorizontal: number;
  gapVertical: number;
  items: unknown[];
}

/**
 * Hook personalizado para implementar Masonry manual
 * Con control total sobre el layout y spacing independiente horizontal/vertical
 */
export const useMasonry = ({ columns, gapHorizontal, gapVertical, items }: UseMasonryOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const layoutMasonry = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    
    // Calcular ancho de columna usando gap horizontal
    const totalHorizontalGaps = gapHorizontal * (columns - 1);
    const columnWidth = (containerWidth - totalHorizontalGaps) / columns;
    
    // Inicializar alturas de columnas
    const columnHeights = new Array(columns).fill(0);
    
    // Obtener todos los elementos
    const elements = Array.from(container.children) as HTMLElement[];
    
    elements.forEach((element) => {
      // Encontrar la columna más corta
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      
      // Calcular posición X usando gap horizontal
      const x = shortestColumnIndex * columnWidth + shortestColumnIndex * gapHorizontal;
      const y = columnHeights[shortestColumnIndex];
      
      // Aplicar estilos
      element.style.position = 'absolute';
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.width = `${columnWidth}px`;
      element.style.transition = 'all 0.3s ease';
      element.style.boxSizing = 'border-box';
      
      // Actualizar altura de la columna usando gap vertical
      columnHeights[shortestColumnIndex] += element.offsetHeight + gapVertical;
    });
    
    // Establecer altura del contenedor
    const maxHeight = Math.max(...columnHeights) - gapVertical;
    container.style.height = `${maxHeight}px`;
    
    setIsReady(true);
  }, [columns, gapHorizontal, gapVertical]);

  useEffect(() => {
    if (items.length === 0) return;

    // Delay para asegurar que los elementos estén renderizados
    const timeoutId = setTimeout(() => {
      layoutMasonry();
    }, 100);

    // Listener para resize
    const handleResize = () => {
      layoutMasonry();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [layoutMasonry, items.length]);

  // Re-layout cuando cambien las dependencias
  useEffect(() => {
    if (isReady && items.length > 0) {
      const timeoutId = setTimeout(() => {
        layoutMasonry();
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [layoutMasonry, isReady, items.length]);

  return {
    containerRef,
    layoutMasonry,
    isReady
  };
};