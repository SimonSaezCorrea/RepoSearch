import { useCallback, useEffect, useState } from 'react';

import { getResponsiveColumnCount } from '../utils/layoutUtils';

/**
 * Hook que gestiona el número de columnas para un layout responsive,
 * actualizándolo en el evento 'resize' de la ventana.
 * @returns El número de columnas actual.
 */
export const useResponsiveColumns = (): number => {
  const [columnCount, setColumnCount] = useState(getResponsiveColumnCount());

  const updateColumnCount = useCallback(() => {
    setColumnCount(getResponsiveColumnCount());
  }, []);

  useEffect(() => {
    updateColumnCount();
    
    // Agregar/Remover listener
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, [updateColumnCount]);

  return columnCount;
};