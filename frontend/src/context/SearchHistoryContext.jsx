import { createContext, useState, useEffect } from "react";

export const SearchHistoryContext = createContext();

export function SearchHistoryProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [minRating, setMinRating] = useState(
    parseFloat(localStorage.getItem("minRating")) || 2.0


  );
  const [results, setResults] = useState([]);

  // Load history + rating from localStorage on mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(savedHistory);

    const savedRating = parseFloat(localStorage.getItem("minRating"));
    if (!isNaN(savedRating)) {
      setMinRating(savedRating);
    }
  }, []);

  // Add query to history
  const addToHistory = (query) => {
    if (!query) return;
    const updated = [query, ...history.filter((q) => q !== query)].slice(0, 5);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
    setHistory(updated);
  };

  // Clear history
  const clearHistory = () => {
    localStorage.removeItem("searchHistory");
    setHistory([]);
  };

  // Update min rating
  const updateMinRating = (value) => {
    setMinRating(value);
    localStorage.setItem("minRating", value);
  };

  return (
    <SearchHistoryContext.Provider
      value={{
        history,
        addToHistory,
        clearHistory,
        minRating,
        updateMinRating,
        results,      
        setResults
      }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
}
