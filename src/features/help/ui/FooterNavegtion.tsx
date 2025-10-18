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
    <div className="help-modal-footer">
      <button 
        className="help-modal-nav-button"
        onClick={handlePrevious}
        aria-label="Sección anterior"
      >
        <ChevronLeft />
        Anterior
      </button>
      
      <div className="help-modal-pagination">
        <span className="help-modal-page-info">
          {currentSection + 1} de {helpSections.length}
        </span>
        <div className="help-modal-dots">
          {helpSections.map((_, index) => (
            <button
              key={index}
              className={`help-modal-dot ${index === currentSection ? 'active' : ''}`}
              onClick={() => goToSection(index)}
              aria-label={`Ir a sección ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <button 
        className="help-modal-nav-button"
        onClick={handleNext}
        aria-label="Siguiente sección"
      >
        Siguiente
        <ChevronRight />
      </button>
    </div>
  );
};