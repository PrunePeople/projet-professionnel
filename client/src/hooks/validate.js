const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const notEmpty = value => value.trim().length > 0;

// Cet objet mappe les noms de champs à leurs fonctions de validation respectives.
const validators = {
  firstName: value => notEmpty(value) || "Le prénom est obligatoire.",
  lastName: value => notEmpty(value) || "Le nom est obligatoire.",
  email: value => validateEmail(value) || "L'adresse email est invalide.",
  phone: value => /^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$/.test(value) || "Le numéro de téléphone est invalide.",
  company: value => true, // Pas de validation nécessaire pour la société car pas obligatoire
  subject: value => notEmpty(value) || "L'objet est obligatoire.",
  message: value => value.trim().length >= 20 || "Le message doit contenir au moins 20 caractères."
};

export default function validate(values) {
  let errors = {};

  // Itérer sur chaque champ dans values
  Object.keys(values).forEach(key => {
    const validator = validators[key];
    if (validator) {
      const validationResult = validator(values[key]);
      if (validationResult !== true) {
        errors[key] = validationResult;
      }
    }
  });

  return errors;
}
