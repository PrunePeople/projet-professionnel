import React from "react";
import { motion } from "framer-motion";

const AboutBlock = ({ title, text, imageUrl, imageRight, showBackground = false, backgroundSize = 'large' }) => {
  // Variantes spécifiques...
  const textVariants = {
    offscreen: {
      x: -100,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1.5,
      },
    },
  };

  const imageVariants = {
    offscreen: {
      x: 100,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1.5,
      },
    },
  };

  const titleVariants = {
    offscreen: {
      y: -20, // Commence légèrement vers le haut
      opacity: 0,
    },
    onscreen: {
      y: 0, // Retour à la position originale
      opacity: 1,
      transition: {
        type: "spring", // Sensation plus dynamique
        stiffness: 100, // Pour contrôler le "rebond"
        damping: 10, // Contrôle la résistance au mouvement
        durée: 1.5, // Durée de l'animation
      },
    },
  };

  const textSection = (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
      variants={textVariants}
      className="w-full md:w-1/2 p-5"
    >
      <motion.h2
        variants={titleVariants}
        className="text-3xl uppercase font-bold mb-4 text-secondary"
      >
        {title}
      </motion.h2>
      <p className="text-secondary">{text}</p>
    </motion.div>
  );

  const imageSection = imageUrl ? (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
      variants={imageVariants}
      className="w-full md:w-1/2 p-5"
    >
      <img src={imageUrl} alt={title} className="rounded-lg shadow-lg min-w-full" />
    </motion.div>
  ) : null;

  const backgroundClass = {
    small: 'w-1/4 h-1/4 bg-tertiary', // Pour les petits fonds
    medium: 'w-1/2 h-1/2 bg-secondary', // Pour les fonds moyens
    large: 'w-3/4 h-3/4 bg-secondary', // Pour les grands fonds
  }[backgroundSize] || 'w-3/4 h-3/4 bg-secondary'; // Valeur par défaut

  const backgroundStyles = `absolute ${imageRight ? 'right-[-10%]' : 'left-[-10%]'} top-[-10%] ${backgroundClass} bg-secondary opacity-50 z-[-1]`;

  return (
    <div className="relative flex flex-wrap items-center justify-between py-12 mx-16">
      {showBackground && <div className={backgroundStyles}></div>}
      {imageRight ? [textSection, imageSection] : [imageSection, textSection]}
    </div>
  );
};

export default AboutBlock;
