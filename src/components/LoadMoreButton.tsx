
interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ 
  onClick, 
  isLoading,
  disabled = false 
}) => {
  return (
    <div className="flex justify-center mt-8">
      <button
        className={`
          py-3 px-6 rounded-full transition-all duration-300 hover:cursor-pointer hover:scale-105 shadow-lg
          ${disabled || isLoading 
            ? 'bg-gray-400 dark:bg-gray-600 text-gray-200 cursor-not-allowed transform-none' 
            : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white'
          }
        `}
        onClick={onClick}
        disabled={isLoading || disabled}
      >
        {isLoading ? 'Cargando...' : 'Cargar más repositorios'}
      </button>
    </div>
  );
};

export default LoadMoreButton;
