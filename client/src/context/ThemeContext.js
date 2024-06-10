import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("primary"); // Le thème initial

  // Détermine les classes de couleur de texte en fonction du thème
  const textColor = theme === "primary" ? "text-secondary" : "text-primary";

  // Cette fonction retourne la classe de couleur de texte en fonction de la classe de couleur de fond passée
  const getTextColorOnBackground = (backgroundColor) => {
    switch (backgroundColor) {
      case "bg-secondary":
      case "bg-tertiary":
        return "text-primary";
      case "bg-primary":
        return "text-secondary";
      default:
        return "text-primary"; // Retour par défaut si le fond n'est pas spécifié
    }
  };

  // Détermine les classes pour les hover des liens
  const hoverTextColor =
    theme === "primary"
      ? "hover:text-tertiary"
      : "hover:text-primary italic underline";

  // Détermine les classes de couleur des pictogrammes
  const iconColor = theme === "primary" ? "text-secondary" : "text-primary";

  // Ajout d'une fonction pour retourner les classes de style des messages d'erreur
  const errorMessageClass = () => "text-error text-xs";

  // Styles de bouton spécifiques
  const buttonStyle = "border bg-white text-secondary border-secondary rounded";
  const buttonHoverStyle =
    "hover:bg-validate hover:text-primary hover:border-primary";

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        textColor,
        getTextColorOnBackground,
        hoverTextColor,
        iconColor,
        errorMessageClass,
        buttonStyle,
        buttonHoverStyle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
