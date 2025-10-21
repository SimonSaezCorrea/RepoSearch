import { openInNewTab } from '../../repository/utils/formatUtils';
import '../styles/HeaderSearch.css';

interface HeaderSearchProps {
  onRandomSearch?: () => void;
}

const handleLogoClick = () => {
  openInNewTab('https://github.com/SimonSaezCorrea/RepoSearch');
}

const HeaderSearch = ({ onRandomSearch }: HeaderSearchProps) => {
  return (
    <header className="header-search">
      <div className="header-search-top">
        <img
          src="/reposearch.svg"
          alt="Logo de RepoSearch"
          className="header-search-logo"
          onClick={handleLogoClick}
        />
        <div className="header-search-titles">
          <h1 className="header-search-title">Explorador de Repositorios</h1>
        </div>
      </div>
      <p className="header-search-subtitle">Descubre repositorios de GitHub</p>
      {onRandomSearch && (
        <button 
          className="header-search-button"
          onClick={onRandomSearch}
          type="button"
        >
          Cargar nuevos repositorios
        </button>
      )}
    </header>
  )
};

export default HeaderSearch;