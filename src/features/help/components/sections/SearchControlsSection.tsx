import { ArrowDown, Building, Calendar, Code2, Star, Tag, Target } from "lucide-react";
import "./allSection.css";

export const SearchControlsSection = () => {

  return (
    <article className="help-content">
        <h4>🔍 Búsqueda Principal</h4>
        <section className="help-subsection" aria-labelledby="search-repos-heading">
          <h5 id="search-repos-heading" className="sr-only">Buscar repositorios</h5>
          <p><strong>Buscar repositorios:</strong> Escribe palabras clave para encontrar repositorios específicos.</p>
          <figure className="help-example">
            <figcaption><strong>Ejemplos:</strong></figcaption>
            <ul className='help-list'>
              <li><code>react typescript</code> - Busca repositorios con React y TypeScript</li>
              <li><code>"web scraping"</code> - Búsqueda exacta de la frase</li>
              <li><code>machine learning python</code> - ML con Python</li>
            </ul>
          </figure>
        </section>

        <section className="help-subsection" aria-labelledby="search-users-heading">
          <h5 id="search-users-heading" className="sr-only">Buscar usuarios</h5>
          <p><strong>Buscar usuarios:</strong> Encuentra perfiles de desarrolladores por su nombre de usuario.</p>
          <figure className="help-example">
            <figcaption><strong>Importante:</strong> El nombre de usuario debe ser <em>exacto</em></figcaption>
            <ul className='help-list'>
              <li><code>torvalds</code> ✅ - Encuentra a Linus Torvalds</li>
              <li><code>torvald</code> ❌ - Encuentra al usuario Torvald</li>
              <li><code>microsoft</code> ✅ - Encuentra la organización Microsoft</li>
            </ul>
          </figure>
        </section>

        <h4>🎛️ Filtros Avanzados</h4>
        
        <section className="help-filter" aria-labelledby="sort-filter-heading">
          <header className="help-filter-title">
            <Target className="help-filter-icon" aria-hidden="true" />
            <h5 id="sort-filter-heading">Ordenar por</h5>
          </header>
          <dl className='help-list'>
            <div>
              <dt><strong>Relevancia:</strong></dt>
              <dd>Más relevante según los términos de búsqueda</dd>
            </div>
            <div>
              <dt><strong>Más reciente:</strong></dt>
              <dd>Ordenado por última actualización</dd>
            </div>
            <div>
              <dt><strong>Más estrellas:</strong></dt>
              <dd>Repositorios más populares primero</dd>
            </div>
            <div>
              <dt><strong>Más nuevo:</strong></dt>
              <dd>Repositorios creados recientemente</dd>
            </div>
            <div>
              <dt><strong>Más forks:</strong></dt>
              <dd>Más utilizados por la comunidad</dd>
            </div>
          </dl>
        </section>

        <section className="help-filter" aria-labelledby="order-filter-heading">
          <header className="help-filter-title">
            <ArrowDown className="help-filter-icon" aria-hidden="true" />
            <h5 id="order-filter-heading">Orden</h5>
          </header>
          <dl className='help-list'>
            <div>
              <dt><strong>Descendente:</strong></dt>
              <dd>De mayor a menor (más común)</dd>
            </div>
            <div>
              <dt><strong>Ascendente:</strong></dt>
              <dd>De menor a mayor</dd>
            </div>
          </dl>
        </section>

        <section className="help-filter" aria-labelledby="language-filter-heading">
          <header className="help-filter-title">
            <Code2 className="help-filter-icon" aria-hidden="true" />
            <h5 id="language-filter-heading">Lenguaje</h5>
          </header>
          <p>Filtra por lenguaje de programación principal.</p>
          <figure className="help-example">
            <figcaption><strong>Ejemplos:</strong></figcaption>
            <ul className='help-list'>
              <li><code>JavaScript</code>, <code>Python</code>, <code>TypeScript</code></li>
              <li><code>Go</code>, <code>Rust</code>, <code>C++</code></li>
              <li>Nota: Debe coincidir exactamente con el nombre en GitHub</li>
            </ul>
          </figure>
        </section>

        <section className="help-filter" aria-labelledby="stars-filter-heading">
          <header className="help-filter-title">
            <Star className="help-filter-icon" aria-hidden="true" />
            <h5 id="stars-filter-heading">Estrellas (mínimo)</h5>
          </header>
          <p>Número mínimo de estrellas que debe tener el repositorio.</p>
          <figure className="help-example">
            <figcaption><strong>Ejemplos:</strong></figcaption>
            <ul className='help-list'>
              <li><code>0</code> - Incluye repositorios sin estrellas</li>
              <li><code>100</code> - Solo proyectos con 100+ estrellas</li>
              <li><code>1000</code> - Proyectos muy populares</li>
            </ul>
          </figure>
        </section>

        <section className="help-filter" aria-labelledby="org-filter-heading">
          <header className="help-filter-title">
            <Building className="help-filter-icon" aria-hidden="true" />
            <h5 id="org-filter-heading">Organización</h5>
          </header>
          <p>Busca repositorios de una organización específica.</p>
          <figure className="help-example">
            <figcaption><strong>Ejemplos:</strong></figcaption>
            <ul className='help-list'>
              <li><code>microsoft</code> - Repos de Microsoft</li>
              <li><code>google</code> - Repos de Google</li>
              <li><code>facebook</code> - Repos de Meta/Facebook</li>
            </ul>
          </figure>
        </section>

        <section className="help-filter" aria-labelledby="dates-filter-heading">
          <header className="help-filter-title">
            <Calendar className="help-filter-icon" aria-hidden="true" />
            <h5 id="dates-filter-heading">Fechas</h5>
          </header>
          <dl className='help-list'>
            <div>
              <dt><strong>Creado después de:</strong></dt>
              <dd>Repositorios creados después de esta fecha</dd>
            </div>
            <div>
              <dt><strong>Último push después de:</strong></dt>
              <dd>Proyectos activos desde esta fecha</dd>
            </div>
          </dl>
        </section>

        <section className="help-filter" aria-labelledby="topic-filter-heading">
          <header className="help-filter-title">
            <Tag className="help-filter-icon" aria-hidden="true" />
            <h5 id="topic-filter-heading">Tópico</h5>
          </header>
          <p>Busca por etiquetas/topics del repositorio.</p>
          <figure className="help-example">
            <figcaption><strong>Ejemplos:</strong></figcaption>
            <ul className='help-list'>
              <li><code>machine-learning</code>, <code>web</code>, <code>mobile</code></li>
              <li><code>api</code>, <code>frontend</code>, <code>backend</code></li>
            </ul>
          </figure>
        </section>
      </article>
  )
}