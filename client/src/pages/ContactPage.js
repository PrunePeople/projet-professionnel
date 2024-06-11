import React from "react";
import Header from "../components/Header";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTripadvisor,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import ContactForm from "../components/ContactForm";
import Block from '../components/Block';

function Contact() {
  const { textColor, hoverTextColor, iconColor } = useTheme();

  return (
    <div>
      <Header
        backgroundImage={`${process.env.PUBLIC_URL}/asset/header/header-contact.jpg`}
      />

      <div className="relative container mx-auto px-4 py-8">
      <Block
          title="Une question?"
          text=""
          imageUrl=""
          imageRight={false}
          showBackground={true}
          backgroundSize="small"
        />
        <div className="relative p-24 grid md:grid-cols-2 gap-10">

          {/* Informations de Contact */}
          <div className="relative z-10">
            <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
              Nos Coordonnées
            </h3>
            <ul className="space-y-3">
              <li className={textColor}>
                <a href="tel:+1234567890" className={hoverTextColor}>
                  <FaPhone className={`inline mr-2 ${iconColor} ${hoverTextColor}`} />
                  05 56 82 04 23
                </a>
              </li>
              <li className={textColor}>
                <a href="mailto:black_and_wine" className={hoverTextColor}>
                  <FaEnvelope className={`inline mr-2 ${iconColor} ${hoverTextColor}`} />
                  contact@comdroy.com
                </a>
              </li>
              <li className={`${textColor} flex items-start`}>
                <FaMapMarkerAlt
                  className={`mt-1 ${iconColor} ${hoverTextColor}`}
                />
                <span className="ml-2">
                  288 Boulevard de la République
                  <br />
                  33510 Andernos-les-Bains
                </span>
              </li>
            </ul>

            {/* Réseaux Sociaux */}
            <div className="mt-6">
              <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
                Suivez-nous
              </h3>
              <a
                href="https://facebook.com"
                className={`mr-4 ${hoverTextColor}`}
              >
                <FaFacebook
                  className={`inline text-3xl ${iconColor} ${hoverTextColor}`}
                />
              </a>
              <a
                href="https://instagram.com"
                className={`mr-4 ${hoverTextColor}`}
              >
                <FaInstagram
                  className={`inline text-3xl ${iconColor} ${hoverTextColor}`}
                />
              </a>
              <a href="https://tripadvisor.com" className={hoverTextColor}>
                <FaTripadvisor
                  className={`inline text-3xl ${iconColor} ${hoverTextColor}`}
                />
              </a>
            </div>
          </div>

          {/* Formulaire de Contact */}
          <div className="relative z-10">
            <ContactForm />
          </div>

        </div>

        {/* Google Maps */}
        <div className="mt-8">
        <Block
          title="Trouvez-nous sur la carte"
          text=""
          imageUrl=""
          imageRight={true}
          showBackground={true}
          backgroundSize="medium"
        />
          <iframe
            title="googleMap"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2833.6492070426643!2d-1.1073076234060306!3d44.747173080993036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd54a3a362fd5225%3A0x99c5a686d9b35262!2sCom%20D%20Roy!5e0!3m2!1sfr!2sfr!4v1712823515894!5m2!1sfr!2sfr"
            width="100%"
            height="450"
            frameBorder="0"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
