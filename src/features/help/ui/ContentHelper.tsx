import { useEffect, useRef } from "react";

import "../styles/ContentHelper.css";

interface ContentHelperProps {
  currentContent: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    content: React.ReactNode;
  };
}

export const ContentHelper = ({ currentContent }: ContentHelperProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Resetear scroll al inicio cuando cambia el contenido
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentContent]);

  return (
    <div className="help-modal-content" ref={contentRef}>
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