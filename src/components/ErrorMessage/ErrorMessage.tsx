import { memo } from 'react';

import { MESSAGES } from '../../constants/css_menssages';
import './ErrorMessage.css';

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
  className = "error-message-wrapper"
}) => {
  return (
    <div className={className}>
      <div className="error-message-container">
        <div className="error-message-icon-container">
          <svg 
            className="error-message-icon" 
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
        <h2 className="error-message-title">
          {title}
        </h2>
        <p className="error-message-text">
          {message}
        </p>
        {showRetryButton && onRetry && (
          <button
            onClick={onRetry}
            className="error-message-retry-button"
            aria-label={`${MESSAGES.RETRY} - ${title}`}
          >
            {MESSAGES.RETRY}
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(ErrorMessage);