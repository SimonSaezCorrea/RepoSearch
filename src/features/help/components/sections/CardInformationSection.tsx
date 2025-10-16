import { Code2, GitFork, Github, HardDrive, Star, User } from "lucide-react";
import "./allSection.css";

export const CardInformationSection = () => {
  return (
    <article className="help-content">
        <h4>📋 Estructura de las Cards</h4>
        
        <figure className="help-card-demo">
          <div className="help-card-preview">
            <div className="help-card-section">
              <div className="help-card-header">
                <div className="help-card-user">
                  <User className="help-card-user-icon" aria-hidden="true" />
                  <span>@usuario</span>
                </div>
                <div className="help-card-stars">
                  <Star className="help-card-star-icon" aria-hidden="true" />
                  <span>1,234</span>
                </div>
              </div>
            </div>
          </div>
          <figcaption><strong>Header:</strong> Información del usuario/organización y estrellas del repositorio</figcaption>
        </figure>

        <section className="help-subsection" aria-labelledby="repo-title-heading">
          <h5 id="repo-title-heading">🏷️ Título del Repositorio</h5>
          <p>Nombre completo del repositorio, formateado para mejor legibilidad.</p>
          <figure className="help-example">
            <figcaption><strong>Formato:</strong></figcaption>
            <code>nombre-repositorio</code>
            <br />
            <strong>Ejemplo:</strong> <code>RepoSearch</code>
          </figure>
        </section>

        <section className="help-subsection" aria-labelledby="description-heading">
          <h5 id="description-heading">📝 Descripción</h5>
          <p>Descripción proporcionada por el autor del repositorio. Si no hay descripción, se muestra "Sin descripción disponible".</p>
        </section>

        <section className="help-subsection" aria-labelledby="stats-heading">
          <h5 id="stats-heading">📊 Estadísticas Adicionales</h5>
          <dl className="help-stats">
            <div className="help-stat">
              <HardDrive className="help-stat-icon" aria-hidden="true" />
              <div>
                <dt><strong>Tamaño:</strong></dt>
                <dd>
                  <p>Tamaño del repositorio en KB/MB/GB</p>
                  <span className="help-note">Se muestra incluso si es 0 KB</span>
                </dd>
              </div>
            </div>
            
            <div className="help-stat">
              <GitFork className="help-stat-icon" aria-hidden="true" />
              <div>
                <dt><strong>Forks:</strong></dt>
                <dd>
                  <p>Número de veces que se ha bifurcado el proyecto</p>
                  <span className="help-note">Indica la popularidad y uso del código</span>
                </dd>
              </div>
            </div>
          </dl>
        </section>

        <section className="help-subsection" aria-labelledby="footer-heading">
          <h5 id="footer-heading">🏷️ Footer</h5>
          <dl className="help-footer-demo">
            <div className="help-footer-item">
              <Code2 className="help-footer-icon" aria-hidden="true" />
              <div>
                <dt><strong>Lenguaje:</strong></dt>
                <dd>Lenguaje principal del repositorio</dd>
              </div>
            </div>
            <div className="help-footer-item">
              <Github className="help-footer-icon" aria-hidden="true" />
              <div>
                <dt><strong>Enlace:</strong></dt>
                <dd>Clic para abrir en GitHub</dd>
              </div>
            </div>
          </dl>
        </section>

        <section className="help-subsection" aria-labelledby="visual-states-heading">
          <h5 id="visual-states-heading">🎨 Estados Visuales</h5>
          <ul className='help-list'>
            <li><strong>Hover:</strong> La card se eleva y cambia ligeramente</li>
            <li><strong>Truncamiento:</strong> Nombres de usuario largos se acortan automáticamente</li>
            <li><strong>Números:</strong> Se formatean con separadores de miles (1,234)</li>
            <li><strong>Tamaños:</strong> Se convierten automáticamente (1024 KB → 1 MB)</li>
          </ul>
        </section>
      </article>
  );
};