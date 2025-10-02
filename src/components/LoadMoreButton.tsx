import { memo } from 'react';

import { CSS_CLASSES, MESSAGES } from '../constants';

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
  const buttonClasses = `${CSS_CLASSES.BUTTON_BASE} ${isButtonDisabled ? CSS_CLASSES.BUTTON_DISABLED : CSS_CLASSES.BUTTON_ACTIVE}`;
  
  return (
    <div className="flex justify-center mt-8">
      <button
        className={buttonClasses}
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