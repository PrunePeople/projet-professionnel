import React from "react";
// Importation de React

import useForm from "../hooks/useForm";
// Importation du hook personnalisé useForm pour gérer le formulaire

import validate from "../hooks/validate";
// Importation de la fonction de validation pour vérifier les valeurs du formulaire

import { useTheme } from "../context/ThemeContext";
// Importation du contexte de thème pour accéder aux styles dynamiques

import Button from "./Button";
// Importation du composant Button pour le bouton de soumission

import axios from "axios";
// Importation d'axios pour effectuer des requêtes HTTP

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
  // Définition du composant fonctionnel ContactForm

  const { errorMessageClass } = useTheme();
  // Utilisation du contexte de thème pour obtenir la classe de message d'erreur

  // Fonction pour soumettre le formulaire via une requête HTTP POST
  const submitForm = () => {
    axios
      .post("http://localhost:3001/send-email", values)
      .then((response) => {
        console.log(response.data);
        // Afficher un message de succès ou rediriger l'utilisateur
        toast.success("Email envoyé avec succès !");
      })
      .catch((error) => {
        console.error(error);
        // Afficher un message d'erreur
        toast.error("Erreur lors de l'envoi de l'email. Veuillez réessayer.");
      });
  };

  // Valeurs initiales du formulaire
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  };

  // Utilisation du hook personnalisé useForm
  const { values, handleChange, handleSubmit, handleBlur, errors } = useForm(
    initialValues,
    validate,
    submitForm
  );
  // values : état des valeurs du formulaire
  // handleChange : fonction pour gérer les changements dans les champs du formulaire
  // handleSubmit : fonction pour gérer la soumission du formulaire
  // handleBlur : fonction pour gérer le flou des champs (blur event)
  // errors : état des erreurs de validation

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="mt-16"
      />
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nom */}
      <div>
        <label htmlFor="lastName" className="block mb-2">
          Nom
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={values.lastName || ""}
          onChange={handleChange}
          className={`w-full p-2 border ${
            errors.lastName ? "border-tertiary-500" : "border-secondary-300"
          } rounded`}
          onBlur={handleBlur}
        />
        {errors.lastName && (
          <p className={errorMessageClass()}>{errors.lastName}</p>
        )}
      </div>
      {/* Prénom */}
      <div>
        <label htmlFor="firstName" className="block mb-2">
          Prénom
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={values.firstName || ""}
          onChange={handleChange}
          className={`w-full p-2 border ${
            errors.firstName ? "border-tertiary-500" : "border-secondary-300"
          } rounded`}
          onBlur={handleBlur}
        />
        {errors.firstName && (
          <p className={errorMessageClass()}>{errors.firstName}</p>
        )}
      </div>
      {/* Section pour le champ Email */}
      <div>
        {/* Étiquette pour le champ email */}
        <label htmlFor="email" className="block mb-2">
          E-mail
        </label>
        {/* Champ de saisie pour l'email */}
        <input
          type="email" // Type du champ défini comme email
          id="email" // Identifiant unique pour le champ
          name="email" // Nom du champ utilisé pour le mapping des valeurs
          value={values.email || ""} // Valeur actuelle du champ, initialisée à une chaîne vide si aucune valeur n'est présente
          onChange={handleChange} // Fonction appelée à chaque changement de valeur pour mettre à jour l'état
          className={`w-full p-2 border ${
            errors.email ? "border-tertiary-500" : "border-secondary-300"
          } rounded`} // Classes CSS dynamiques pour appliquer des styles en fonction des erreurs
          onBlur={handleBlur} // Fonction appelée lorsque le champ perd le focus pour valider le champ
        />
        {/* Affichage du message d'erreur si une erreur est présente pour ce champ */}
        {errors.email && <p className={errorMessageClass()}>{errors.email}</p>}
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="phone" className="block mb-2">
          Téléphone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={values.phone || ""}
          onChange={handleChange}
          className={`w-full p-2 border ${
            errors.phone ? "border-tertiary-500" : "border-secondary-300"
          } rounded`}
          pattern="^\d{10}$"
          onBlur={handleBlur}
        />
        {errors.phone && <p className={errorMessageClass()}>{errors.phone}</p>}
      </div>
      {/* Société (non obligatoire) */}
      <div>
        <label htmlFor="company" className="block mb-2">
          Société
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={values.company || ""}
          onChange={handleChange}
          className={`w-full p-2 border ${
            errors.company ? "border-tertiary-500" : "border-secondary-300"
          } rounded`}
        />
        {/* Pas d'erreur pour la société puisqu'elle n'est pas obligatoire */}
      </div>
      {/* Objet de la demande */}
      <div>
        <label htmlFor="subject" className="block mb-2">
          Objet
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={values.subject || ""}
          onChange={handleChange}
          className={`w-full p-2 border ${
            errors.subject ? "border-tertiary-500" : "border-secondary-300"
          } rounded`}
          onBlur={handleBlur}
        />
        {errors.subject && (
          <p className={errorMessageClass()}>{errors.subject}</p>
        )}
      </div>
      {/* Message */}
      <div>
        <label htmlFor="message" className="block mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={values.message || ""}
          onChange={handleChange}
          className={`w-full p-2 border ${
            errors.message ? "border-tertiary-500" : "border-secondary-300"
          } rounded`}
          onBlur={handleBlur}
        ></textarea>
        {errors.message && (
          <p className={errorMessageClass()}>{errors.message}</p>
        )}
      </div>
      {/* Bouton de soumission */}
      <div className="flex justify-end">
        <Button type="submit" className="p-1 ml-2 item-end">
          Envoyer
        </Button>
      </div>
    </form>
    </>
  );
};

export default ContactForm;
// Exportation du composant ContactForm pour pouvoir l'utiliser dans d'autres fichiers
