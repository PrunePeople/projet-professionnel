import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import Button from "../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });

    const newErrors = { ...errors };
    if (name === "password") {
      const passwordErrors = validatePassword(updatedValue);
      if (Object.keys(passwordErrors).length === 0) {
        delete newErrors.password;
      } else {
        newErrors.password = passwordErrors.password;
      }
    } else {
      if (!updatedValue) {
        newErrors[name] = "Ce champ est requis.";
      } else {
        delete newErrors[name];
      }
    }
    setErrors(newErrors);
  };

  const validatePassword = (password) => {
    let errors = {};
    if (password.length < 8) {
      errors.password = "Le mot de passe doit contenir au moins 8 caractères.";
    }
    if (!/[A-Z]/.test(password)) {
      errors = {
        ...errors,
        password:
          (errors.password || "") +
          " Doit contenir au moins une lettre majuscule.",
      };
    }
    if (!/[a-z]/.test(password)) {
      errors = {
        ...errors,
        password:
          (errors.password || "") +
          " Doit contenir au moins une lettre minuscule.",
      };
    }
    if (!/[0-9]/.test(password)) {
      errors = {
        ...errors,
        password:
          (errors.password || "") + " Doit contenir au moins un chiffre.",
      };
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors = {
        ...errors,
        password:
          (errors.password || "") +
          " Doit contenir au moins un caractère spécial.",
      };
    }
    return errors;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) {
      newErrors.first_name = "Le prénom est requis.";
    }
    if (!formData.last_name) {
      newErrors.last_name = "Le nom de famille est requis.";
    }
    if (!formData.email) {
      newErrors.email = "L'email est requis.";
    }
    if (!formData.phone) {
      newErrors.phone = "Le numéro de téléphone est requis.";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis.";
    }
    if (!formData.consent) {
      newErrors.consent =
        "Vous devez accepter la politique de confidentialité.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/register",
        formData
      );
      console.log("Réponse de l'API:", response);

      if (response.data) {
        toast.success(
          response.data.message || "Inscription réussie ! Bienvenue à bord."
        );
        setTimeout(() => {
          onSuccess();
        }, 3000); // Délai de 3 secondes avant d'appeler onSuccess
      } else {
        throw new Error("Aucun message de succès trouvé");
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setError(
        error.response?.data?.error ||
          "Erreur lors de l'enregistrement de l'utilisateur"
      );
      toast.error(
        error.response?.data?.message ||
          "Inscription échouée. Veuillez réessayer."
      );
    }
  };

  return (
    <div>
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
      />
      <h2 className="text-2xl text-secondary font-bold mb-6">Inscrivez-vous</h2>
      <p className="text-sm text-secondary mb-4">
        Déjà inscrit ?{" "}
        <Link
          to="/login"
          className="text-secondary hover:text-tertiary underline"
        >
          Connectez-vous
        </Link>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="first_name" className="block text-secondary">
            Prénom
          </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            placeholder="Prénom"
            value={formData.first_name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
          />
          {errors.first_name && (
            <p className="text-xs text-tertiary mt-1">{errors.first_name}</p>
          )}
        </div>
        <div>
          <label htmlFor="last_name" className="block text-secondary">
            Nom de famille
          </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Nom de famille"
            value={formData.last_name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
          />
          {errors.last_name && (
            <p className="text-xs text-tertiary mt-1">{errors.last_name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-secondary">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
          />
          {errors.email && (
            <p className="text-xs text-tertiary mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-secondary">
            Numéro de téléphone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Numéro de téléphone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
          />
          {errors.phone && (
            <p className="text-xs text-tertiary mt-1">{errors.phone}</p>
          )}
        </div>
        
        <div className="relative">
          {/* Étiquette pour le champ de mot de passe */}
          <label
            htmlFor="password"
            className="block text-secondary flex items-center"
          >
            Mot de passe
            {/* Icône d'information avec tooltip pour des conseils sur le mot de passe */}
            <FaInfoCircle
              data-tooltip-id="password-info"
              data-tooltip-content="Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."
              className="ml-2 text-secondary cursor-pointer hover:text-tertiary"
            />
            {/* Tooltip qui s'affiche au survol de l'icône */}
            <Tooltip id="password-info" place="top" effect="solid" />
          </label>
          {/* Champ de saisie pour le mot de passe */}
          <input
            type={isPasswordVisible ? "text" : "password"} // Changement du type en texte si le mot de passe est visible
            className="mt-1 block w-full p-2 border border-secondary rounded-md"
            value={formData.password} // Valeur actuelle du champ de mot de passe
            onChange={handleChange} // Fonction appelée à chaque changement de valeur
            placeholder="Mot de passe"
            name="password"
            id="password"
          />
          {/* Icône pour afficher/masquer le mot de passe */}
          <span
            onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Bascule entre l'affichage et le masquage du mot de passe
            className="absolute right-3 top-8 cursor-pointer text-3xl hover:text-tertiary"
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />} 
            {/* Change d'icône en fonction de l'état de visibilité */}
          </span>
          {/* Message d'erreur pour le champ de mot de passe */}
          {errors.password && (
            <p className="text-xs text-tertiary mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-secondary">
              J'accepte la{" "}
              <Link to="/privacyPolicy" className="text-secondary underline">
                politique de confidentialité
              </Link>
            </span>
          </label>
          {errors.consent && (
            <p className="text-xs text-tertiary mt-1">{errors.consent}</p>
          )}
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <div>
          <Button
            type="submit"
            className="w-full flex justify-center py-2 px-4"
          >
            Inscrivez-vous
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
