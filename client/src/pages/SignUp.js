import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from "../components/Button";

const SignUp = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        consent: false, // Added consent field
    });

    const [errors, setErrors] = useState({});
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name) {
            newErrors.first_name = 'Le prénom est requis.';
        }
        if (!formData.last_name) {
            newErrors.last_name = 'Le nom de famille est requis.';
        }
        if (!formData.email) {
            newErrors.email = "L'email est requis.";
        }
        if (!formData.phone) {
            newErrors.phone = 'Le numéro de téléphone est requis.';
        }
        if (!formData.consent) {
            newErrors.consent = "Vous devez accepter la politique de confidentialité.";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/register', formData);
            setMessage(response.data.message);
            onSuccess();
        } catch (error) {
            setError(error.response?.data?.error || "Erreur lors de l'enregistrement de l'utilisateur");
        }
    };

    return (
        <div>
            <h2 className="text-2xl text-secondary font-bold mb-6">Inscrivez-vous</h2>
            <p className="text-sm text-secondary mb-4">Déjà inscrit ? <Link to="/login" className="text-secondary hover:text-tertiary underline">Connectez-vous</Link></p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="first_name" className="block text-secondary">Prénom</label>
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
                    <label htmlFor="last_name" className="block text-secondary">Nom de famille</label>
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
                    <label htmlFor="email" className="block text-secondary">Email</label>
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
                    <label htmlFor="phone" className="block text-secondary">Numéro de téléphone</label>
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
                <div>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <span className='text-secondary'>
                            J'accepte la <Link to="/privacyPolicy" className="text-secondary underline">politique de confidentialité</Link>
                        </span>
                    </label>
                    {errors.consent && (
                        <p className="text-xs text-tertiary mt-1">{errors.consent}</p>
                    )}
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-500">{message}</p>}
                <div>
                    <Button type="submit" className="w-full flex justify-center py-2 px-4">
                        Inscrivez-vous
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
