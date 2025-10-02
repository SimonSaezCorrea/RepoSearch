import { memo } from 'react';

import { MESSAGES } from '../constants';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
  className?: string;
}

/**
 * Componente reutilizable para mostrar mensajes de error con opción de reintentar
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = MESSAGES.ERROR_LOADING,
  message,
  onRetry,
  showRetryButton = true,
  className = "text-center"
}) => {
  return (
    <div className={className}>
      <div className="text-red-500 mb-4">
        <svg 
          className="h-12 w-12 mx-auto mb-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {message}
      </p>
      {showRetryButton && onRetry && (
        <button
          onClick={onRetry}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`${MESSAGES.RETRY} - ${title}`}
        >
          {MESSAGES.RETRY}
        </button>
      )}
    </div>
  );
};

export default memo(ErrorMessage);