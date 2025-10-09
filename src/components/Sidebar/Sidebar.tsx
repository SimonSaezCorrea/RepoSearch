import React from 'react';

import SearchControls, { type SearchFilters } from '../../SearchControls/components';
import HeaderSearch from '../HeaderSearch';

import './Sidebar.css';

interface SidebarProps {
  onManualSearch: (query: string, type: 'repository' | 'user', filters: SearchFilters) => void;
  onRandomSearch: () => void;
  isLoading?: boolean;
  currentQuery?: string;
  queryType?: string;
  repositoryCount?: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  onManualSearch,
  onRandomSearch,
  isLoading = false,
  currentQuery = '',
  queryType = '',
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
          queryType={queryType}
          repositoryCount={repositoryCount}
        />
      </div>
    </aside>
  );
};

export default Sidebar;