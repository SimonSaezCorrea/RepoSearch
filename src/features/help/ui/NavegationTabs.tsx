import '../styles/NavegationTabs.css';

interface NavegationTabsProps {
  helpSections: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  currentSection: number;
  goToSection: (index: number) => void;
}


export const NavegationTabs = ({ helpSections, currentSection, goToSection }: NavegationTabsProps) => {
  return (
    <div className="help-modal-tabs" role="tablist">
      {helpSections.map((section, index) => (
        <button
          key={index}
          role="tab"
          className={`help-modal-tab ${index === currentSection ? 'active' : ''}`}
          onClick={() => goToSection(index)}
          aria-selected={index === currentSection}
          aria-controls={`help-panel-${index}`}
          id={`help-tab-${index}`}
          tabIndex={index === currentSection ? 0 : -1}
        >
          <section.icon className="help-modal-tab-icon" aria-hidden="true" />
          <span className="help-modal-tab-text">{section.title}</span>
        </button>
      ))}
    </div>
  );
}