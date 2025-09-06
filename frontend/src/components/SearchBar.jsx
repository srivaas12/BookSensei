import React from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar({ query, setQuery, handleRecommend, loading }) {
  return (
    <div className="flex items-center gap-2 mb-8 relative">
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a book..."
        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
  onClick={handleRecommend}
  disabled={loading}
  className={`mt-4 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300 ${
    loading ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  {loading ? (
    <div className="flex items-center gap-2">
      <span className="loader ease-linear rounded-full border-2 border-t-2 border-white h-4 w-4 animate-spin"></span>
      Loading...
    </div>
  ) : (
    'Recommend'
  )}
</button>

    </div>
  );
}

export default SearchBar;
