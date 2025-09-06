import React from "react";

function RecommendationList({ recommendations, loading }) {
  if (loading) {
    return (
      <div className="text-center">
        <p className="text-gray-500 dark:text-gray-300">Loading recommendations...</p>
      </div>
    );
  }

  if (!recommendations.length) return null;

  return (
    <div className="text-left">
      <h2 className="text-xl font-semibold mb-2">Recommended Books:</h2>
      <ul className="list-disc list-inside space-y-1">
        {recommendations.map((book, idx) => (
          <li key={idx}>{book}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationList;
