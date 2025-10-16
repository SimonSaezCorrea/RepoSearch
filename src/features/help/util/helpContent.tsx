import {
  BookOpen,
  CreditCard,
  Database,
  FileText,
  Search
} from 'lucide-react';
import React from 'react';

import { ApiOperationSection } from '../components/sections/ApiOperationSection';
import { CardInformationSection } from '../components/sections/CardInformationSection';
import { ExamplesUseSection } from '../components/sections/ExamplesUseSection';
import { SearchControlsSection } from '../components/sections/SearchControlsSection';
import { WritingSpecificationsSection } from '../components/sections/WritingSpecificationsSection';

export interface HelpSection {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
}

export const helpSections: HelpSection[] = [
  {
    title: "Controles de Búsqueda",
    icon: Search,
    content: (
      <SearchControlsSection />
    )
  },
  {
    title: "Información de las Cards",
    icon: CreditCard,
    content: (
      <CardInformationSection />
    )
  },
  {
    title: "Funcionamiento de la API",
    icon: Database,
    content: (
      <ApiOperationSection />
    )
  },
  {
    title: "Especificaciones de Escritura",
    icon: FileText,
    content: (
      <WritingSpecificationsSection />
    )
  },
  {
    title: "Ejemplos de Uso",
    icon: BookOpen,
    content: (
      <ExamplesUseSection />
    )
  }
];