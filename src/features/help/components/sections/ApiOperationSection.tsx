import "./allSection.css";

export const ApiOperationSection = () => {
  return (
    <div className="help-content">
        <h4>🔗 Integración con GitHub API</h4>
        
        <div className="help-subsection">
          <h5>🚀 Proceso de Búsqueda</h5>
          <div className="help-api-flow">
            <div className="help-api-step">
              <div className="help-api-step-number">1</div>
              <div className="help-api-step-content">
                <strong>Construcción de Query</strong>
                <p>Se combina la búsqueda de texto con todos los filtros aplicados</p>
              </div>
            </div>
            
            <div className="help-api-step">
              <div className="help-api-step-number">2</div>
              <div className="help-api-step-content">
                <strong>Petición a GitHub</strong>
                <p>Se envía la consulta a <code>api.github.com/search/repositories</code></p>
              </div>
            </div>
            
            <div className="help-api-step">
              <div className="help-api-step-number">3</div>
              <div className="help-api-step-content">
                <strong>Procesamiento</strong>
                <p>Se formatean y validan los datos recibidos</p>
              </div>
            </div>
            
            <div className="help-api-step">
              <div className="help-api-step-number">4</div>
              <div className="help-api-step-content">
                <strong>Visualización</strong>
                <p>Se muestran los resultados en el grid de cards</p>
              </div>
            </div>
          </div>
        </div>

        <div className="help-subsection">
          <h5>🔍 Construcción de Queries</h5>
          <p>Los filtros se convierten en parámetros de búsqueda de GitHub:</p>
          
          <div className="help-query-examples">
            <div className="help-query-example">
              <strong>Filtro:</strong> Lenguaje = "JavaScript", Estrellas ≥ 100
              <br />
              <strong>Query:</strong> <code>language:JavaScript stars:&gt;=100</code>
            </div>
            
            <div className="help-query-example">
              <strong>Filtro:</strong> Organización = "microsoft", Creado después de 2023
              <br />
              <strong>Query:</strong> <code>org:microsoft created:&gt;2023-01-01</code>
            </div>
            
            <div className="help-query-example">
              <strong>Filtro:</strong> Tópico = "machine-learning", Último push reciente
              <br />
              <strong>Query:</strong> <code>topic:machine-learning pushed:&gt;2024-01-01</code>
            </div>
          </div>
        </div>

        <div className="help-subsection">
          <h5>⚡ Sistema de Buffering</h5>
          <p>Para mejorar la experiencia del usuario:</p>
          <ul className='help-list'>
            <li><strong>Cache inteligente:</strong> Los resultados se almacenan temporalmente</li>
            <li><strong>Paginación automática:</strong> Se cargan más resultados según sea necesario</li>
            <li><strong>Gestión de estado:</strong> Se mantiene el estado entre búsquedas</li>
            <li><strong>Optimización:</strong> Se evitan peticiones duplicadas</li>
          </ul>
        </div>

        <div className="help-subsection">
          <h5>📊 Límites y Consideraciones</h5>
          <div className="help-limitations">
            <div className="help-limitation">
              <strong>Límite de Rate:</strong>
              <p>GitHub limita las peticiones por hora. Si se alcanza el límite, aparecerá un mensaje de espera.</p>
            </div>
            
            <div className="help-limitation">
              <strong>Máximo de Resultados:</strong>
              <p>GitHub devuelve hasta 100 resultados por búsqueda, distribuidos en páginas de 0.</p>
            </div>
            
            <div className="help-limitation">
              <strong>Tiempo de Respuesta:</strong>
              <p>Las búsquedas complejas pueden tardar más tiempo en procesarse.</p>
            </div>
          </div>
        </div>

        <div className="help-subsection">
          <h5>🔄 Estados de Carga</h5>
          <ul className='help-list'>
            <li><strong>Cargando:</strong> Se muestra un spinner mientras se procesa la petición</li>
            <li><strong>Éxito:</strong> Los resultados aparecen en el grid de cards</li>
            <li><strong>Error:</strong> Se muestra un mensaje de error explicativo</li>
            <li><strong>Sin resultados:</strong> Mensaje informativo cuando no hay coincidencias</li>
          </ul>
        </div>
      </div>
  );
};