import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchHistoryProvider } from "./context/SearchHistoryContext";

// Page and Component Imports
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Navbar from './components/Navbar';
import Settings from './pages/Settings';

// 1. IMPORT the new background component
import ParticleBackground from './components/ParticleBackground'; // Adjust path if needed

function App() {
  return (
    <SearchHistoryProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Router>
          {/* 2. PLACE the background component here, inside the Router */}
          <ParticleBackground />

          {/* 3. WRAP your content to keep it on top of the background */}
          <div className="relative z-10">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/Settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
          
        </Router>
      </div>
    </SearchHistoryProvider>
  );
}

export default App;