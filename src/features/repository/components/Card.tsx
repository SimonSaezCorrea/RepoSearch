import { GitFork, Github, HardDrive, Star } from 'lucide-react';
import { useCallback } from 'react';

import '../styles/Card.css';
import type { CardProps } from '../types/card';
import { formatProjectName, formatRepoSize, openInNewTab } from '../utils/formatUtils';


const Card: React.FC<CardProps> = ({
  title,
  username,
  avatar_url,
  git_user_url,
  project_url,
  description,
  size,
  stars,
  forks,
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
      className="card"
      role="button"
      tabIndex={0}
      style={{
        // Dimensiones más predecibles para evitar saltos en masonry
        minHeight: '200px',
        maxHeight: 'fit-content',
      }}
    >
      {/* Header con avatar, nombre y estrellas */}
      <div className="card-header">
        <div className="card-user-info">
          {/* Avatar */}
          <div 
            className="card-avatar-container" 
            onClick={handleUserClick}
          >
            <img
              src={avatar_url}
              alt={`Avatar de ${username}`}
              className="card-avatar"
              loading="lazy"
              onLoad={handleImageLoad}
              style={{
                opacity: 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            />
          </div>
          
          {/* Nombre de usuario */}
          <div className="card-language-badge">
            <div className="card-language">
              <span className="card-language-text card-username-truncated">
                @{username}
              </span>
            </div>
          </div>
          
          {/* Espacio flexible que empuja las estrellas a la derecha */}
          <div className="card-spacer"></div>
          
          {/* Estrellas en el extremo derecho */}
          <div className="card-stars">
            <Star className="card-star-icon" />
            <span className="card-star-count">
              {stars?.toLocaleString() || '0'}
            </span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="card-content">
        <h2 className="card-title">
          {formatProjectName(title)}
        </h2>

        {description && (
          <p className="card-description">
            {description}
          </p>
        )}

        {/* Estadísticas adicionales */}
        <div className="card-meta">
          <div className="card-meta-left">
            {size !== undefined && (
              <span className="card-size-info">
                <HardDrive className="card-size-icon" />
                <span>{formatRepoSize(size)}</span>
              </span>
            )}
            {forks !== undefined && (
              <span className="card-forks-info">
                <GitFork className="card-fork-icon" />
                <span>{forks.toLocaleString()}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer con lenguaje y enlace */}
      <div className="card-footer">
        <div className="card-footer-left">
          {language && (
            <div className="card-tech-badge">
              {language}
            </div>
          )}
        </div>
        <div 
          className="card-github-link"
          onClick={handleProjectClick}
        >
          <Github className="card-github-icon" />
        </div>
      </div>
    </article>
  );
};

export default Card;