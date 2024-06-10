import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTripadvisor,
  FaPhone,
  FaEnvelope,
  FaUtensils,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import Button from "./Button";

const Footer = () => {
  const { textColor, hoverTextColor, iconColor } = useTheme();

  return (
    <div className={`bg-primary text-secondary w-full py-12 px-4 lg:px-8`}>
      <div className="max-w-container-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-center md:text-left">
        {/* Coordonnées */}
        <div className={`space-y-5 lg:col-span-1 ${textColor}`}>
          <p className="font-bold">Nos Coordonnées</p>
          <span>
                  288 Boulevard de la République
                  <br />
                  33510 Andernos-les-Bains
                </span>
          <p>
            <a href="tel:+1234567890" className={`${iconColor} ${hoverTextColor}`}>
              <FaPhone className="inline mr-2" />
              05 56 82 04 23
            </a>
          </p>
          <p>
            <a href="mailto:noska.creation@gmail.com" className={`${iconColor} ${hoverTextColor}`}>
              <FaEnvelope className="inline mr-2" />
              contact@comdroy.com
            </a>
          </p>
        </div>

        {/* Horaires d'ouverture */}
        <div className={`space-y-5 lg:col-span-1 ${textColor}`}>
          <p className="font-bold">Horaires d'Ouverture</p>
          <p>Lundi - Vendredi: 9h - 22h</p>
          <p>Samedi - Dimanche: 10h - 23h</p>
        </div>

        {/* Plan du site */}
        <div className={`space-y-5 hidden md:block lg:col-span-1 ${textColor}`}>
          <p className="font-bold">Plan du Site</p>
          <div className="flex flex-col md:items-start underline">
            <a href="/" className={hoverTextColor}>Accueil</a>
            <a href="/about" className={hoverTextColor}>À propos</a>
            <a href="/menu" className={hoverTextColor}>Menu</a>
            <a href="/reservation" className={hoverTextColor}>Réservation</a>
            <a href="/gallery" className={hoverTextColor}>Galerie</a>
            <a href="/" className={hoverTextColor}>Avis</a>
            <a href="/contact" className={hoverTextColor}>Contact</a>
          </div>
        </div>

                {/* Suivez-nous */}
                <div className={`space-y-5 lg:col-span-1 ${textColor}`}>
          <p className="font-bold">Suivez-nous</p>
          <div className="flex space-x-3 justify-center md:items-start">
            <a href="https://www.facebook.com/ComDRoy/?locale=fr_FR" target="_blank" rel="noopener noreferrer">
              <FaFacebook className={`h-6 w-6 ${iconColor} ${hoverTextColor}`} />
            </a>
            <a href="/#" target="_blank" rel="noopener noreferrer">
              <FaInstagram className={`h-6 w-6 ${iconColor} ${hoverTextColor}`} />
            </a>
            <a href="https://lacarte.menu/restaurants/andernos-les-bains/com-d-roy-andernos-les-bains" target="_blank" rel="noopener noreferrer">
              <FaUtensils className={`h-6 w-6 ${iconColor} ${hoverTextColor}`} />
            </a>
            <a href="https://www.tripadvisor.fr/Restaurant_Review-g1079322-d10367122-Reviews-Com_D_Roy-Andernos_les_Bains_Gironde_Nouvelle_Aquitaine.html" target="_blank" rel="noopener noreferrer">
              <FaTripadvisor className={`h-6 w-6 ${iconColor} ${hoverTextColor}`} />
            </a>
          </div>
        </div>
        {/* Newsletter */}
        <div className="space-y-5 lg:col-span-1">
          <p className="font-bold">Newsletter</p>
          <div className="flex justify-center">
            <input
              placeholder="Votre email"
              className="w-full max-w-xs p-1 bg-secondary bg-opacity-50 rounded"
            />
            <Button className={`p-1 ml-2`}>
              S'inscrire
            </Button>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="mt-12 justify-center text-center">
        <div className="flex flex-col md:flex-row justify-center items-center md:justify-between space-y-4 md:space-y-0">
          <p>© 2024 Com d Roy. Tous droits réservés.</p>
          <div className="flex justify-center space-x-5 underline">
            <a href="/legalnotice" className={hoverTextColor}>Mentions légales</a>
            <a href="/privacypolicy" className={hoverTextColor}>Politique de confidentialité</a>
            <a href="/termsandconditions" className={hoverTextColor}>Conditions Générales d'utilisation</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
