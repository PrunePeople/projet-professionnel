import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // Importation de la bibliothèque d'animations Framer Motion
import {
  Bars3Icon,
  XMarkIcon,
  CalendarDaysIcon,
  GiftIcon,
  UserIcon,
} from "@heroicons/react/24/outline"; // Importation des icônes depuis Heroicons
import { useTheme } from "../context/ThemeContext"; // Utilisation du contexte de thème
import { useNavigate } from "react-router-dom"; // Utilisation de la navigation de React Router
import SignUp from "../pages/SignUp"; // Importation du composant SignUp
import Login from "../pages/Login"; // Importation du composant Login
import { Tooltip } from 'react-tooltip'; // Importation des tooltips de React

// Définition du composant Navbar
export default function Navbar() {
  // Déclaration des états locaux
  const [isOpen, setIsOpen] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setTheme, textColor, hoverTextColor, iconColor } = useTheme();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  // Effet pour changer le thème en fonction de l'état isOpen
  useEffect(() => {
    setTheme(isOpen ? 'secondary' : 'primary');
  }, [isOpen, setTheme]);

  // Effet pour vérifier si l'utilisateur est connecté en vérifiant le token
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Fonction pour basculer l'état isOpen
  const toggle = () => setIsOpen(!isOpen);

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  // Fonction appelée après une connexion réussie
  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsLoggedIn(true);
  };

  // Fonction appelée après une inscription réussie
  const handleSignUpSuccess = () => {
    setShowSignUpModal(false);
  };

  // Fonction pour gérer le clic sur l'icône utilisateur
  const handleUserIconClick = () => {
    setShowAccountMenu(!showAccountMenu);
  };

  // Fonction pour gérer le clic en dehors du menu utilisateur
  const handleClickOutside = (event) => {
    if (
      userMenuRef.current &&
      !userMenuRef.current.contains(event.target)
    ) {
      setShowAccountMenu(false);
      setShowSignUpModal(false);
      setShowLoginModal(false);
    }
  };

  // Effet pour ajouter un écouteur d'événements au document
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fonction pour gérer le clic sur le profil
  const handleProfileClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('User role:', user.role);

    if (user.role === 'admin') {
      navigate('/adminJS');
    } else {
      navigate('/dashboard');
    }
  };

  // Variantes d'animation pour le menu
  const menuVariants = {
    open: { opacity: 1, scale: 1, display: "block" },
    closed: { opacity: 0, scale: 0.95, transitionEnd: { display: "none" } },
  };

  return (
    <div
      className={`fixed w-full top-0 z-50 px-4 py-5 ${
        isOpen ? "bg-secondary" : "bg-primary"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <button onClick={toggle} className="z-30 md:hidden">
          {isOpen ? (
            <XMarkIcon className={`h-6 w-6 ${iconColor} ${hoverTextColor}`} />
          ) : (
            <Bars3Icon className={`h-6 w-6 ${iconColor} ${hoverTextColor}`} />
          )}
        </button>

        <div className="hidden md:flex justify-start items-center text-md">
          <a href="/" className={`${textColor} ${hoverTextColor} mr-3 font-medium tracking-tight`}>Accueil</a>
          <a href="/about" className={`${textColor} ${hoverTextColor} mr-3 font-medium tracking-tight`}>A propos</a>
          <a href="/menu" className={`${textColor} ${hoverTextColor} mr-3 font-medium tracking-tight`}>Menu</a>
          <a href="/reservation" className={`${textColor} ${hoverTextColor} mr-3 font-medium tracking-tight`}>Réservation</a>
          <a href="/gallery" className={`${textColor} ${hoverTextColor} mr-3 font-medium tracking-tight`}>Galerie</a>
          <a href="/contact" className={`${textColor} ${hoverTextColor} mr-3 font-medium tracking-tight`}>Contact</a>
        </div>

        <div className="hidden md:flex justify-center flex-1">
          <img
            className="h-8 w-auto"
            src="../../asset/logo/logo.png"
            alt="Com d Roy"
          />
        </div>

        <div className="hidden md:flex justify-end items-center space-x-4">
          <div className="flex flex-col items-center">
            <a
              href="/reservation"
              className="flex flex-col items-center hover:text-tertiary"
            >
              <CalendarDaysIcon className={`h-6 w-6 ${iconColor} ${hoverTextColor}`} />
              <div className={`${textColor} ${hoverTextColor} text-xs`}>Réserver</div>
            </a>
          </div>
          <div className="relative flex flex-col items-center">
            <a
              href="/#"
              data-tooltip-id="offrir-tooltip"
              data-tooltip-content="Bientôt disponible"
              className="flex flex-col items-center hover:text-tertiary"
              >
              <GiftIcon className={`h-6 w-6 ${iconColor} ${hoverTextColor}`} />
              <div className={`${textColor} ${hoverTextColor} text-xs`}>Offrir</div>
            </a>
            <Tooltip id="offrir-tooltip" place="top" effect="solid" />
          </div>
          <div className="relative" ref={userMenuRef}>
            <button onClick={handleUserIconClick} className="flex flex-col items-center hover:text-tertiary">
              <UserIcon className={`h-6 w-6 ${iconColor} ${hoverTextColor}`} />
              <div className={`${textColor} ${hoverTextColor} text-xs`}>Compte</div>
            </button>
            {showAccountMenu && (
              <div ref={userMenuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                {isLoggedIn ? (
                  <>
                    <button onClick={handleProfileClick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profil
                    </button>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Se déconnecter
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setShowSignUpModal(true); setShowAccountMenu(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      S'inscrire
                    </button>
                    <button onClick={() => { setShowLoginModal(true); setShowAccountMenu(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Se connecter
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex md:hidden justify-center flex-1">
          <img
            className="h-8 w-auto"
            src="../../asset/logo/logo-blanc.png"
            alt="Com d Roy"
          />
        </div>
      </div>

      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="w-full md:hidden"
      >
        <div className="flex flex-col items-start bg-secondary p-5">
          <a href="/" className={`${textColor} ${hoverTextColor} my-2 font-medium tracking-tight`}>Accueil</a>
          <a href="/about" className={`${textColor} ${hoverTextColor} my-2 font-medium tracking-tight`}>A propos</a>
          <a href="/menu" className={`${textColor} ${hoverTextColor} my-2 font-medium tracking-tight`}>Menu</a>
          <a href="/reservation" className={`${textColor} ${hoverTextColor} my-2 font-medium tracking-tight`}>Réservation</a>
          <a href="/gallery" className={`${textColor} ${hoverTextColor} my-2 font-medium tracking-tight`}>Galerie</a>
          <a href="/contact" className={`${textColor} ${hoverTextColor} my-2 font-medium tracking-tight`}>Contact</a>
        </div>

        <div className="flex flex-row items-start inline w-full p-5">
          <a href="/reservation" className="flex flex-col items-center mr-4">
            <CalendarDaysIcon className={`h-6 w-6 ${iconColor} ${hoverTextColor}`} />
            <div className={`${textColor} ${hoverTextColor} text-xs`}>Réserver</div>
          </a>
          <a href="/offrir" className="flex flex-col items-center mr-4" data-tooltip-id="offrir-tooltip-mobile" data-tooltip-content="Bientôt disponible">
            <GiftIcon className={`h-6 w-6 ${iconColor} ${hoverTextColor}`} />
            <div className={`${textColor} ${hoverTextColor} text-xs`}>Offrir</div>
          </a>
          <Tooltip id="offrir-tooltip-mobile" place="top" effect="solid" />
          <div className="relative">
            <button onClick={handleUserIconClick} className="flex flex-col items-center">
              <UserIcon className={`h-6 w-6 ${iconColor} ${hoverTextColor}`} />
              <div className={`${textColor} ${hoverTextColor} text-xs`}>Compte</div>
            </button>
            {showAccountMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                {isLoggedIn ? (
                  <>
                    <button onClick={handleProfileClick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profil
                    </button>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Se déconnecter
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setShowSignUpModal(true); setShowAccountMenu(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      S'inscrire
                    </button>
                    <button onClick={() => { setShowLoginModal(true); setShowAccountMenu(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Se connecter
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

       {/* Modals */}
       {showSignUpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={userMenuRef} className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <SignUp onSuccess={handleSignUpSuccess} />
            <button onClick={() => setShowSignUpModal(false)} className="mt-4 text-red-500">Fermer</button>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={userMenuRef} className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <Login onSuccess={handleLoginSuccess} />
            <button onClick={() => setShowLoginModal(false)} className="mt-4 text-red-500">Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}
