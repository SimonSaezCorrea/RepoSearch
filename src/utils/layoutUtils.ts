/**
 * Utilidades para el manejo de layout y animaciones CSS.
 */

import { CSS_CLASSES } from '../constants';

/**
 * Genera las clases CSS para animaciones de elementos.
 * Optimizado para reducir layout shifts en layouts tipo masonry.
 * 
 * @param isVisible - Si el elemento debe estar visible
 * @returns String con las clases CSS concatenadas
 */
export const getAnimationClasses = (isVisible: boolean): string => {
  return `${CSS_CLASSES.ANIMATION_BASE} ${isVisible ? CSS_CLASSES.ANIMATION_VISIBLE : CSS_CLASSES.ANIMATION_HIDDEN}`;
};