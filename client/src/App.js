import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/HomePage";
import Contact from "./pages/ContactPage";
import Menu from "./pages/MenuPage";
import Reservation from "./pages/ReservationPage";
import About from "./pages/AboutPage";
import Gallery from "./pages/GalleryPage";
import PrivacyPolicy from "./pages/legalPages/PrivacyPolicy";
import LegalNotice from "./pages/legalPages/LegalNotice";
import TermsAndConditions from "./pages/legalPages/TermsAndConditions";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserDashboard from "./pages/dashboard/UserDashboard";
import { ThemeProvider } from "./context/ThemeContext";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!token || !user) {
            navigate('/login');
        }
    }, [token, user, navigate]);

    return token && user ? children : null;
};

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
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin" element={<Navigate to="/adminJS" />} />
                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <UserDashboard />
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
