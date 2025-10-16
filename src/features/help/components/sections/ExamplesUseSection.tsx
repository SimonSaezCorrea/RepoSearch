import "./allSection.css";

export const ExamplesUseSection = () => {
  return (
      <article className="help-content">
        <h4>🎯 Casos de Uso Comunes</h4>
        
        <section className="help-use-case" aria-labelledby="usecase-1-heading">
          <h5 id="usecase-1-heading">1. 🔍 Buscar Proyectos de React Populares</h5>
          <ol className="help-use-case-steps">
            <li className="help-step">
              <strong>Paso 1:</strong> En "Buscar repositorios" escribe: <code>react</code>
            </li>
            <li className="help-step">
              <strong>Paso 2:</strong> Expande "Filtros Avanzados"
            </li>
            <li className="help-step">
              <strong>Paso 3:</strong> Selecciona "Más estrellas" en "Ordenar por"
            </li>
            <li className="help-step">
              <strong>Paso 4:</strong> En "Lenguaje" escribe: <code>JavaScript</code>
            </li>
            <li className="help-step">
              <strong>Paso 5:</strong> En "Estrellas (mínimo)" pon: <code>1000</code>
            </li>
          </ol>
          <aside className="help-result">
            <strong>Resultado:</strong> Encontrarás proyectos React con JavaScript que tengan más de 1000 estrellas, ordenados por popularidad.
          </aside>
        </section>

        <section className="help-use-case" aria-labelledby="usecase-2-heading">
          <h5 id="usecase-2-heading">2. 🤖 Explorar Proyectos de IA de Google</h5>
          <ol className="help-use-case-steps">
            <li className="help-step">
              <strong>Paso 1:</strong> En "Buscar repositorios" escribe: <code>artificial intelligence machine learning</code>
            </li>
            <li className="help-step">
              <strong>Paso 2:</strong> En "Organización" escribe: <code>google</code>
            </li>
            <li className="help-step">
              <strong>Paso 3:</strong> En "Lenguaje" escribe: <code>Python</code>
            </li>
            <li className="help-step">
              <strong>Paso 4:</strong> En "Tópico" escribe: <code>machine-learning</code>
            </li>
          </ol>
          <aside className="help-result">
            <strong>Resultado:</strong> Proyectos de IA/ML de Google escritos en Python.
          </aside>
        </section>

        <section className="help-use-case" aria-labelledby="usecase-3-heading">
          <h5 id="usecase-3-heading">3. 📱 Encontrar Apps Mobile Recientes</h5>
          <ol className="help-use-case-steps">
            <li className="help-step">
              <strong>Paso 1:</strong> En "Buscar repositorios" escribe: <code>mobile app</code>
            </li>
            <li className="help-step">
              <strong>Paso 2:</strong> Selecciona "Más reciente" en "Ordenar por"
            </li>
            <li className="help-step">
              <strong>Paso 3:</strong> En "Creado después de" selecciona: <code>2024-01-01</code>
            </li>
            <li className="help-step">
              <strong>Paso 4:</strong> En "Lenguaje" escribe: <code>Swift</code> o <code>Kotlin</code>
            </li>
          </ol>
          <aside className="help-result">
            <strong>Resultado:</strong> Apps móviles nativas creadas en 2024, ordenadas por actividad reciente.
          </aside>
        </section>

        <section className="help-use-case" aria-labelledby="usecase-4-heading">
          <h5 id="usecase-4-heading">4. 👨‍💻 Explorar Proyectos de un Desarrollador</h5>
          <ol className="help-use-case-steps">
            <li className="help-step">
              <strong>Paso 1:</strong> En "Buscar usuarios" escribe: <code>gaearon</code>
            </li>
            <li className="help-step">
              <strong>Paso 2:</strong> Haz clic en "Buscar"
            </li>
          </ol>
          <aside className="help-result">
            <strong>Resultado:</strong> Encontrarás los repositorios de Dan Abramov (co-creador de Redux).
          </aside>
        </section>

        <section className="help-use-case" aria-labelledby="usecase-5-heading">
          <h5 id="usecase-5-heading">5. 🆕 Descubrir Proyectos Nuevos y Prometedores</h5>
          <ol className="help-use-case-steps">
            <li className="help-step">
              <strong>Paso 1:</strong> Deja vacío "Buscar repositorios"
            </li>
            <li className="help-step">
              <strong>Paso 2:</strong> Selecciona "Más nuevo" en "Ordenar por"
            </li>
            <li className="help-step">
              <strong>Paso 3:</strong> En "Estrellas (mínimo)" pon: <code>10</code>
            </li>
            <li className="help-step">
              <strong>Paso 4:</strong> En "Creado después de" selecciona: <code>2024-10-01</code>
            </li>
          </ol>
          <aside className="help-result">
            <strong>Resultado:</strong> Proyectos nuevos (últimas semanas) que ya tienen al menos 10 estrellas.
          </aside>
        </section>

        <section className="help-use-case" aria-labelledby="usecase-6-heading">
          <h5 id="usecase-6-heading">6. 🔧 APIs y Herramientas Útiles</h5>
          <ol className="help-use-case-steps">
            <li className="help-step">
              <strong>Paso 1:</strong> En "Buscar repositorios" escribe: <code>api utility tool</code>
            </li>
            <li className="help-step">
              <strong>Paso 2:</strong> En "Tópico" escribe: <code>api</code>
            </li>
            <li className="help-step">
              <strong>Paso 3:</strong> Selecciona "Más estrellas" en "Ordenar por"
            </li>
            <li className="help-step">
              <strong>Paso 4:</strong> En "Último push después de" selecciona: <code>2024-01-01</code>
            </li>
          </ol>
          <aside className="help-result">
            <strong>Resultado:</strong> APIs y herramientas populares que siguen manteniéndose activamente.
          </aside>
        </section>

        <aside className="help-tips">
          <h5>💡 Consejos Adicionales</h5>
          <ul>
            <li><strong>Combina filtros:</strong> Usa múltiples filtros para búsquedas más específicas</li>
            <li><strong>Experimenta:</strong> Prueba diferentes combinaciones de palabras clave</li>
            <li><strong>Revisa las fechas:</strong> Los proyectos con actividad reciente suelen estar mejor mantenidos</li>
            <li><strong>Considera las estrellas:</strong> Más estrellas suele indicar mayor calidad/popularidad</li>
            <li><strong>Mira los forks:</strong> Muchos forks indican que el código se está usando activamente</li>
          </ul>
        </aside>
      </article>
    );
};