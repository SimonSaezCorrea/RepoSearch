import "./allSection.css";
import { ArrowDown, Building, Calendar, Code2, Star, Tag, Target } from "lucide-react";

export const SearchControlsSection = () => {

  return (
    <div className="help-content">
        <h4>🔍 Búsqueda Principal</h4>
        <div className="help-subsection">
          <p><strong>Buscar repositorios:</strong> Escribe palabras clave para encontrar repositorios específicos.</p>
          <div className="help-example">
            <strong>Ejemplos:</strong>
            <ul className='help-list'>
              <li><code>react typescript</code> - Busca repositorios con React y TypeScript</li>
              <li><code>"web scraping"</code> - Búsqueda exacta de la frase</li>
              <li><code>machine learning python</code> - ML con Python</li>
            </ul>
          </div>
        </div>

        <div className="help-subsection">
          <p><strong>Buscar usuarios:</strong> Encuentra perfiles de desarrolladores por su nombre de usuario.</p>
          <div className="help-example">
            <strong>Importante:</strong> El nombre de usuario debe ser <em>exacto</em>
            <ul className='help-list'>
              <li><code>torvalds</code> ✅ - Encuentra a Linus Torvalds</li>
              <li><code>torvald</code> ❌ - Encuentra al usuario Torvald</li>
              <li><code>microsoft</code> ✅ - Encuentra la organización Microsoft</li>
            </ul>
          </div>
        </div>

        <h4>🎛️ Filtros Avanzados</h4>
        
        <div className="help-filter">
          <div className="help-filter-title">
            <Target className="help-filter-icon" />
            <strong>Ordenar por</strong>
          </div>
          <ul className='help-list'>
            <li><strong>Relevancia:</strong> Más relevante según los términos de búsqueda</li>
            <li><strong>Más reciente:</strong> Ordenado por última actualización</li>
            <li><strong>Más estrellas:</strong> Repositorios más populares primero</li>
            <li><strong>Más nuevo:</strong> Repositorios creados recientemente</li>
            <li><strong>Más forks:</strong> Más utilizados por la comunidad</li>
          </ul>
        </div>

        <div className="help-filter">
          <div className="help-filter-title">
            <ArrowDown className="help-filter-icon" />
            <strong>Orden</strong>
          </div>
          <ul className='help-list'>
            <li><strong>Descendente:</strong> De mayor a menor (más común)</li>
            <li><strong>Ascendente:</strong> De menor a mayor</li>
          </ul>
        </div>

        <div className="help-filter">
          <div className="help-filter-title">
            <Code2 className="help-filter-icon" />
            <strong>Lenguaje</strong>
          </div>
          <p>Filtra por lenguaje de programación principal.</p>
          <div className="help-example">
            <strong>Ejemplos:</strong>
            <ul className='help-list'>
              <li><code>JavaScript</code>, <code>Python</code>, <code>TypeScript</code></li>
              <li><code>Go</code>, <code>Rust</code>, <code>C++</code></li>
              <li>Nota: Debe coincidir exactamente con el nombre en GitHub</li>
            </ul>
          </div>
        </div>

        <div className="help-filter">
          <div className="help-filter-title">
            <Star className="help-filter-icon" />
            <strong>Estrellas (mínimo)</strong>
          </div>
          <p>Número mínimo de estrellas que debe tener el repositorio.</p>
          <div className="help-example">
            <strong>Ejemplos:</strong>
            <ul className='help-list'>
              <li><code>0</code> - Incluye repositorios sin estrellas</li>
              <li><code>100</code> - Solo proyectos con 100+ estrellas</li>
              <li><code>1000</code> - Proyectos muy populares</li>
            </ul>
          </div>
        </div>

        <div className="help-filter">
          <div className="help-filter-title">
            <Building className="help-filter-icon" />
            <strong>Organización</strong>
          </div>
          <p>Busca repositorios de una organización específica.</p>
          <div className="help-example">
            <strong>Ejemplos:</strong>
            <ul className='help-list'>
              <li><code>microsoft</code> - Repos de Microsoft</li>
              <li><code>google</code> - Repos de Google</li>
              <li><code>facebook</code> - Repos de Meta/Facebook</li>
            </ul>
          </div>
        </div>

        <div className="help-filter">
          <div className="help-filter-title">
            <Calendar className="help-filter-icon" />
            <strong>Fechas</strong>
          </div>
          <ul className='help-list'>
            <li><strong>Creado después de:</strong> Repositorios creados después de esta fecha</li>
            <li><strong>Último push después de:</strong> Proyectos activos desde esta fecha</li>
          </ul>
        </div>

        <div className="help-filter">
          <div className="help-filter-title">
            <Tag className="help-filter-icon" />
            <strong>Tópico</strong>
          </div>
          <p>Busca por etiquetas/topics del repositorio.</p>
          <div className="help-example">
            <strong>Ejemplos:</strong>
            <ul className='help-list'>
              <li><code>machine-learning</code>, <code>web</code>, <code>mobile</code></li>
              <li><code>api</code>, <code>frontend</code>, <code>backend</code></li>
            </ul>
          </div>
        </div>
      </div>
  )
}