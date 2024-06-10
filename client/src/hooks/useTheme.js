import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

// Création du hook useTheme
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('primary');

  const getHoverClass = () => {
    switch(theme) {
      case 'primary': return 'hover:text-tertiary';
      case 'secondary': return 'hover:text-primary';
      case 'tertiary': return 'hover:text-primary';
      default: return '';
    }
  };

  // Ajout d'une fonction pour les styles de message d'erreur
  const getErrorMessageClass = () => {
    // Ici, on retourne les classes pour un message d'erreur en général
    // `text-tertiary` et `text-xs` pour une couleur spécifique et une taille de texte
    return 'text-error text-xs';
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, getHoverClass, getErrorMessageClass }}>
      {children}
    </ThemeContext.Provider>
  );
};
