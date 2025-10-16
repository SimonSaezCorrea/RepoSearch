import { ChevronLeft, ChevronRight } from 'lucide-react';
import "../styles/FooterNavegation.css";

interface FooterNavegtionProps {
  currentSection: number;
  helpSections: { title: string }[];
  handlePrevious: () => void;
  handleNext: () => void;
  goToSection: (index: number) => void;
}

export const FooterNavegtion = ({ currentSection, helpSections, handlePrevious, handleNext, goToSection }: FooterNavegtionProps) => {
  return (
    <>
      <button 
        className="help-modal-nav-button"
        onClick={handlePrevious}
        aria-label="Sección anterior"
      >
        <ChevronLeft aria-hidden="true" />
        <span>Anterior</span>
      </button>
      
      <nav className="help-modal-pagination" aria-label="Navegación de páginas">
        <span className="help-modal-page-info" aria-live="polite">
          Página {currentSection + 1} de {helpSections.length}
        </span>
        <div className="help-modal-dots" role="tablist" aria-label="Indicadores de página">
          {helpSections.map((section, index) => (
            <button
              key={index}
              role="tab"
              className={`help-modal-dot ${index === currentSection ? 'active' : ''}`}
              onClick={() => goToSection(index)}
              aria-label={`Ir a ${section.title}`}
              aria-selected={index === currentSection}
              aria-current={index === currentSection ? 'true' : 'false'}
            />
          ))}
        </div>
      </nav>
      
      <button 
        className="help-modal-nav-button"
        onClick={handleNext}
        aria-label="Siguiente sección"
      >
        <span>Siguiente</span>
        <ChevronRight aria-hidden="true" />
      </button>
    </>
  );
};