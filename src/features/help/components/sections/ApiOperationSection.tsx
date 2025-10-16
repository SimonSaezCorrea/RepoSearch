import "./allSection.css";

export const ApiOperationSection = () => {
  return (
    <article className="help-content">
        <h4>🔗 Integración con GitHub API</h4>
        
        <section className="help-subsection" aria-labelledby="process-heading">
          <h5 id="process-heading">🚀 Proceso de Búsqueda</h5>
          <ol className="help-api-flow" role="list">
            <li className="help-api-step">
              <span className="help-api-step-number" aria-label="Paso 1">1</span>
              <div className="help-api-step-content">
                <strong>Construcción de Query</strong>
                <p>Se combina la búsqueda de texto con todos los filtros aplicados</p>
              </div>
            </li>
            
            <li className="help-api-step">
              <span className="help-api-step-number" aria-label="Paso 2">2</span>
              <div className="help-api-step-content">
                <strong>Petición a GitHub</strong>
                <p>Se envía la consulta a <code>api.github.com/search/repositories</code></p>
              </div>
            </li>
            
            <li className="help-api-step">
              <span className="help-api-step-number" aria-label="Paso 3">3</span>
              <div className="help-api-step-content">
                <strong>Procesamiento</strong>
                <p>Se formatean y validan los datos recibidos</p>
              </div>
            </li>
            
            <li className="help-api-step">
              <span className="help-api-step-number" aria-label="Paso 4">4</span>
              <div className="help-api-step-content">
                <strong>Visualización</strong>
                <p>Se muestran los resultados en el grid de cards</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="help-subsection" aria-labelledby="query-heading">
          <h5 id="query-heading">🔍 Construcción de Queries</h5>
          <p>Los filtros se convierten en parámetros de búsqueda de GitHub:</p>
          
          <div className="help-query-examples">
            <figure className="help-query-example">
              <figcaption>
                <strong>Filtro:</strong> Lenguaje = "JavaScript", Estrellas ≥ 100
              </figcaption>
              <code>language:JavaScript stars:&gt;=100</code>
            </figure>
            
            <figure className="help-query-example">
              <figcaption>
                <strong>Filtro:</strong> Organización = "microsoft", Creado después de 2023
              </figcaption>
              <code>org:microsoft created:&gt;2023-01-01</code>
            </figure>
            
            <figure className="help-query-example">
              <figcaption>
                <strong>Filtro:</strong> Tópico = "machine-learning", Último push reciente
              </figcaption>
              <code>topic:machine-learning pushed:&gt;2024-01-01</code>
            </figure>
          </div>
        </section>

        <section className="help-subsection" aria-labelledby="buffering-heading">
          <h5 id="buffering-heading">⚡ Sistema de Buffering</h5>
          <p>Para mejorar la experiencia del usuario:</p>
          <ul className='help-list'>
            <li><strong>Cache inteligente:</strong> Los resultados se almacenan temporalmente</li>
            <li><strong>Paginación automática:</strong> Se cargan más resultados según sea necesario</li>
            <li><strong>Gestión de estado:</strong> Se mantiene el estado entre búsquedas</li>
            <li><strong>Optimización:</strong> Se evitan peticiones duplicadas</li>
          </ul>
        </section>

        <section className="help-subsection" aria-labelledby="limits-heading">
          <h5 id="limits-heading">📊 Límites y Consideraciones</h5>
          <dl className="help-limitations">
            <div className="help-limitation">
              <dt><strong>Límite de Rate:</strong></dt>
              <dd>GitHub limita las peticiones por hora. Si se alcanza el límite, aparecerá un mensaje de espera.</dd>
            </div>
            
            <div className="help-limitation">
              <dt><strong>Máximo de Resultados:</strong></dt>
              <dd>GitHub devuelve hasta 100 resultados por búsqueda, distribuidos en páginas de 0.</dd>
            </div>
            
            <div className="help-limitation">
              <dt><strong>Tiempo de Respuesta:</strong></dt>
              <dd>Las búsquedas complejas pueden tardar más tiempo en procesarse.</dd>
            </div>
          </dl>
        </section>

        <section className="help-subsection" aria-labelledby="states-heading">
          <h5 id="states-heading">🔄 Estados de Carga</h5>
          <ul className='help-list'>
            <li><strong>Cargando:</strong> Se muestra un spinner mientras se procesa la petición</li>
            <li><strong>Éxito:</strong> Los resultados aparecen en el grid de cards</li>
            <li><strong>Error:</strong> Se muestra un mensaje de error explicativo</li>
            <li><strong>Sin resultados:</strong> Mensaje informativo cuando no hay coincidencias</li>
          </ul>
        </section>
      </article>
  );
};