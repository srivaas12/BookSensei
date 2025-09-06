import React, { useState, useContext } from "react";
import { SearchHistoryContext } from "../context/SearchHistoryContext";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api";

// A cool search icon
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>;

function Dashboard() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Pull the results state and setter from the context
  const { minRating, results, setResults, addToHistory } = useContext(SearchHistoryContext);

  const genres = ["Fantasy", "Science Fiction", "Romance", "Thriller", "Mystery", "History", "Philosophy"];

  // --- THIS IS THE FULLY IMPLEMENTED FUNCTION ---
  const getRecommendations = async (customQuery) => {
    const q = customQuery || query;
    if (!q) {
      setError('Please enter a query or select a genre.');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]); // Clear previous results for a new search

    try {
      const res = await api.post(
        '/recommend',
        { query: q },
        { headers: { 'x-min-rating': minRating } }
      );

      const data = res.data;

      // Robust check: Only update state if the data is an array.
      if (Array.isArray(data.recommendations)) {
        setResults(data.recommendations);
        addToHistory(q);
      } else {
        console.error("Received unexpected data format:", data);
        setError("Received an unexpected response from the server.");
      }

    } catch (err) {
      setError('Failed to fetch recommendations. The server may be down.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getRecommendations(query);
  };
  
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* --- Search and Header --- */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">The Reading Room</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">What stories are you seeking today?</p>
      </div>
      
      <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto mb-8 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., 'an epic space opera with political intrigue'..."
          className="w-full px-6 py-4 pr-12 text-lg bg-white dark:bg-dark-card border-2 border-gray-200 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300"
        />
        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
          <SearchIcon />
        </button>
      </form>
      
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {genres.map(genre => (
          <button key={genre} onClick={() => getRecommendations(genre)} className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-dark-card text-secondary dark:text-gray-200 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
            {genre}
          </button>
        ))}
      </div>
      
      {/* --- Results Grid --- */}
      <div>
        {loading && <p className="text-center">Asking the Sensei...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        <AnimatePresence>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((rec) => (
              <motion.div
                layout
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}

                
                whileHover={{ y: -50 }} // 1. Lifts the card up by 8 pixels on hover
  transition={{ duration: 0.07 }} // You can adjust the speed here
  // 2. ADD 'group' and hover/transition classes for shadow and image zoom
  className="bg-white dark:bg-dark-card rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
               

                
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={rec.cover_image}
                    alt={`Cover of ${rec.title}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200.png?text=No+Cover'; }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold font-serif mb-2 text-secondary dark:text-white">{rec.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-sans">by {rec.author}</p>
                  <p className="text-base text-gray-700 dark:text-gray-300 mb-6 flex-grow font-sans">{rec.summary}</p>
                  <a
                    href={rec.buy_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full text-center px-4 py-2 font-semibold text-white bg-secondary dark:bg-gray-600 rounded-lg hover:bg-primary dark:hover:bg-primary transition-all duration-300"
                  >
                    Find on Amazon
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Dashboard;