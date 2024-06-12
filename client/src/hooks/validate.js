const notEmpty = value => value.trim().length > 0;
// Fonction pour vérifier que la valeur n'est pas vide
// Utilise la méthode trim() pour supprimer les espaces blancs en début et fin de chaîne
// Vérifie que la longueur de la chaîne résultante est supérieure à 0

// Cet objet mappe les noms de champs à leurs fonctions de validation respectives
const validators = {
  firstName: value => notEmpty(value) || "Le prénom est obligatoire.",
  // Validation pour le prénom : vérifie que le champ n'est pas vide

  lastName: value => notEmpty(value) || "Le nom est obligatoire.",
  // Validation pour le nom : vérifie que le champ n'est pas vide

  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "L'adresse email est invalide.",
  // Validation pour l'email : vérifie que l'email suit le format correct (expression régulière)

  phone: value => /^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$/.test(value) || "Le numéro de téléphone est invalide.",
  // Validation pour le téléphone : vérifie que le numéro suit un format acceptable (expression régulière)

  company: value => true,
  // Pas de validation nécessaire pour la société car elle n'est pas obligatoire

  subject: value => notEmpty(value) || "L'objet est obligatoire.",
  // Validation pour l'objet : vérifie que le champ n'est pas vide

  message: value => value.trim().length >= 20 || "Le message doit contenir au moins 20 caractères."
  // Validation pour le message : vérifie que le message contient au moins 20 caractères
};

export default function validate(values) {
  let errors = {};
  // Initialisation de l'objet pour stocker les messages d'erreur

  // Itérer sur chaque champ dans l'objet values
  Object.keys(values).forEach(key => {
    const validator = validators[key];
    // Récupère la fonction de validation pour le champ actuel

    if (validator) {
      const validationResult = validator(values[key]);
      // Exécute la fonction de validation avec la valeur du champ actuel

      if (validationResult !== true) {
        errors[key] = validationResult;
        // Si la validation échoue, ajoute un message d'erreur pour ce champ dans l'objet errors
      }
    }
  });

  return errors;
  // Retourne l'objet errors contenant les messages d'erreur pour chaque champ invalide
}
