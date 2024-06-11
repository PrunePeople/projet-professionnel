import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaInfoCircle } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip'; // Importation correcte de Tooltip

const PasswordInput = ({ value, onChange }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Cette fonction retourne un objet d'erreurs basé sur la validation du mot de passe
  const getValidationErrors = (password) => {
    const errors = {};
    if (password && password.length < 8) {
      errors.length = 'Le mot de passe doit contenir au moins 8 caractères.';
    }
    if (password && !/[A-Z]/.test(password)) {
      errors.uppercase = 'Le mot de passe doit contenir au moins une lettre majuscule.';
    }
    if (password && !/[a-z]/.test(password)) {
      errors.lowercase = 'Le mot de passe doit contenir au moins une lettre minuscule.';
    }
    if (password && !/[0-9]/.test(password)) {
      errors.number = 'Le mot de passe doit contenir au moins un chiffre.';
    }
    if (password && !/[!@#$%^&*]/.test(password)) {
      errors.special = 'Le mot de passe doit contenir au moins un caractère spécial.';
    }
    return errors;
  };

  const errors = getValidationErrors(value);

  return (
    <div className="relative">
      <div className="flex items-center">
        <label className="block text-sm font-medium">
          Mot de passe
        </label>
        <FaInfoCircle
          data-tip
          data-for="password-info"
          className="ml-2 text-secondary cursor-pointer hover:text-tertiary"
        />
        <Tooltip id="password-info" place="top" effect="solid">
          Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.
        </Tooltip>
      </div>
      <input
        type={isPasswordVisible ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-secondary rounded-md"
      />
      <span onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute right-3 top-10 cursor-pointer text-xl">
        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
      </span>
      {Object.values(errors).map((error, index) => (
        <p key={index} className="text-xs text-tertiary mt-1">{error}</p>
      ))}
    </div>
  );
};

export default PasswordInput;
