import '../styles/HeaderSearch.css';

interface HeaderSearchProps {
  onRandomSearch?: () => void;
}

const HeaderSearch = ({ onRandomSearch }: HeaderSearchProps) => {
  return (
    <header className="header-search">
      <div className="header-search-top">
        <img
          src="../../../../public/reposearch.svg"
          alt="Logo de RepoSearch"
          className="header-search-logo"
        />
        <div className="header-search-titles">
          <h1 className="header-search-title">Explorador de Repositorios</h1>
        </div>
      </div>
      <p className="header-search-subtitle">Descubre repositorios increíbles en GitHub</p>
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