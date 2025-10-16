import { HelpCircle } from 'lucide-react';
import React, { useState } from 'react';

import HelpModal from '../components/HelpModal';
import '../styles/HelpButton.css';

const HelpButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="help-button"
        onClick={handleOpenModal}
        aria-label="Abrir guía de ayuda"
        title="¿Necesitas ayuda? Haz clic para ver la guía"
      >
        <HelpCircle className="help-button-icon" />
      </button>
      
      <HelpModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default HelpButton;