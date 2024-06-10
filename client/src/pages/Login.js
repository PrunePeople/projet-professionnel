import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from "../components/Button";

const Login = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "L'email est requis.";
        }
        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis.';
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
            const response = await axios.post('http://localhost:3001/api/login', formData);
            setMessage('Connexion réussie');
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            onSuccess();
        } catch (error) {
            setError(error.response?.data?.error || 'Erreur lors de la connexion');
        }
    };

    return (
        <div>
            <h2 className="text-2xl text-secondary font-bold mb-6">Connexion</h2>
            <p className="text-sm text-secondary mb-4">Pas encore inscrit ? <Link to="/signup" className="text-secondary hover:text-tertiary underline">Inscrivez-vous</Link></p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-secondary">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-secondary rounded-md shadow-sm focus:outline-none focus:border-secondary sm:text-sm"
                    />
                    {errors.email && (
                        <p className="text-xs text-tertiary mt-1">{errors.email}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="password" className="block text-secondary">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-secondary rounded-md shadow-sm focus:outline-none focus:border-secondary sm:text-sm"
                    />
                    {errors.password && (
                        <p className="text-xs text-tertiary mt-1">{errors.password}</p>
                    )}
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-500">{message}</p>}
                <div>
                    <Button type="submit" className="w-full flex justify-center py-2 px-4">
                        Connexion
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
