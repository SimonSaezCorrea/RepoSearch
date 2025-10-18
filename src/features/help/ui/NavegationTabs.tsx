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
    <div className="help-modal-tabs">
          {helpSections.map((section, index) => (
            <button
              key={index}
              className={`help-modal-tab ${index === currentSection ? 'active' : ''}`}
              onClick={() => goToSection(index)}
            >
              <section.icon className="help-modal-tab-icon" />
              <span className="help-modal-tab-text">{section.title}</span>
            </button>
          ))}
        </div>
  );
}