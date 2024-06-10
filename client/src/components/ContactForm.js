import React from "react";
import useForm from "../hooks/useForm";
import validate from "../hooks/validate";
import { useTheme } from "../context/ThemeContext";
import Button from "./Button";
import axios from 'axios';

const ContactForm = () => {
  const { errorMessageClass } = useTheme();

  // Fonction pour soumettre le formulaire via une requête HTTP POST
  const submitForm = () => {
    axios.post('http://localhost:5000/send-email', values)
      .then(response => {
        console.log(response.data);
        // Afficher un message de succès ou rediriger l'utilisateur
      })
      .catch(error => {
        console.error(error);
        // Afficher un message d'erreur
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

  return (
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
          required
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
          required
          onBlur={handleBlur}
        />
        {errors.firstName && (
          <p className={errorMessageClass()}>{errors.firstName}</p>
        )}
      </div>
      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-2">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          className={`w-full p-2 border ${
            errors.email ? "border-tertiary-500" : "border-secondary-300"
          } rounded`}
          required
          onBlur={handleBlur}
        />
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
          required
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
          required
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
          required
          onBlur={handleBlur}
        ></textarea>
        {errors.message && <p className={errorMessageClass()}>{errors.message}</p>}
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="p-1 ml-2 item-end">
          Envoyer
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
