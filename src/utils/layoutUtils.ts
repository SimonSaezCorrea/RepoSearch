// utils/layoutUtils.ts

/**
 * Calcula el orden de aparición horizontal para un layout Masonry.
 * Necesario para simular la animación escalonada en el orden de las columnas.
 */
export const calculateHorizontalMasonryOrder = (itemsLength: number, columnCount: number): number[] => {
  const orderedIndices: number[] = [];
  const itemsPerColumn = Math.ceil(itemsLength / columnCount);
  
  for (let row = 0; row < itemsPerColumn; row++) {
    for (let col = 0; col < columnCount; col++) {
      const index = col * itemsPerColumn + row;
      if (index < itemsLength) {
        orderedIndices.push(index);
      }
    }
  }
  
  return orderedIndices;
};

/**
 * Obtiene el número de columnas según el ancho de pantalla (lógica pura de detección de DOM).
 */
export const getResponsiveColumnCount = (): number => {
  if (typeof window === 'undefined') return 4;
  if (window.innerWidth >= 1280) return 4;  // xl: 4 columnas (≥1280px)
  if (window.innerWidth >= 1024) return 3;  // lg: 3 columnas (1024px-1279px)
  if (window.innerWidth >= 640) return 2;   // sm: 2 columnas (640px-1023px)
  return 1;                                 // <640px: 1 columna
};

/**
 * Genera las clases CSS para animaciones de elementos (lógica de presentación).
 */
export const getAnimationClasses = (isVisible: boolean): string => {
  const baseClasses = 'break-inside-avoid mb-4 sm:mb-5 md:mb-6 inline-block w-full transition-all duration-600 ease-out';
  const visibleClasses = 'opacity-100 translate-x-0 scale-100';
  const hiddenClasses = 'opacity-0 -translate-x-6 scale-95';
  
  return `${baseClasses} ${isVisible ? visibleClasses : hiddenClasses}`;
};