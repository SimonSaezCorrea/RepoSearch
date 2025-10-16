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
    <article className="help-modal-content" ref={contentRef} role="region" aria-live="polite">
      <section className="help-modal-section">
        <header className="help-modal-section-title">
          <currentContent.icon className="help-modal-section-icon" aria-hidden="true" />
          <h3>{currentContent.title}</h3>
        </header>
        <article className="help-modal-section-body">
          {currentContent.content}
        </article>
      </section>
    </article>
  );
}