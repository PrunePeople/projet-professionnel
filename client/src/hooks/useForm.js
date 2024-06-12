import { useState, useEffect } from 'react';
// Importation des hooks useState et useEffect de React

// Hook personnalisé pour la gestion des formulaires
export default function useForm(initialValues, validate, submitForm) {
  // États pour les valeurs du formulaire, les erreurs et l'état de soumission
  const [values, setValues] = useState(initialValues);
  // État pour stocker les valeurs des champs du formulaire

  const [errors, setErrors] = useState({});
  // État pour stocker les messages d'erreur de validation

  const [isSubmitting, setIsSubmitting] = useState(false);
  // État pour indiquer si le formulaire est en cours de soumission

  // Utilisation d'un effet pour soumettre le formulaire si aucune erreur n'est présente
  useEffect(() => {
    if (isSubmitting && Object.keys(errors).length === 0) {
      // Si isSubmitting est vrai et qu'il n'y a pas d'erreurs
      submitForm();
      // Appel de la fonction de soumission du formulaire
      setIsSubmitting(false);
      // Réinitialisation de l'état de soumission
    }
  }, [errors, isSubmitting, submitForm]);
  // Le hook useEffect dépend de errors, isSubmitting, et submitForm

  // Gestionnaire de changement pour mettre à jour les valeurs des champs du formulaire
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Extraction du nom et de la valeur du champ de l'événement
    setValues({
      ...values,
      [name]: value,
    });
    // Mise à jour de l'état des valeurs du formulaire
  };

  // Gestionnaire de soumission pour valider les données et gérer les erreurs
  const handleSubmit = (event) => {
    event.preventDefault();
    // Empêche le rechargement de la page à la soumission du formulaire
    const validationErrors = validate(values);
    // Validation des valeurs du formulaire
    setErrors(validationErrors);
    // Mise à jour de l'état des erreurs
    if (Object.keys(validationErrors).length === 0) {
      // S'il n'y a pas d'erreurs de validation
      setIsSubmitting(true);
      // Mise à jour de l'état de soumission
    } else {
      setIsSubmitting(false);
      // Réinitialisation de l'état de soumission
    }
  };

  // Gestionnaire de perte de focus pour valider les champs au fur et à mesure
  const handleBlur = (event) => {
    const { name, value } = event.target;
    // Extraction du nom et de la valeur du champ de l'événement
    const validationErrors = validate({ [name]: value });
    // Validation du champ spécifique
    setErrors((prevErrors) => {
      // Mise à jour des erreurs d'état
      if (!validationErrors[name]) {
        // S'il n'y a pas d'erreur pour ce champ
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        // Suppression de l'erreur pour ce champ
        return updatedErrors;
      }
      return {
        ...prevErrors,
        ...validationErrors,
      };
      // Ajout/mise à jour de l'erreur pour ce champ
    });
  };

  // Retourne les valeurs, gestionnaires et erreurs pour utilisation dans le composant du formulaire
  return { values, handleChange, handleSubmit, handleBlur, errors };
}
