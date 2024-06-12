import React from "react";
// Importation de React pour utiliser JSX et créer des composants

import { motion } from "framer-motion";
// Importation de Framer Motion pour les animations

const AboutBlock = ({
  title,
  text,
  imageUrl,
  imageRight,
  showBackground = false,
  backgroundSize = "large",
}) => {
  // Composant fonctionnel AboutBlock avec des props pour personnaliser le contenu et le style
  // showBackground et backgroundSize ont des valeurs par défaut

  // Définition des variantes d'animation pour le texte
  const textVariants = {
    offscreen: {
      x: -100, // Position de départ hors écran à gauche
      opacity: 0, // Opacité de départ
    },
    onscreen: {
      x: 0, // Position finale à l'écran
      opacity: 1, // Opacité finale
      transition: {
        type: "spring", // Animation de type ressort
        bounce: 0.4, // Effet de rebond
        duration: 1.5, // Durée de l'animation
      },
    },
  };

  // Définition des variantes d'animation pour l'image
  const imageVariants = {
    offscreen: {
      x: 100, // Position de départ hors écran à droite
      opacity: 0, // Opacité de départ
    },
    onscreen: {
      x: 0, // Position finale à l'écran
      opacity: 1, // Opacité finale
      transition: {
        type: "spring", // Animation de type ressort
        bounce: 0.4, // Effet de rebond
        duration: 1.5, // Durée de l'animation
      },
    },
  };

  // Définition des variantes d'animation pour le titre
  const titleVariants = {
    offscreen: {
      y: -20, // Position de départ légèrement vers le haut
      opacity: 0, // Opacité de départ
    },
    onscreen: {
      y: 0, // Position finale
      opacity: 1, // Opacité finale
      transition: {
        type: "spring", // Animation de type ressort
        stiffness: 100, // Raideur du ressort
        damping: 10, // Amortissement du ressort
        duration: 1.5, // Durée de l'animation
      },
    },
  };

  // Création de la section de texte avec animation
  const textSection = (
    <motion.div
      initial="offscreen" // État initial de l'animation
      whileInView="onscreen" // État final de l'animation lorsqu'il est visible
      viewport={{ once: true, amount: 0.5 }} // Paramètres du viewport pour déclencher l'animation
      variants={textVariants} // Variantes utilisées pour cette animation
      className="w-full md:w-1/2 p-5" // Classes de style pour la mise en page
    >
      {/* Titre avec animation */}
      <motion.h2
        variants={titleVariants} // Variantes d'animation pour le titre
        className="text-3xl uppercase font-bold mb-4 text-secondary" // Classes de style pour le titre
      >
        {title}
      </motion.h2>
      {/* Paragraphe de texte */}
      <p className="text-secondary">{text}</p> 
      {/* Texte avec la classe text-secondary pour la couleur */}
    </motion.div>
  );

  // Création de la section d'image avec animation, si imageUrl est fourni
  const imageSection = imageUrl ? (
    <motion.div
      initial="offscreen" // État initial de l'animation
      whileInView="onscreen" // État final de l'animation lorsqu'il est visible
      viewport={{ once: true, amount: 0.5 }} // Paramètres du viewport pour déclencher l'animation
      variants={imageVariants} // Variantes utilisées pour cette animation
      className="w-full md:w-1/2 p-5" // Classes de style pour la mise en page
    >
      <img
        src={imageUrl}
        alt={title}
        className="rounded-lg shadow-lg min-w-full"
      />
      {/* Image avec des styles pour les coins arrondis et l'ombre */}
    </motion.div>
  ) : null;

  // Classes dynamiques pour la taille de l'arrière-plan en fonction de backgroundSize
  const backgroundClass =
    {
      small: "w-1/4 h-1/4 bg-tertiary", // Classes pour un petit arrière-plan
      medium: "w-1/2 h-1/2 bg-secondary", // Classes pour un arrière-plan moyen
      large: "w-3/4 h-3/4 bg-secondary", // Classes pour un grand arrière-plan
    }[backgroundSize] || "w-3/4 h-3/4 bg-secondary"; // Valeur par défaut si backgroundSize ne correspond à aucune clé

  // Styles dynamiques pour l'arrière-plan, positionné à gauche ou à droite en fonction de imageRight
  const backgroundStyles = `absolute ${
    imageRight ? "right-[-10%]" : "left-[-10%]"
  } top-[-10%] ${backgroundClass} bg-secondary opacity-50 z-[-1]`;

  return (
    // Conteneur principal avec position relative pour gérer l'arrière-plan
    <div className="relative flex flex-wrap items-center justify-between py-12 mx-16">
      {/* Affiche l'arrière-plan conditionnellement */}
      {showBackground && (
        // Div pour l'arrière-plan, avec des styles dynamiques définis dans backgroundStyles
        <div className={backgroundStyles}></div>
      )}
      {/* Affiche les sections de texte et d'image en fonction de la prop imageRight */}
      {imageRight
        ? [
            // Si imageRight est vrai, affiche d'abord la section de texte, puis la section d'image
            // Utilisation de React.Fragment pour encapsuler chaque section et ajout d'une clé unique pour chaque élément
            <React.Fragment key="textSection">{textSection}</React.Fragment>,
            <React.Fragment key="imageSection">{imageSection}</React.Fragment>,
          ]
        : [
            // Si imageRight est faux, affiche d'abord la section d'image, puis la section de texte
            // Utilisation de React.Fragment pour encapsuler chaque section et ajout d'une clé unique pour chaque élément
            <React.Fragment key="imageSection">{imageSection}</React.Fragment>,
            <React.Fragment key="textSection">{textSection}</React.Fragment>,
          ]}
    </div>
  );  
};

export default AboutBlock;
// Exportation du composant AboutBlock pour pouvoir l'importer dans d'autres fichiers
