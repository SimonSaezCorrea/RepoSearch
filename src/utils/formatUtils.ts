/**
 * Formatea el tamaño de un repositorio de KB a un formato más amigable.
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
 * Formatea el nombre de un proyecto eliminando caracteres especiales.
 */
export const formatProjectName = (projectName: string): string => {
  return projectName
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Abre una URL en una nueva pestaña de forma segura.
 */
export const openInNewTab = (url: string): void => {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};