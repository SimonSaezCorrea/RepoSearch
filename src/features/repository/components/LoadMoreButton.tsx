import { memo } from 'react';

import { MESSAGES } from '../../../shared/constants/css_menssages';
import '../styles/LoadMoreButton.css';

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

/**
 * Botón para cargar más repositorios con estado de loading y disabled.
 */
const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ 
  onClick, 
  isLoading,
  disabled = false 
}) => {
  const isButtonDisabled = disabled || isLoading;
  
  return (
    <div className="load-more-button-container">
      <button
        className={`load-more-button ${isButtonDisabled ? 'load-more-button--disabled' : 'load-more-button--active'}`}
        onClick={onClick}
        disabled={isButtonDisabled}
        aria-label={isLoading ? MESSAGES.LOADING_ARIA_LABEL : MESSAGES.LOAD_MORE_ARIA_LABEL}
      >
        {isLoading ? MESSAGES.LOADING : MESSAGES.LOAD_MORE}
      </button>
    </div>
  );
};

export default memo(LoadMoreButton);