
const HeaderSearch = () => {
  return (
    <header className="text-gray-900 dark:text-white transition-colors duration-500 ease-in-out text-center mb-8">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        🃏 Explorador de Repositorios
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Descubre repositorios increíbles en GitHub
      </p>
      <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 px-6 rounded-full transition-all duration-300 hover:cursor-pointer hover:scale-105 shadow-lg">
        Cargar nuevos repositorios
      </button>
    </header>
  )
};

export default HeaderSearch;