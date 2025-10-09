import { useEffect, useState } from 'react';

/**
 * Hook personalizado para manejar breakpoints específicos de columnas
 * Con spacing horizontal y vertical independientes
 */
export const useResponsiveColumns = () => {
  const [columns, setColumns] = useState(1);
  const [spacingHorizontal, setSpacingHorizontal] = useState(1.5);
  const [spacingVertical, setSpacingVertical] = useState(1.5);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 1090) {
        setColumns(1);
        setSpacingHorizontal(1.5);  // 24px horizontal
        setSpacingVertical(1.5);    // 24px vertical
      } else if (width < 1370) {
        setColumns(2);
        setSpacingHorizontal(2);    // 32px horizontal
        setSpacingVertical(1.5);    // 24px vertical
      } else if (width < 1700) {
        setColumns(3);
        setSpacingHorizontal(2.5);  // 40px horizontal
        setSpacingVertical(1.5);    // 24px vertical
      } else if (width < 2100) {
        setColumns(4);
        setSpacingHorizontal(3);    // 48px horizontal - Reducido para 4 columnas
        setSpacingVertical(1.5);    // 24px vertical
      } else if (width < 2600) {
        setColumns(5);
        setSpacingHorizontal(2.5);  // 40px horizontal - 5 columnas para pantallas grandes
        setSpacingVertical(1.2);    // 19px vertical - más compacto
      } else if (width < 3200) {
        setColumns(6);
        setSpacingHorizontal(2.5);  // 40px horizontal - 6 columnas para pantallas muy grandes
        setSpacingVertical(1.0);    // 16px vertical - compacto
      } else {
        setColumns(7);
        setSpacingHorizontal(2.0);  // 32px horizontal - 7 columnas para ultra-wide
        setSpacingVertical(1.0);    // 16px vertical - muy compacto
      }
    };

    // Ejecutar inmediatamente
    handleResize();

    // Agregar listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { columns, spacingHorizontal, spacingVertical };
};