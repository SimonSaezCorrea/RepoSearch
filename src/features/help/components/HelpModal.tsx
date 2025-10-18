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
    <div className="help-modal-overlay" onClick={onClose}>
      <div className="help-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="help-modal-header">
          <div className="help-modal-title">
            <HelpCircle className="help-modal-icon" />
            <h2>Guía de Uso - RepoSearch</h2>
          </div>
          <button 
            className="help-modal-close"
            onClick={onClose}
            aria-label="Cerrar ayuda"
          >
            <X />
          </button>
        </div>

        {/* Navigation Tabs */}
        <NavegationTabs
          helpSections={helpSections}
          currentSection={currentSection}
          goToSection={goToSection}
        />

        {/* Content */}
        <ContentHelper currentContent={currentContent} />

        {/* Footer Navigation */}
        <FooterNavegtion
          currentSection={currentSection}
          helpSections={helpSections}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          goToSection={goToSection}
        />
      </div>
    </div>
  );
};

export default HelpModal;