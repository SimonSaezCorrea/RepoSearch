import { Github, Star } from 'lucide-react';
import { useCallback } from 'react';

import { formatProjectName, formatRepoSize, openInNewTab } from '../utils/formatUtils';

interface CardProps {
  title: string;
  username: string;
  avatar_url: string;
  git_user_url: string;
  project_url: string;
  description?: string;
  size?: number;
  stars?: number;
  language?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  username,
  avatar_url,
  git_user_url,
  project_url,
  description,
  size,
  stars,
  language,
}) => {
  // Usando useCallback para optimizar performance
  const handleUserClick = useCallback(() => {
    openInNewTab(git_user_url);
  }, [git_user_url]);

  const handleProjectClick = useCallback(() => {
    openInNewTab(project_url);
  }, [project_url]);

  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.opacity = '1';
  }, []);

  return (
    <article
      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 w-full min-w-[280px]"
      role="button"
      tabIndex={0}
      style={{
        // Dimensiones más predecibles para evitar saltos en masonry
        minHeight: '200px',
        maxHeight: 'fit-content',
      }}
    >
      {/* Header con avatar, nombre y estrellas */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center w-full">
          {/* Avatar */}
          <div 
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer transform hover:scale-110 transition-transform duration-200 flex-shrink-0" 
            onClick={handleUserClick}
          >
            <img
              src={avatar_url}
              alt={`Avatar de ${username}`}
              className="w-full h-full object-cover"
              loading="lazy"
              onLoad={handleImageLoad}
              style={{
                opacity: 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            />
          </div>
          
          {/* Nombre de usuario */}
          <div className="ml-3 flex-shrink-0">
            <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                @{username}
              </span>
            </div>
          </div>
          
          {/* Espacio flexible que empuja las estrellas a la derecha */}
          <div className="flex-1"></div>
          
          {/* Estrellas en el extremo derecho */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {stars?.toLocaleString() || '0'}
            </span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
          {formatProjectName(title)}
        </h2>

        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
            {description}
          </p>
        )}

        {/* Estadísticas adicionales */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            {size && (
              <span className="flex items-center gap-1">
                <span>📦</span>
                <span>{formatRepoSize(size)}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer con lenguaje y enlace */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {language && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
              {language}
            </div>
          )}
        </div>
        <div 
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full cursor-pointer transition-colors duration-200"
          onClick={handleProjectClick}
        >
          <Github className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200" />
        </div>
      </div>
    </article>
  );
};

export default Card;
