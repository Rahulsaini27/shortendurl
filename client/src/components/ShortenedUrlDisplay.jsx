import React from 'react';

function ShortenedUrlDisplay({ shortUrl }) {
    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl)
            .then(() => alert('Copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err));
    };

    return (
        <div className="bg-gradient-to-r from-slate-50 to-gray-100 border border-slate-200 text-slate-800 p-6 rounded-lg relative mt-8 shadow-sm animate-fade-in">
            <p className="font-semibold text-xl mb-3 text-center text-slate-700">Your shortened URL:</p>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-800 hover:underline break-all text-lg font-mono px-3 py-2 bg-white rounded-md border border-slate-200 shadow-sm flex-grow text-center transition-colors duration-200"
                >
                    {shortUrl}
                </a>
                <button
                    onClick={handleCopyToClipboard}
                    className="bg-slate-700 hover:bg-slate-800 text-white font-medium py-2.5 px-5 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200 transform hover:scale-105 shadow-sm"
                >
                    Copy URL
                </button>
            </div>
        </div>
    );
}

export default ShortenedUrlDisplay;