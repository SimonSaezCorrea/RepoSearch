/**
 * Formatea la fecha a un formato más legible
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Formatea números grandes con sufijos (K, M, B)
 */
export const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Formatea el tamaño de un repositorio de KB a un formato más amigable
 */
export const formatRepoSize = (sizeInKB: number): string => {
  if (sizeInKB >= 1_000_000) {
    return (sizeInKB / 1_000_000).toFixed(1) + ' GB';
  }
  if (sizeInKB >= 1_000) {
    return (sizeInKB / 1_000).toFixed(1) + ' MB';
  }
  return sizeInKB.toFixed(1) + ' KB';
};

/**
 * Formatea el nombre de un proyecto eliminando caracteres especiales
 */
export const formatProjectName = (projectName: string): string => {
  return projectName
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Calcula el orden de aparición horizontal para un layout Masonry
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
 * Obtiene el número de columnas según el ancho de pantalla
 */
export const getResponsiveColumnCount = (): number => {
  if (typeof window === 'undefined') return 4;
  if (window.innerWidth >= 1280) return 4;
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth >= 768) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
};

/**
 * Abre una URL en una nueva pestaña de forma segura
 */
export const openInNewTab = (url: string): void => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Genera las clases CSS para animaciones de elementos
 */
export const getAnimationClasses = (isVisible: boolean): string => {
  const baseClasses = 'break-inside-avoid mb-6 inline-block w-full transition-all duration-600 ease-out';
  const visibleClasses = 'opacity-100 translate-x-0 scale-100';
  const hiddenClasses = 'opacity-0 -translate-x-6 scale-95';
  
  return `${baseClasses} ${isVisible ? visibleClasses : hiddenClasses}`;
};