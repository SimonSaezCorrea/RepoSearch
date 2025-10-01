import './App.css';
import CardGrid from './components/CardGrid';
import HeaderSearch from './components/HeaderSearch';

function App() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 transition-colors duration-500 ease-in-out min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <HeaderSearch />
        <CardGrid />
      </div>
    </main>
  );
}

export default App;
