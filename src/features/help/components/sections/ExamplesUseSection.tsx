import "./allSection.css";

export const ExamplesUseSection = () => {
  return (
      <div className="help-content">
        <h4>🎯 Casos de Uso Comunes</h4>
        
        <div className="help-use-case">
          <h5>1. 🔍 Buscar Proyectos de React Populares</h5>
          <div className="help-use-case-steps">
            <div className="help-step">
              <strong>Paso 1:</strong> En "Buscar repositorios" escribe: <code>react</code>
            </div>
            <div className="help-step">
              <strong>Paso 2:</strong> Expande "Filtros Avanzados"
            </div>
            <div className="help-step">
              <strong>Paso 3:</strong> Selecciona "Más estrellas" en "Ordenar por"
            </div>
            <div className="help-step">
              <strong>Paso 4:</strong> En "Lenguaje" escribe: <code>JavaScript</code>
            </div>
            <div className="help-step">
              <strong>Paso 5:</strong> En "Estrellas (mínimo)" pon: <code>1000</code>
            </div>
          </div>
          <div className="help-result">
            <strong>Resultado:</strong> Encontrarás proyectos React con JavaScript que tengan más de 1000 estrellas, ordenados por popularidad.
          </div>
        </div>

        <div className="help-use-case">
          <h5>2. 🤖 Explorar Proyectos de IA de Google</h5>
          <div className="help-use-case-steps">
            <div className="help-step">
              <strong>Paso 1:</strong> En "Buscar repositorios" escribe: <code>artificial intelligence machine learning</code>
            </div>
            <div className="help-step">
              <strong>Paso 2:</strong> En "Organización" escribe: <code>google</code>
            </div>
            <div className="help-step">
              <strong>Paso 3:</strong> En "Lenguaje" escribe: <code>Python</code>
            </div>
            <div className="help-step">
              <strong>Paso 4:</strong> En "Tópico" escribe: <code>machine-learning</code>
            </div>
          </div>
          <div className="help-result">
            <strong>Resultado:</strong> Proyectos de IA/ML de Google escritos en Python.
          </div>
        </div>

        <div className="help-use-case">
          <h5>3. 📱 Encontrar Apps Mobile Recientes</h5>
          <div className="help-use-case-steps">
            <div className="help-step">
              <strong>Paso 1:</strong> En "Buscar repositorios" escribe: <code>mobile app</code>
            </div>
            <div className="help-step">
              <strong>Paso 2:</strong> Selecciona "Más reciente" en "Ordenar por"
            </div>
            <div className="help-step">
              <strong>Paso 3:</strong> En "Creado después de" selecciona: <code>2024-01-01</code>
            </div>
            <div className="help-step">
              <strong>Paso 4:</strong> En "Lenguaje" escribe: <code>Swift</code> o <code>Kotlin</code>
            </div>
          </div>
          <div className="help-result">
            <strong>Resultado:</strong> Apps móviles nativas creadas en 2024, ordenadas por actividad reciente.
          </div>
        </div>

        <div className="help-use-case">
          <h5>4. 👨‍💻 Explorar Proyectos de un Desarrollador</h5>
          <div className="help-use-case-steps">
            <div className="help-step">
              <strong>Paso 1:</strong> En "Buscar usuarios" escribe: <code>gaearon</code>
            </div>
            <div className="help-step">
              <strong>Paso 2:</strong> Haz clic en "Buscar"
            </div>
          </div>
          <div className="help-result">
            <strong>Resultado:</strong> Encontrarás los repositorios de Dan Abramov (co-creador de Redux).
          </div>
        </div>

        <div className="help-use-case">
          <h5>5. 🆕 Descubrir Proyectos Nuevos y Prometedores</h5>
          <div className="help-use-case-steps">
            <div className="help-step">
              <strong>Paso 1:</strong> Deja vacío "Buscar repositorios"
            </div>
            <div className="help-step">
              <strong>Paso 2:</strong> Selecciona "Más nuevo" en "Ordenar por"
            </div>
            <div className="help-step">
              <strong>Paso 3:</strong> En "Estrellas (mínimo)" pon: <code>10</code>
            </div>
            <div className="help-step">
              <strong>Paso 4:</strong> En "Creado después de" selecciona: <code>2024-10-01</code>
            </div>
          </div>
          <div className="help-result">
            <strong>Resultado:</strong> Proyectos nuevos (últimas semanas) que ya tienen al menos 10 estrellas.
          </div>
        </div>

        <div className="help-use-case">
          <h5>6. 🔧 APIs y Herramientas Útiles</h5>
          <div className="help-use-case-steps">
            <div className="help-step">
              <strong>Paso 1:</strong> En "Buscar repositorios" escribe: <code>api utility tool</code>
            </div>
            <div className="help-step">
              <strong>Paso 2:</strong> En "Tópico" escribe: <code>api</code>
            </div>
            <div className="help-step">
              <strong>Paso 3:</strong> Selecciona "Más estrellas" en "Ordenar por"
            </div>
            <div className="help-step">
              <strong>Paso 4:</strong> En "Último push después de" selecciona: <code>2024-01-01</code>
            </div>
          </div>
          <div className="help-result">
            <strong>Resultado:</strong> APIs y herramientas populares que siguen manteniéndose activamente.
          </div>
        </div>

        <div className="help-tips">
          <h5>💡 Consejos Adicionales</h5>
          <ul>
            <li><strong>Combina filtros:</strong> Usa múltiples filtros para búsquedas más específicas</li>
            <li><strong>Experimenta:</strong> Prueba diferentes combinaciones de palabras clave</li>
            <li><strong>Revisa las fechas:</strong> Los proyectos con actividad reciente suelen estar mejor mantenidos</li>
            <li><strong>Considera las estrellas:</strong> Más estrellas suele indicar mayor calidad/popularidad</li>
            <li><strong>Mira los forks:</strong> Muchos forks indican que el código se está usando activamente</li>
          </ul>
        </div>
      </div>
    );
};