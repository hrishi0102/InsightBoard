import React, { createContext, useState, useEffect, useContext } from 'react';

// Create context
export const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Check if user has previously set a theme preference
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // Check saved preference or system preference
    return savedTheme 
      ? savedTheme === 'dark' 
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Update theme when it changes
  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    
    // Update document class for CSS
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme
export const useTheme = () => useContext(ThemeContext);