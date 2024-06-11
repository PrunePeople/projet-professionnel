import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Tableau de Bord Admin</h2>
                <p className="text-center">Bienvenue sur le tableau de bord admin. Vous avez un accès complet au système.</p>
                <div className="text-center mt-6">
                    <Link to="/back-office">
                        <Button className="px-4 py-2 rounded">
                            Aller vers mon back-office
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
