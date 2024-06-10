import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserEdit, FaClipboardList, FaKey, FaEnvelope, FaCog, FaSignOutAlt, FaChevronRight } from 'react-icons/fa';

const UserDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center mt-24">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6 space-y-6">
                <h1 className="text-3xl font-semibold text-center text-gray-800">John Doe</h1>
                
                {/* Menu */}
                <div className="space-y-4">
                    <MenuItem
                        to="/edit-profile"
                        icon={<FaUserEdit />}
                        text="Éditer ton profil"
                    />
                    <MenuItem
                        to="/mes-reservations"
                        icon={<FaClipboardList />}
                        text="Voir mes réservations"
                    />
                    <MenuItem
                        to="/changer-mot-de-passe"
                        icon={<FaKey />}
                        text="Changer mon mot de passe"
                    />
                    <MenuItem
                        to="/changer-email"
                        icon={<FaEnvelope />}
                        text="Changer mon email"
                    />
                    <MenuItem
                        to="/parametres"
                        icon={<FaCog />}
                        text="Paramètres"
                    />
                    <MenuItem
                        to="/deconnexion"
                        icon={<FaSignOutAlt />}
                        text="Déconnexion"
                        isTertiary
                    />
                </div>
            </div>
        </div>
    );
};

const MenuItem = ({ to, icon, text, isTertiary }) => {
    return (
        <Link
            to={to}
            className={`flex items-center justify-between p-4 rounded-lg border transition-transform transform hover:scale-105 ${isTertiary ? 'bg-gray-200 text-gray-700' : 'bg-white text-gray-800 shadow'}`}
        >
            <div className="flex items-center space-x-4">
                <span className="text-xl">{icon}</span>
                <span>{text}</span>
            </div>
            <FaChevronRight className="text-xl" />
        </Link>
    );
};

export default UserDashboard;
