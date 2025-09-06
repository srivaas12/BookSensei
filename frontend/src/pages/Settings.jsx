import { useEffect, useState } from "react";
import { useContext } from "react";
import { SearchHistoryContext } from "../context/SearchHistoryContext";


function Settings() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  
  const { clearHistory, minRating, updateMinRating } = useContext(SearchHistoryContext);


  
  

  return (
    <div className="max-w-2xl mx-auto p-6 text-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold mb-6">⚙️ Settings</h2>

      <div className="mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="w-4 h-4"
          />
          Enable Dark Mode
        </label>
      </div>
      <div className="mb-6">
  <label className="block text-sm font-medium mb-1">
    Minimum Book Rating: <span className="font-bold">{minRating.toFixed(1)}</span>
  </label>
  <input
    type="range"
    min="1"
    max="5"
    step="0.1"
    value={minRating}
    onChange={(e) => updateMinRating(parseFloat(e.target.value))}
    className="w-full"
  />
</div>


      <div className="mb-6">
        <button
          onClick={clearHistory}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Search History
        </button>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        More features coming soon...
      </div>
    </div>
  );
}

export default Settings;
