import { HelpCircle, X } from 'lucide-react';
import React, { useState } from 'react';

import '../styles/HelpModal.css';
import { ContentHelper } from '../ui/ContentHelper';
import { FooterNavegtion } from '../ui/FooterNavegtion';
import { NavegationTabs } from '../ui/NavegationTabs';
import { helpSections } from '../util/helpContent';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [currentSection, setCurrentSection] = useState(0);

  if (!isOpen) return null;

  const handlePrevious = () => {
    setCurrentSection(prev => (prev > 0 ? prev - 1 : helpSections.length - 1));
  };

  const handleNext = () => {
    setCurrentSection(prev => (prev < helpSections.length - 1 ? prev + 1 : 0));
  };

  const goToSection = (index: number) => {
    setCurrentSection(index);
  };

  const currentContent = helpSections[currentSection];

  return (
    <div className="help-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="help-modal-title">
      <div className="help-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="help-modal-header">
          <div className="help-modal-title">
            <HelpCircle className="help-modal-icon" aria-hidden="true" />
            <h2 id="help-modal-title">Guía de Uso - RepoSearch</h2>
          </div>
          <button 
            className="help-modal-close"
            onClick={onClose}
            aria-label="Cerrar ayuda"
          >
            <X aria-hidden="true" />
          </button>
        </header>

        {/* Navigation Tabs */}
        <nav aria-label="Navegación de secciones de ayuda">
          <NavegationTabs
            helpSections={helpSections}
            currentSection={currentSection}
            goToSection={goToSection}
          />
        </nav>

        {/* Content */}
        <ContentHelper currentContent={currentContent} />

        {/* Footer Navigation */}
        <footer className="help-modal-footer">
          <FooterNavegtion
            currentSection={currentSection}
            helpSections={helpSections}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            goToSection={goToSection}
          />
        </footer>
      </div>
    </div>
  );
};

export default HelpModal;