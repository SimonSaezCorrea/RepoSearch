import './HeaderSearch.css';

const HeaderSearch = () => {
  return (
    <header className="header-search">
      <h1 className="header-search-title">
        🃏 Explorador de Repositorios
      </h1>
      <p className="header-search-subtitle">
        Descubre repositorios increíbles en GitHub
      </p>
      <button className="header-search-button">
        Cargar nuevos repositorios
      </button>
    </header>
  )
};

export default HeaderSearch;