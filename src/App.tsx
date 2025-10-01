import { useCallback, useState } from 'react';

import './App.css';
import CardGrid from './components/CardGrid';
import HeaderSearch from './components/HeaderSearch';
import LoadMoreButton from './components/LoadMoreButton';
import { getRepositoryData, loadMoreRepositories, type Repository } from './services/gitService';

function App() {
  // Estado para manejar repositorios y loading
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const initialData = getRepositoryData();
    return initialData.items;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [previousCount, setPreviousCount] = useState(0); // Para rastrear cuántas cards ya estaban visibles

  // Función para cargar más repositorios
  const loadMoreRepositoriesHandler = useCallback(async () => {
    setIsLoading(true);
    const currentCount = repositories.length; // Guardar la cantidad actual antes de cargar más
    
    // Simulamos un delay para mostrar el loading
    setTimeout(() => {
      try {
        const moreRepos = loadMoreRepositories();
        
        if (moreRepos.length === 0) {
          setHasMoreData(false);
        } else {
          setPreviousCount(currentCount); // Establecer cuántas cards ya estaban visibles
          setRepositories(prev => [...prev, ...moreRepos]);
        }
      } catch (error) {
        console.error('Error cargando más repositorios:', error);
      } finally {
        setIsLoading(false);
      }
    }, 1500); // 1.5 segundos de delay para mostrar loading
  }, [repositories.length]);

  return (
    <main className="bg-gray-50 dark:bg-gray-900 transition-colors duration-500 ease-in-out min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <HeaderSearch />
        <CardGrid repositories={repositories} previousCount={previousCount} />
        {/* Botón para cargar nuevos repositorios */}
        {hasMoreData && (
          <LoadMoreButton 
            onClick={loadMoreRepositoriesHandler} 
            isLoading={isLoading}
            disabled={!hasMoreData}
          />
        )}
        {!hasMoreData && (
          <div className="text-center mt-8 text-gray-500 dark:text-gray-400">
            <p>¡Has cargado todos los repositorios disponibles!</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
