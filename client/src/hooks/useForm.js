import { useState, useEffect } from 'react';

// Hook personnalisé pour la gestion des formulaires
export default function useForm(initialValues, validate, submitForm) {
  // États pour les valeurs du formulaire, les erreurs et l'état de soumission
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Utilisation d'un effet pour soumettre le formulaire si aucune erreur n'est présente
  useEffect(() => {
    if (isSubmitting && Object.keys(errors).length === 0) {
      submitForm();
      setIsSubmitting(false);
    }
  }, [errors]);

  // Gestionnaire de changement pour mettre à jour les valeurs des champs du formulaire
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Gestionnaire de soumission pour valider les données et gérer les erreurs
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
    } else {
      setIsSubmitting(false);
    }
  };

  // Gestionnaire de perte de focus pour valider les champs au fur et à mesure
  const handleBlur = (event) => {
    const { name, value } = event.target;
    const validationErrors = validate({ [name]: value });
    setErrors((prevErrors) => {
      if (!validationErrors[name]) {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      }
      return {
        ...prevErrors,
        ...validationErrors,
      };
    });
  };

  // Retourne les valeurs, gestionnaires et erreurs pour utilisation dans le composant du formulaire
  return { values, handleChange, handleSubmit, handleBlur, errors };
}
