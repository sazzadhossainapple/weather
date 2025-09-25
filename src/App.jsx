import { useState } from 'react';
import { getCurrentWeather, getForecast } from './api/weather';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';

export default function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // search city function
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!city) return;
        setLoading(true);
        setError('');
        try {
            const data = await getCurrentWeather(city);
            const forecastData = await getForecast(city);
            setWeather(data);
            setForecast(forecastData);
            setCity('');
        } catch (err) {
            setError('City not found');
            setWeather(null);
            setForecast(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-5xl p-6">
            <h1 className="text-2xl text-center mb-6 font-semibold">
                How’s the sky looking today?
            </h1>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex justify-center mb-6">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Search for a place..."
                    className="p-2 rounded-l-md w-64 text-white border-white border-2"
                />
                <button
                    type="submit"
                    className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700"
                >
                    Search
                </button>
            </form>

            {/* States */}
            {loading && <LoadingSpinner />}
            {error && <p className="text-center text-red-400">{error}</p>}
            {!weather && !loading && !error && (
                <p className="text-center">
                    Search for a city to see weather info
                </p>
            )}

            {/* Weather Data */}
            {weather && forecast && (
                <div className="space-y-6">
                    <WeatherCard weather={weather} />
                    <Forecast forecast={forecast} />
                </div>
            )}
        </div>
    );
}
