import "../styles/ContentHelper.css"

interface ContentHelperProps {
  currentContent: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    content: React.ReactNode;
  };
}

export const ContentHelper = ({ currentContent }: ContentHelperProps) => {
  return (
    <div className="help-modal-content">
              <div className="help-modal-section">
                <h3 className="help-modal-section-title">
                  <currentContent.icon className="help-modal-section-icon" />
                  {currentContent.title}
                </h3>
                <div className="help-modal-section-body">
                  {currentContent.content}
                </div>
              </div>
            </div>
  );
}