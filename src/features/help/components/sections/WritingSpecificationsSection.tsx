import "./allSection.css";

export const WritingSpecificationsSection = () => {
  return (
    <article className="help-content">
        <h4>✍️ Reglas de Escritura y Formato</h4>
        
        <section className="help-subsection" aria-labelledby="usernames-heading">
          <h5 id="usernames-heading">👤 Nombres de Usuario</h5>
          <div className="help-spec">
            <p className="help-spec-rule">
              <strong>Regla:</strong> Debe ser exacto, sin espacios, case-sensitive
            </p>
            <div className="help-spec-examples">
              <figure className="help-spec-good">
                <figcaption><strong>✅ Correcto:</strong></figcaption>
                <ul className='help-list'>
                  <li><code>torvalds</code> (Linus Torvalds)</li>
                  <li><code>gaearon</code> (Dan Abramov)</li>
                  <li><code>microsoft</code> (Microsoft Corp)</li>
                  <li><code>vercel</code> (Vercel)</li>
                </ul>
              </figure>
              <figure className="help-spec-bad">
                <figcaption><strong>❌ Incorrecto:</strong></figcaption>
                <ul className='help-list'>
                  <li><code>linus torvalds</code> (con espacios)</li>
                  <li><code>MICROSOFT</code> (case incorrecto)</li>
                  <li><code>dan abramov</code> (nombre real en lugar de username)</li>
                </ul>
              </figure>
            </div>
          </div>
        </section>

        <section className="help-subsection" aria-labelledby="languages-heading">
          <h5 id="languages-heading">🏷️ Lenguajes de Programación</h5>
          <div className="help-spec">
            <p className="help-spec-rule">
              <strong>Regla:</strong> Debe coincidir con los nombres oficiales de GitHub
            </p>
            <div className="help-spec-examples">
              <figure className="help-spec-good">
                <figcaption><strong>✅ Nombres Correctos:</strong></figcaption>
                <ul className='help-list'>
                  <li><code>JavaScript</code> (no "javascript" o "JS")</li>
                  <li><code>TypeScript</code> (no "Typescript")</li>
                  <li><code>Python</code></li>
                  <li><code>C++</code> (no "cpp" o "c plus plus")</li>
                  <li><code>C#</code> (no "csharp")</li>
                  <li><code>Go</code> (no "golang")</li>
                  <li><code>Rust</code></li>
                  <li><code>Swift</code></li>
                </ul>
              </figure>
              <figure className="help-spec-bad">
                <figcaption><strong>❌ Variaciones Incorrectas:</strong></figcaption>
                <ul className='help-list'>
                  <li><code>js</code>, <code>javascript</code></li>
                  <li><code>ts</code>, <code>typescript</code></li>
                  <li><code>cpp</code>, <code>c++11</code></li>
                  <li><code>golang</code>, <code>go-lang</code></li>
                </ul>
              </figure>
            </div>
          </div>
        </section>

        <section className="help-subsection" aria-labelledby="organizations-heading">
          <h5 id="organizations-heading">🏢 Organizaciones</h5>
          <div className="help-spec">
            <p className="help-spec-rule">
              <strong>Regla:</strong> Nombre exacto de la organización en GitHub
            </p>
            <div className="help-spec-examples">
              <figure className="help-spec-good">
                <figcaption><strong>✅ Ejemplos Correctos:</strong></figcaption>
                <ul className='help-list'>
                  <li><code>microsoft</code> (Microsoft Corporation)</li>
                  <li><code>google</code> (Google)</li>
                  <li><code>facebook</code> (Meta)</li>
                  <li><code>apple</code> (Apple Inc.)</li>
                  <li><code>netflix</code> (Netflix)</li>
                  <li><code>uber</code> (Uber Technologies)</li>
                </ul>
              </figure>
            </div>
          </div>
        </section>

        <section className="help-subsection" aria-labelledby="topics-heading">
          <h5 id="topics-heading">🏷️ Topics/Etiquetas</h5>
          <div className="help-spec">
            <p className="help-spec-rule">
              <strong>Regla:</strong> Minúsculas, con guiones para separar palabras
            </p>
            <div className="help-spec-examples">
              <figure className="help-spec-good">
                <figcaption><strong>✅ Formato Correcto:</strong></figcaption>
                <ul className='help-list'>
                  <li><code>machine-learning</code></li>
                  <li><code>web-development</code></li>
                  <li><code>react-native</code></li>
                  <li><code>data-science</code></li>
                  <li><code>api</code></li>
                  <li><code>frontend</code></li>
                </ul>
              </figure>
              <figure className="help-spec-bad">
                <figcaption><strong>❌ Formato Incorrecto:</strong></figcaption>
                <ul className='help-list'>
                  <li><code>Machine Learning</code> (con mayúsculas)</li>
                  <li><code>web_development</code> (con underscore)</li>
                  <li><code>ReactNative</code> (camelCase)</li>
                </ul>
              </figure>
            </div>
          </div>
        </section>

        <section className="help-subsection" aria-labelledby="dates-heading">
          <h5 id="dates-heading">📅 Formatos de Fecha</h5>
          <div className="help-spec">
            <p className="help-spec-rule">
              <strong>Formato:</strong> YYYY-MM-DD (ISO 8601)
            </p>
            <div className="help-spec-examples">
              <figure className="help-spec-good">
                <figcaption><strong>✅ Ejemplos:</strong></figcaption>
                <ul className='help-list'>
                  <li><code>2024-01-01</code> (1 de enero, 2024)</li>
                  <li><code>2023-12-25</code> (25 de diciembre, 2023)</li>
                  <li><code>2024-06-15</code> (15 de junio, 2024)</li>
                </ul>
              </figure>
            </div>
          </div>
        </section>

        <section className="help-subsection" aria-labelledby="numbers-heading">
          <h5 id="numbers-heading">🔢 Números</h5>
          <div className="help-spec">
            <p className="help-spec-rule">
              <strong>Regla:</strong> Solo números enteros positivos (incluido 0)
            </p>
            <div className="help-spec-examples">
              <figure className="help-spec-good">
                <figcaption><strong>✅ Válidos:</strong></figcaption>
                <ul className='help-list'>
                  <li><code>0</code> (incluye repositorios sin estrellas)</li>
                  <li><code>1</code>, <code>10</code>, <code>100</code></li>
                  <li><code>1000</code>, <code>5000</code></li>
                </ul>
              </figure>
              <figure className="help-spec-bad">
                <figcaption><strong>❌ No válidos:</strong></figcaption>
                <ul className='help-list'>
                  <li><code>-1</code> (números negativos)</li>
                  <li><code>10.5</code> (decimales)</li>
                  <li><code>1k</code> (con sufijos)</li>
                </ul>
              </figure>
            </div>
          </div>
        </section>
      </article>
  );
}