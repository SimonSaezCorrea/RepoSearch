import { Code2, GitFork, Github, HardDrive, Star, User } from "lucide-react";
import "./allSection.css";

export const CardInformationSection = () => {
  return (
    <div className="help-content">
        <h4>📋 Estructura de las Cards</h4>
        
        <div className="help-card-demo">
          <div className="help-card-preview">
            <div className="help-card-section">
              <div className="help-card-header">
                <div className="help-card-user">
                  <User className="help-card-user-icon" />
                  <span>@usuario</span>
                </div>
                <div className="help-card-stars">
                  <Star className="help-card-star-icon" />
                  <span>1,234</span>
                </div>
              </div>
            </div>
          </div>
          <p><strong>Header:</strong> Información del usuario/organización y estrellas del repositorio</p>
        </div>

        <div className="help-subsection">
          <h5>🏷️ Título del Repositorio</h5>
          <p>Nombre completo del repositorio, formateado para mejor legibilidad.</p>
          <div className="help-example">
            <strong>Formato:</strong> <code>nombre-repositorio</code>
            <br />
            <strong>Ejemplo:</strong> <code>RepoSearch</code>
          </div>
        </div>

        <div className="help-subsection">
          <h5>📝 Descripción</h5>
          <p>Descripción proporcionada por el autor del repositorio. Si no hay descripción, se muestra "Sin descripción disponible".</p>
        </div>

        <div className="help-subsection">
          <h5>📊 Estadísticas Adicionales</h5>
          <div className="help-stats">
            <div className="help-stat">
              <HardDrive className="help-stat-icon" />
              <div>
                <strong>Tamaño:</strong>
                <p>Tamaño del repositorio en KB/MB/GB</p>
                <span className="help-note">Se muestra incluso si es 0 KB</span>
              </div>
            </div>
            
            <div className="help-stat">
              <GitFork className="help-stat-icon" />
              <div>
                <strong>Forks:</strong>
                <p>Número de veces que se ha bifurcado el proyecto</p>
                <span className="help-note">Indica la popularidad y uso del código</span>
              </div>
            </div>
          </div>
        </div>

        <div className="help-subsection">
          <h5>🏷️ Footer</h5>
          <div className="help-footer-demo">
            <div className="help-footer-item">
              <Code2 className="help-footer-icon" />
              <span><strong>Lenguaje:</strong> Lenguaje principal del repositorio</span>
            </div>
            <div className="help-footer-item">
              <Github className="help-footer-icon" />
              <span><strong>Enlace:</strong> Clic para abrir en GitHub</span>
            </div>
          </div>
        </div>

        <div className="help-subsection">
          <h5>🎨 Estados Visuales</h5>
          <ul className='help-list'>
            <li><strong>Hover:</strong> La card se eleva y cambia ligeramente</li>
            <li><strong>Truncamiento:</strong> Nombres de usuario largos se acortan automáticamente</li>
            <li><strong>Números:</strong> Se formatean con separadores de miles (1,234)</li>
            <li><strong>Tamaños:</strong> Se convierten automáticamente (1024 KB → 1 MB)</li>
          </ul>
        </div>
      </div>
  );
};