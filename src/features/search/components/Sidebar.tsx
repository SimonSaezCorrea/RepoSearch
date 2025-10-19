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
  repositoryCount = 0
}) => {
  return (
    <aside className="sidebar">
      {/* Encabezado del sidebar */}
      <div className="sidebar-header">
        <HeaderSearch onRandomSearch={onRandomSearch} />
      </div>
      
      {/* Controles de búsqueda */}
      <div className="sidebar-content">
        <SearchControls
          onManualSearch={onManualSearch}
          isLoading={isLoading}
          currentQuery={currentQuery}
          repositoryCount={repositoryCount}
        />
      </div>
    </aside>
  );
};

export default Sidebar;