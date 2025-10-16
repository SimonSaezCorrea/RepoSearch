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
      role="article"
      tabIndex={0}
      aria-label={`Repositorio ${title} de ${username}`}
      style={{
        // Dimensiones más predecibles para evitar saltos en masonry
        minHeight: '200px',
        maxHeight: 'fit-content',
      }}
    >
      {/* Header con avatar, nombre y estrellas */}
      <header className="card-header">
        <div className="card-user-info">
          {/* Avatar */}
          <button 
            className="card-avatar-container" 
            onClick={handleUserClick}
            aria-label={`Ver perfil de ${username}`}
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
          </button>
          
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
          <div className="card-stars" aria-label={`${stars} estrellas`}>
            <Star className="card-star-icon" aria-hidden="true" />
            <span className="card-star-count">
              {stars?.toLocaleString() || '0'}
            </span>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <section className="card-content">
        <h2 className="card-title">
          {formatProjectName(title)}
        </h2>

        {description && (
          <p className="card-description">
            {description}
          </p>
        )}

        {/* Estadísticas adicionales */}
        <dl className="card-meta">
          <div className="card-meta-left">
            {size !== undefined && (
              <div className="card-size-info">
                <dt className="sr-only">Tamaño</dt>
                <dd>
                  <HardDrive className="card-size-icon" aria-hidden="true" />
                  <span>{formatRepoSize(size)}</span>
                </dd>
              </div>
            )}
            {forks !== undefined && (
              <div className="card-forks-info">
                <dt className="sr-only">Forks</dt>
                <dd>
                  <GitFork className="card-fork-icon" aria-hidden="true" />
                  <span>{forks.toLocaleString()}</span>
                </dd>
              </div>
            )}
          </div>
        </dl>
      </section>

      {/* Footer con lenguaje y enlace */}
      <footer className="card-footer">
        <div className="card-footer-left">
          {language && (
            <span className="card-tech-badge" aria-label={`Lenguaje: ${language}`}>
              {language}
            </span>
          )}
        </div>
        <button 
          className="card-github-link"
          onClick={handleProjectClick}
          aria-label={`Abrir ${title} en GitHub`}
        >
          <Github className="card-github-icon" aria-hidden="true" />
        </button>
      </footer>
    </article>
  );
};

export default Card;