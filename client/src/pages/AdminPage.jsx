import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUrls = async () => {
            setLoading(true);
            setError(null);
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await fetch(`${apiUrl}/api/urls`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                });

                if (response.status === 401) {
                    logout();
                    navigate('/login');
                    return;
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch URLs');
                }
                const data = await response.json();
                setUrls(data);
            } catch (err) {
                console.error('Error fetching admin data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.token) {
            fetchUrls();
        }
    }, [user, logout, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6 md:p-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                                Admin Dashboard
                            </h1>
                            <p className="text-slate-600 mt-2">Monitor and manage your shortened URLs</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="group relative px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-out"
                        >
                            <span className="relative z-10">Sign Out</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
                    {loading && (
                        <div className="flex flex-col justify-center items-center py-16">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-slate-500 rounded-full animate-spin animation-delay-150"></div>
                            </div>
                            <p className="mt-6 text-lg text-slate-600 font-medium">Loading your URLs...</p>
                        </div>
                    )}

                    {error && (
                        <div className="m-8 p-6 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-800 font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    {!loading && !error && urls.length === 0 && (
                        <div className="flex flex-col items-center py-16 px-8">
                            <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">No URLs Yet</h3>
                            <p className="text-slate-500 text-center">Start creating shortened URLs to see them here</p>
                        </div>
                    )}

                    {!loading && !error && urls.length > 0 && (
                        <div className="overflow-hidden">
                            {/* Stats Bar */}
                            <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-200">Total URLs</p>
                                        <p className="text-2xl font-bold">{urls.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-200">Total Visits</p>
                                        <p className="text-2xl font-bold">{urls.reduce((sum, url) => sum + url.visits, 0)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Original URL</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Short URL</th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Visits</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Created</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Updated</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {urls.map((url, index) => (
                                            <tr 
                                                key={url._id} 
                                                className="group hover:bg-slate-50 transition-colors duration-200"
                                                style={{ animationDelay: `${index * 50}ms` }}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-lg flex items-center justify-center mr-3">
                                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <a
                                                                href={url.originalUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-slate-900 hover:text-slate-600 font-medium transition-colors duration-200 hover:underline"
                                                            >
                                                                {url.originalUrl.length > 50 
                                                                    ? `${url.originalUrl.substring(0, 47)}...` 
                                                                    : url.originalUrl
                                                                }
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <a
                                                        href={`${import.meta.env.VITE_API_URL}/${url.shortCode}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-mono rounded-full transition-colors duration-200 hover:underline"
                                                    >
                                                        {`${import.meta.env.VITE_API_URL}/${url.shortCode}`}
                                                    </a>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-800 text-sm font-semibold rounded-full">
                                                        {url.visits}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600 text-sm">
                                                    {new Date(url.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-slate-600 text-sm">
                                                    {new Date(url.updatedAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminPage;