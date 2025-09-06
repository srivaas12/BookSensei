import React from 'react';
import { Link } from 'react-router-dom';

// --- START: NEW HUMANIZED ICONS ---
// Each icon is designed to be more illustrative and tell a story.

// 1. For "Semantic Understanding" - A human mind connecting with a book.
const UnderstandingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25c-2.093 0-3.832.324-5.252.9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25V18m0 0l-2.5-2.5M12 18l2.5-2.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25c2.093 0 3.832.324 5.252.9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.875A9.733 9.733 0 0112 6c3.125 0 6.015 1.486 7.962 3.815" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// 2. For "The Digital Library" - A curated stack of treasured books.
const DatabaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 3v18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 3v18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v18" />
  </svg>
);

// 3. For "Finding the Perfect Match" - The joy of finding a book you love.
const MatchingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);
// --- END: NEW HUMANIZED ICONS ---


function About() {
  return (
    <div className="max-w-4xl mx-auto p-8 font-sans">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold font-serif text-secondary dark:text-white">
          About BookSenSei
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Your personal guide to the world of literature.
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            In a world with millions of books, finding your next great read can be daunting. Simple keyword searches often fail to capture the *feeling* we're looking for. BookSenSei was created to solve this problem. Our mission is to go beyond genre and author to understand the very essence of your request, connecting you with books that resonate with your mood, curiosity, and spirit.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8">How The Magic Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* --- UPDATED TO USE NEW ICONS --- */}
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-dark-card rounded-lg shadow-md">
              <UnderstandingIcon />
              <h3 className="text-xl font-semibold font-serif mt-4 mb-2">1. Semantic Understanding</h3>
              <p className="text-gray-600 dark:text-gray-400">Our AI doesn't just look for keywords. It uses Natural Language Processing to understand the underlying meaning and emotion of your request.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-dark-card rounded-lg shadow-md">
              <DatabaseIcon />
              <h3 className="text-xl font-semibold font-serif mt-4 mb-2">2. The Digital Library</h3>
              <p className="text-gray-600 dark:text-gray-400">We've created a unique "vector fingerprint" for every book, representing its core themes, tone, and style for a deeper level of comparison.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-dark-card rounded-lg shadow-md">
              <MatchingIcon />
              <h3 className="text-xl font-semibold font-serif mt-4 mb-2">3. Finding the Perfect Match</h3>
              <p className="text-gray-600 dark:text-gray-400">The Sensei compares your request's "fingerprint" to millions of book fingerprints, instantly finding and returning your personalized recommendations.</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-4">From the Creator</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Hi, I'm R.Srivasudevan, the developer behind BookSenSei. I hope BookSenSei helps you find stories that inspire, entertain, and stay with you long after the final page.
          </p>
        </div>
        
        <div className="text-center pt-8">
            <Link 
              to="/dashboard"
              className="px-8 py-3 text-lg font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-primary-hover transition-transform transform hover:scale-105"
            >
              Start Discovering
            </Link>
        </div>
      </div>
    </div>
  );
}

export default About;