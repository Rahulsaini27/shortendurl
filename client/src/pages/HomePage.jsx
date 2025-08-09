import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For admin link
import UrlForm from '../components/UrlForm';
import ShortenedUrlDisplay from '../components/ShortenedUrlDisplay';

function HomePage() {
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (originalUrl) => {
        setLoading(true);
        setError(null);
        setShortenedUrl('');
        try {
            const apiUrl = import.meta.env.VITE_API_URL;

            const response = await fetch(`${apiUrl}/api/shorten`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ originalUrl }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to shorten URL. Please try again.');
            }

            const data = await response.json();
            setShortenedUrl(data.shortUrl);
        } catch (err) {
            console.error('Error shortening URL:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-xl w-full p-8 bg-white rounded-lg shadow-lg border border-slate-200 space-y-8 animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-center flex-grow text-4xl font-bold text-slate-800">URL Shortener</h1>
                    <Link to="/admin" className="text-slate-600 hover:text-slate-800 text-sm font-semibold hover:underline transition-colors duration-200">
                        Admin
                    </Link>
                </div>
                <UrlForm onSubmit={handleSubmit} loading={loading} />
                {loading && (
                    <div className="flex justify-center items-center py-4">
                        <svg className="animate-spin h-8 w-8 text-slate-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="ml-3 text-lg text-slate-600">Shortening URL...</p>
                    </div>
                )}
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 text-center font-medium">{error}</p>
                    </div>
                )}
                {shortenedUrl && <ShortenedUrlDisplay shortUrl={shortenedUrl} />}
            </div>
        </div>
    );
}

export default HomePage;