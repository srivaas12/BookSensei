// In Home.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function Home() {
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const res = await api.get('/popular-books');
        if (res.data && res.data.popular_books) {
          setPopularBooks(res.data.popular_books);
        }
      } catch (error) {
        console.error("Failed to fetch popular books:", error);
      }
    };
    fetchPopularBooks();
  }, []);

  return (
    <div className="w-full min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Hero Section --- */}
        <div className="text-center py-24">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-secondary dark:text-white">
            Find Your Next Chapter.
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300 font-sans">
            Welcome to <span className="text-primary font-semibold">BookSenSei</span>. Tell us your mood, and our AI will unveil literary worlds perfectly tailored to you.
          </p>
          <Link
            to="/dashboard"
            className="mt-10 inline-block px-10 py-4 text-lg font-semibold text-white bg-primary rounded-lg shadow-lg hover:bg-primary-hover transition-all duration-300 transform hover:scale-105"
          >
            Begin Your Quest
          </Link>
        </div>

        {/* --- Popular Books Section --- */}
        {popularBooks.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-10 text-secondary dark:text-white">Editor's Picks</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {popularBooks.map(book => (
                <a href={book.buy_link} key={book.id} target="_blank" rel="noopener noreferrer" className="group block text-center">
                  <img 
                    src={book.cover_image} 
                    alt={`Cover of ${book.title}`}
                    className="w-full h-auto rounded-lg shadow-lg object-cover aspect-[2/3] transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/128x192.png?text=No+Cover'; }}
                  />
                  <h3 className="mt-4 text-md font-semibold font-serif text-secondary dark:text-white group-hover:text-primary transition-colors duration-300">
                    {book.title}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;