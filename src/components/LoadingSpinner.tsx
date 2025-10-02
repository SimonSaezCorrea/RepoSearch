import { memo } from 'react';

import { MESSAGES } from '../constants';

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
  className = "flex justify-center items-center"
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const spinnerSize = sizeClasses[size];

  return (
    <div className={className}>
      <div className="text-center">
        <div 
          className={`animate-spin rounded-full border-b-2 border-blue-500 mx-auto mb-4 ${spinnerSize}`}
          role="status"
          aria-label="Cargando contenido"
        >
          <span className="sr-only">Cargando...</span>
        </div>
        {message && (
          <p className="text-gray-600 dark:text-gray-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default memo(LoadingSpinner);