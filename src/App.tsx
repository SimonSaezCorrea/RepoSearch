import { useCallback, useState } from 'react';

import './App.css';
import CardGrid from './components/CardGrid';
import HeaderSearch from './components/HeaderSearch';
import LoadMoreButton from './components/LoadMoreButton';
import { ANIMATION, MESSAGES } from './constants';
import { getRepositoryData, loadMoreRepositories, type Repository } from './services/gitService';

function App() {
  // Estados para gestión de repositorios
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const initialData = getRepositoryData();
    return initialData.items;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [previousCount, setPreviousCount] = useState(0);

  /**
   * Maneja la carga incremental de repositorios con simulación de loading
   */
  const handleLoadMoreRepositories = useCallback(async () => {
    if (isLoading || !hasMoreData) return;
    
    setIsLoading(true);
    const currentCount = repositories.length;
    
    try {
      // Simular delay de red para mejor UX
      await new Promise(resolve => setTimeout(resolve, ANIMATION.LOADING_DELAY_MS));
      
      const moreRepos = loadMoreRepositories();
      
      if (moreRepos.length === 0) {
        setHasMoreData(false);
      } else {
        setPreviousCount(currentCount);
        setRepositories(prev => [...prev, ...moreRepos]);
      }
    } catch (error) {
      console.error('Error al cargar más repositorios:', error);
      // En una app real, aquí manejarías el error con un toast o mensaje
    } finally {
      setIsLoading(false);
    }
  }, [repositories.length, isLoading, hasMoreData]);

  return (
    <main className="bg-gray-50 dark:bg-gray-900 transition-colors duration-500 ease-in-out min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <HeaderSearch />
        <CardGrid repositories={repositories} previousCount={previousCount} />
        {hasMoreData && (
          <LoadMoreButton 
            onClick={handleLoadMoreRepositories} 
            isLoading={isLoading}
            disabled={!hasMoreData}
          />
        )}
        {!hasMoreData && (
          <div 
            className="text-center mt-8 text-gray-500 dark:text-gray-400"
            role="status"
            aria-live="polite"
          >
            <p>{MESSAGES.ALL_LOADED}</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;