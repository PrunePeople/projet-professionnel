import React, { useState, useEffect } from 'react';
import { FaUserEdit, FaClipboardList, FaKey, FaSignOutAlt, FaChevronRight, FaInfoCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import Button from '../../components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', phone: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        firstName: parsedUser.first_name,
        lastName: parsedUser.last_name,
        email: parsedUser.email,
        phone: parsedUser.phone,
      });
    }
  }, []);

   // Fonction pour gérer la déconnexion
   const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const validatePassword = (password) => {
    let errors = {};
    if (password.length < 8) {
      errors = 'Le mot de passe doit contenir au moins 8 caractères.';
    }
    if (!/[A-Z]/.test(password)) {
      errors += ' Doit contenir au moins une lettre majuscule.';
    }
    if (!/[a-z]/.test(password)) {
      errors += ' Doit contenir au moins une lettre minuscule.';
    }
    if (!/[0-9]/.test(password)) {
      errors += ' Doit contenir au moins un chiffre.';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors += ' Doit contenir au moins un caractère spécial.';
    }
    return errors;
  };

  const handlePasswordChange = async () => {
    // Réinitialisez les erreurs spécifiques au changement de mot de passe
    setErrors(prevErrors => ({
      ...prevErrors,
      currentPassword: '',
      server: ''
    }));
  
    // Validez le nouveau mot de passe avant d'envoyer la requête
    const validationErrors = validatePassword(newPassword);
    if (validationErrors.length > 0) {
      setErrors({ newPassword: validationErrors });
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: 'Les nouveaux mots de passe ne correspondent pas.' });
      return;
    }
  
    // Tentez de changer le mot de passe
    try {
      const response = await fetch('http://localhost:3001/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        if (data.error === 'Current password is incorrect') {
          setErrors({ currentPassword: 'Le mot de passe actuel est incorrect.' });
        } else {
          throw new Error(data.error || 'Une erreur est survenue.');
        }
        return;
      }
  
      // Réinitialisez les champs et les erreurs après la réussite de la mise à jour
      toast.success('Mot de passe mis à jour avec succès.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrors({});
      setIsPasswordOpen(false);
    } catch (error) {
      setErrors({ server: error.message });
    }
  };
  
  // Cette fonction reste la même pour la gestion des changements de champ et des erreurs dynamiques.
  const handleFieldChange = (setter, field, value) => {
    setter(value);
    // Nettoie les erreurs au fur et à mesure que l'utilisateur tape
    setErrors(prev => ({ ...prev, [field]: '' }));
  };
  

  return (
    <div className="min-h-screen p-4 flex flex-col items-center mt-24">
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="shadow-lg rounded-lg w-full max-w-2xl p-6 space-y-6">
        <h2 className="text-3xl text-secondary font-semibold text-center text-primary">{`${user.firstName} ${user.lastName}`}</h2>

        <div className="space-y-4">
          <div className="bg-white text-secondary shadow rounded-lg p-4 hover:scale-105">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <div className="flex items-center space-x-4">
                <span className="text-xl"><FaUserEdit /></span>
                <span>Mon profil</span>
              </div>
              <FaChevronRight className={`text-xl transition-transform ${isProfileOpen ? 'rotate-90' : ''}`} />
            </div>
            {isProfileOpen && (
              <div className="mt-4 space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium">Prénom</label>
                  <p className="mt-1 block w-full p-2 border border-secondary rounded-md bg-gray-100">{user.firstName}</p>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium">Nom de famille</label>
                  <p className="mt-1 block w-full p-2 border border-secondary rounded-md bg-gray-100">{user.lastName}</p>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium">Email</label>
                  <p className="mt-1 block w-full p-2 border border-secondary rounded-md bg-gray-100">{user.email}</p>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium">Numéro de téléphone</label>
                  <p className="mt-1 block w-full p-2 border border-secondary rounded-md bg-gray-100">{user.phone}</p>
                </div>
              </div>
            )}
          </div>
          <MenuItem
            to="/mes-reservations"
            icon={<FaClipboardList />}
            text="Voir mes réservations"
          />
          <div className="bg-white text-secondary shadow rounded-lg p-4 hover:scale-105">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsPasswordOpen(!isPasswordOpen)}>
              <div className="flex items-center space-x-4">
                <span className="text-xl"><FaKey /></span>
                <span>Changer mon mot de passe</span>
              </div>
              <FaChevronRight className={`text-xl transition-transform ${isPasswordOpen ? 'rotate-90' : ''}`} />
            </div>
            {isPasswordOpen && (
              <div className="mt-4 space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium">Mot de passe actuel</label>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name='password'
                    id='password'
                    className="mt-1 block w-full p-2 border border-secondary rounded-md"
                    value={currentPassword}
                    onChange={(e) => handleFieldChange(setCurrentPassword, 'currentPassword', e.target.value)}
                    placeholder='Mot de passe actuel'
                  />
                  <span onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute right-3 top-8 cursor-pointer text-3xl hover:text-tertiary">
                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errors.currentPassword && (
                    <p className="text-xs text-tertiary mt-1">{errors.currentPassword}</p>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium flex items-center">
                    Nouveau mot de passe
                    <FaInfoCircle
                      data-tooltip-id="password-info"
                      data-tooltip-content="Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."
                      className="ml-2 text-secondary cursor-pointer hover:text-tertiary"
                    />
                    <Tooltip id="password-info" place="top" effect="solid" />
                  </label>
                  <input
                    type={isNewPasswordVisible ? "text" : "password"}
                    name='newPassword'
                    id='newPassword'
                    className="mt-1 block w-full p-2 border border-secondary rounded-md"
                    value={newPassword}
                    onChange={(e) => handleFieldChange(setNewPassword, 'newPassword', e.target.value)}
                    placeholder='Nouveau mot de passe'
                  />
                  <span onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)} className="absolute right-3 top-8 cursor-pointer text-3xl hover:text-tertiary">
                    {isNewPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errors.newPassword && (
                    <p className="text-xs text-tertiary mt-1">{errors.newPassword}</p>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium">Répéter le nouveau mot de passe</label>
                  <input
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    name='repeatNewPassword'
                    id='repeatNewPassword'
                    className="mt-1 block w-full p-2 border border-secondary rounded-md"
                    value={confirmPassword}
                    onChange={(e) => handleFieldChange(setConfirmPassword, 'confirmPassword', e.target.value)}
                    placeholder='Répéter le nouveau mot de passe'
                  />
                  <span onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} className="absolute right-3 top-8 cursor-pointer text-3xl hover:text-tertiary">
                    {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errors.confirmPassword && (
                    <p className="text-xs text-tertiary mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
                <Button
                  className="w-full p-2"
                  onClick={handlePasswordChange}
                >
                  Réinitialiser le mot de passe
                </Button>
                {errors.server && (
                  <p className="text-xs text-tertiary mt-1">{errors.server}</p>
                )}
              </div>
            )}
          </div>
          <MenuItem
            icon={<FaSignOutAlt />}
            text="Déconnexion"
            isTertiary
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ to, icon, text, isTertiary, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-4 rounded-lg border transition-transform transform hover:scale-105 ${isTertiary ? 'bg-tertiary text-primary hover:text-primary' : 'bg-white text-secondary shadow'}`}
    >
      <div className="flex items-center space-x-4">
        <span className="text-xl">{icon}</span>
        <span>{text}</span>
      </div>
      <FaChevronRight className="text-xl" />
    </div>
  );
};

export default UserDashboard;
