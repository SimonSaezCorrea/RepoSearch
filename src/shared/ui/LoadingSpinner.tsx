import { memo } from 'react';

import { MESSAGES } from '../constants/css_menssages';
import '../styles/LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Componente reutilizable para mostrar estados de carga
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = MESSAGES.LOADING,
  size = 'md',
  className = "loading-spinner-wrapper"
}) => {
  return (
    <div className={className}>
      <div className="loading-spinner-container">
        <div 
          className={`loading-spinner ${size === 'lg' ? 'loading-spinner--large' : ''} ${size === 'sm' ? 'loading-spinner--small' : ''}`}
          role="status"
          aria-label="Cargando contenido"
        >
          <span className="loading-spinner-sr-only">Cargando...</span>
        </div>
        {message && (
          <p className="loading-spinner-text">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default memo(LoadingSpinner);