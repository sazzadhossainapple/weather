import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
            setQuery('');
        }
    };

    return (
        <div className="mb-8">
            <div className="text-center mb-4">
                <p className="text-gray-400 text-sm">Given the a place.</p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex max-w-md mx-auto mb-6"
            >
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a place"
                    className="flex-grow px-4 py-3 rounded-l-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    Search
                </button>
            </form>

            <div className="text-center">
                <p className="text-gray-400 text-sm">
                    Search for a city to see weather information
                </p>
            </div>
        </div>
    );
};

export default SearchBar;
