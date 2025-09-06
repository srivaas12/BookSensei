import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// The new, more elegant icon for Settings
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Icons for the Dark Mode toggle
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;


function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const linkClass = "font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300";
  const activeLinkClass = "text-primary dark:text-primary";

  return (
    <nav className="bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left side: Brand */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold font-serif text-secondary dark:text-white">
              Book<span className="text-primary">SenSei</span> 📚
            </NavLink>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLink to="/" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Home</NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Dashboard</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>About</NavLink>
          </div>
          
          {/* Right side: Settings and Theme Toggle */}
          <div className="flex items-center space-x-5">
            <NavLink to="/settings" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass} title="Settings">
              <SettingsIcon />
            </NavLink>
            
            <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300" title="Toggle Theme">
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;