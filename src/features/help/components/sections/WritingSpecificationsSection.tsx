import "./allSection.css";

export const WritingSpecificationsSection = () => {
  return (
    <div className="help-content">
        <h4>✍️ Reglas de Escritura y Formato</h4>
        
        <div className="help-subsection">
          <h5>👤 Nombres de Usuario</h5>
          <div className="help-spec">
            <div className="help-spec-rule">
              <strong>Regla:</strong> Debe ser exacto, sin espacios, case-sensitive
            </div>
            <div className="help-spec-examples">
              <div className="help-spec-good">
                <strong>✅ Correcto:</strong>
                <ul className='help-list'>
                  <li><code>torvalds</code> (Linus Torvalds)</li>
                  <li><code>gaearon</code> (Dan Abramov)</li>
                  <li><code>microsoft</code> (Microsoft Corp)</li>
                  <li><code>vercel</code> (Vercel)</li>
                </ul>
              </div>
              <div className="help-spec-bad">
                <strong>❌ Incorrecto:</strong>
                <ul className='help-list'>
                  <li><code>linus torvalds</code> (con espacios)</li>
                  <li><code>MICROSOFT</code> (case incorrecto)</li>
                  <li><code>dan abramov</code> (nombre real en lugar de username)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="help-subsection">
          <h5>🏷️ Lenguajes de Programación</h5>
          <div className="help-spec">
            <div className="help-spec-rule">
              <strong>Regla:</strong> Debe coincidir con los nombres oficiales de GitHub
            </div>
            <div className="help-spec-examples">
              <div className="help-spec-good">
                <strong>✅ Nombres Correctos:</strong>
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
              </div>
              <div className="help-spec-bad">
                <strong>❌ Variaciones Incorrectas:</strong>
                <ul className='help-list'>
                  <li><code>js</code>, <code>javascript</code></li>
                  <li><code>ts</code>, <code>typescript</code></li>
                  <li><code>cpp</code>, <code>c++11</code></li>
                  <li><code>golang</code>, <code>go-lang</code></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="help-subsection">
          <h5>🏢 Organizaciones</h5>
          <div className="help-spec">
            <div className="help-spec-rule">
              <strong>Regla:</strong> Nombre exacto de la organización en GitHub
            </div>
            <div className="help-spec-examples">
              <div className="help-spec-good">
                <strong>✅ Ejemplos Correctos:</strong>
                <ul className='help-list'>
                  <li><code>microsoft</code> (Microsoft Corporation)</li>
                  <li><code>google</code> (Google)</li>
                  <li><code>facebook</code> (Meta)</li>
                  <li><code>apple</code> (Apple Inc.)</li>
                  <li><code>netflix</code> (Netflix)</li>
                  <li><code>uber</code> (Uber Technologies)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="help-subsection">
          <h5>🏷️ Topics/Etiquetas</h5>
          <div className="help-spec">
            <div className="help-spec-rule">
              <strong>Regla:</strong> Minúsculas, con guiones para separar palabras
            </div>
            <div className="help-spec-examples">
              <div className="help-spec-good">
                <strong>✅ Formato Correcto:</strong>
                <ul className='help-list'>
                  <li><code>machine-learning</code></li>
                  <li><code>web-development</code></li>
                  <li><code>react-native</code></li>
                  <li><code>data-science</code></li>
                  <li><code>api</code></li>
                  <li><code>frontend</code></li>
                </ul>
              </div>
              <div className="help-spec-bad">
                <strong>❌ Formato Incorrecto:</strong>
                <ul className='help-list'>
                  <li><code>Machine Learning</code> (con mayúsculas)</li>
                  <li><code>web_development</code> (con underscore)</li>
                  <li><code>ReactNative</code> (camelCase)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="help-subsection">
          <h5>📅 Formatos de Fecha</h5>
          <div className="help-spec">
            <div className="help-spec-rule">
              <strong>Formato:</strong> YYYY-MM-DD (ISO 8601)
            </div>
            <div className="help-spec-examples">
              <div className="help-spec-good">
                <strong>✅ Ejemplos:</strong>
                <ul className='help-list'>
                  <li><code>2024-01-01</code> (1 de enero, 2024)</li>
                  <li><code>2023-12-25</code> (25 de diciembre, 2023)</li>
                  <li><code>2024-06-15</code> (15 de junio, 2024)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="help-subsection">
          <h5>🔢 Números</h5>
          <div className="help-spec">
            <div className="help-spec-rule">
              <strong>Regla:</strong> Solo números enteros positivos (incluido 0)
            </div>
            <div className="help-spec-examples">
              <div className="help-spec-good">
                <strong>✅ Válidos:</strong>
                <ul className='help-list'>
                  <li><code>0</code> (incluye repositorios sin estrellas)</li>
                  <li><code>1</code>, <code>10</code>, <code>100</code></li>
                  <li><code>1000</code>, <code>5000</code></li>
                </ul>
              </div>
              <div className="help-spec-bad">
                <strong>❌ No válidos:</strong>
                <ul className='help-list'>
                  <li><code>-1</code> (números negativos)</li>
                  <li><code>10.5</code> (decimales)</li>
                  <li><code>1k</code> (con sufijos)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}