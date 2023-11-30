import React, { createContext, useState } from 'react';

const DarkModeContext = createContext({
  darkMode: true, // Default value
  toggleDarkMode: () => {}, // Placeholder function
});

// eslint-disable-next-line react/prop-types
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true); // Set dark mode to true by default

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeContext;
