import React, { useState } from 'react';

function UrlForm({ onSubmit, loading }) {
    const [url, setUrl] = useState('');
    const [focused, setFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (url.trim()) {
            onSubmit(url);
        }
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const urlIsValid = url === '' || isValidUrl(url);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* URL Input */}
            <div className="space-y-2">
                <label htmlFor="url" className="block text-slate-700 text-sm font-medium">
                    Enter URL to shorten
                </label>
                <div className="relative">
                    {/* URL Icon */}
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className={`w-5 h-5 transition-colors duration-200 ${focused ? 'text-slate-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>

                    {/* Input Field */}
                    <input
                        id="url"
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder="https://example.com/very-long-url"
                        required
                        disabled={loading}
                        className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-300 ${
                            focused 
                                ? 'border-slate-400 shadow-md ring-1 ring-slate-200' 
                                : urlIsValid 
                                    ? 'border-slate-200' 
                                    : 'border-red-300'
                        } disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50`}
                    />

                    {/* Status Indicator */}
                    {url && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                            {urlIsValid ? (
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {url && !urlIsValid && (
                    <p className="text-red-600 text-sm flex items-center mt-2">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Please enter a valid URL
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading || !urlIsValid || !url.trim()}
                className="group relative w-full py-4 px-6 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-300 ease-out overflow-hidden"
            >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Button Content */}
                <span className="relative z-10 flex items-center justify-center">
                    {loading ? (
                        <>
                            <div className="relative mr-3">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            </div>
                            <span>Creating Short Link...</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>Shorten URL</span>
                        </>
                    )}
                </span>

                {/* Shine Effect */}
                <div className="absolute inset-0 -top-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            </button>

            {/* Helper Text */}
            <div className="text-center">
                <p className="text-slate-600 text-sm">
                    Enter any long URL and we'll create a short, shareable link for you
                </p>
            </div>
        </form>
    );
}

export default UrlForm;