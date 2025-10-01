// utils/layoutUtils.ts

/**
 * Calcula el orden de aparición horizontal para un layout Masonry.
 * Necesario para simular la animación escalonada en el orden de las columnas.
 * MODIFICADO: Mantiene el orden original (secuencial) en lugar de reorganizar por columnas.
 */
export const calculateHorizontalMasonryOrder = (itemsLength: number, _columnCount: number): number[] => {
  // Simplemente retornamos un array secuencial para mantener el orden original
  const orderedIndices: number[] = [];
  
  for (let i = 0; i < itemsLength; i++) {
    orderedIndices.push(i);
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
  const visibleClasses = 'opacity-100 translate-y-0 scale-100';
  const hiddenClasses = 'opacity-0 translate-y-4 scale-95';
  
  return `${baseClasses} ${isVisible ? visibleClasses : hiddenClasses}`;
};