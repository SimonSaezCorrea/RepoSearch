import '../styles/HeaderSearch.css';

interface HeaderSearchProps {
  onRandomSearch?: () => void;
}

const HeaderSearch = ({ onRandomSearch }: HeaderSearchProps) => {
  return (
    <header className="header-search">
      <h1 className="header-search-title">
        Explorador de Repositorios
      </h1>
      <p className="header-search-subtitle">
        Descubre repositorios increíbles en GitHub
      </p>
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