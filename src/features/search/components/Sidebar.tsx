import React from 'react';

import type { SidebarProps } from '../types/search';

import HeaderSearch from './HeaderSearch';
import SearchControls from './SearchControls';

import '../styles/Sidebar.css';

const Sidebar: React.FC<SidebarProps> = ({
  onManualSearch,
  onRandomSearch,
  isLoading = false,
  currentQuery = '',
  queryType = '',
  repositoryCount = 0
}) => {
  return (
    <div className="sidebar">
      {/* Encabezado del sidebar */}
      <header className="sidebar-header">
        <HeaderSearch onRandomSearch={onRandomSearch} />
      </header>
      
      {/* Controles de búsqueda */}
      <section className="sidebar-content" aria-label="Controles de búsqueda">
        <SearchControls
          onManualSearch={onManualSearch}
          isLoading={isLoading}
          currentQuery={currentQuery}
          queryType={queryType}
          repositoryCount={repositoryCount}
        />
      </section>
    </div>
  );
};

export default Sidebar;