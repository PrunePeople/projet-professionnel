import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/HomePage';
import Contact from './pages/ContactPage';
import Menu from './pages/MenuPage';
import Reservation from './pages/ReservationPage';
import About from './pages/AboutPage';
import Gallery from './pages/GalleryPage';
import PrivacyPolicy from './pages/legalPages/PrivacyPolicy';
import LegalNotice from './pages/legalPages/LegalNotice';
import TermsAndConditions from './pages/legalPages/TermsAndConditions';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import UserDashboard from './pages/dashboard/UserDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import { ThemeProvider } from './context/ThemeContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    // Utilisation du hook useNavigate pour la navigation programmée
    const navigate = useNavigate();
    
    // Récupère le token JWT stocké dans le localStorage
    const token = localStorage.getItem('token');
    
    // Récupère les informations de l'utilisateur stockées dans le localStorage et les parse en objet
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
  
    // useEffect est utilisé pour exécuter du code après le rendu du composant
    useEffect(() => {
      // Si le token n'existe pas, ou si l'utilisateur n'existe pas,
      // ou si un rôle est requis et que le rôle de l'utilisateur ne correspond pas à ce rôle requis
      if (!token || !user || (requiredRole && user.role !== requiredRole)) {
        // Redirige vers la page de connexion
        navigate('/login');
      }
    }, [token, user, requiredRole, navigate]);
  
    // Si le token et l'utilisateur existent et si aucun rôle spécifique n'est requis,
    // ou si le rôle de l'utilisateur correspond au rôle requis, alors rend les enfants (composants protégés)
    return token && user && (!requiredRole || user.role === requiredRole) ? children : null;
  };
  

// Composant principal de l'application
const App = () => {
    return (
        <ThemeProvider>
            <Router>
                <div className="relative">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/reservation" element={<Reservation />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/legalnotice" element={<LegalNotice />} />
                        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                        <Route path="/termsandconditions" element={<TermsAndConditions />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login onSuccess={() => window.location.reload()} />} />
                        <Route path="/user-dashboard" element={
                            <ProtectedRoute>
                                <UserDashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin-dashboard" element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminDashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
