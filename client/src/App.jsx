import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Import useAuth
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

function App() {
    const { user, loading } = useAuth(); // Get user and loading state from context

    if (loading) {
        // Optional: A global loading spinner or message while checking local storage
        return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-700">Loading application...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/admin"
                    element={user ? <AdminPage /> : <Navigate to="/login" replace />} // Protect admin route
                />
                {/* The /:shortcode path is handled by the backend for redirection */}
            </Routes>
        </Router>
    );
}

export default App;