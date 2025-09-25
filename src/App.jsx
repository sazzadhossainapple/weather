import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherStats from './components/WeatherStats';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { fetchWeatherData, fetchForecastData } from './services/weatherApi';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (city) => {
        if (!city.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const [currentWeather, forecast] = await Promise.all([
                fetchWeatherData(city),
                fetchForecastData(city),
            ]);

            setWeatherData(currentWeather);
            setForecastData(forecast);
        } catch (err) {
            setError(err.message || 'Failed to fetch weather data');
            setWeatherData(null);
            setForecastData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSearch('Berlin');
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <header className="text-center mb-8">
                    <h1 className="text-2xl font-light mb-2">Weather Now</h1>
                    <p className="text-gray-400 text-sm">
                        How's the sky looking today?
                    </p>
                </header>

                <SearchBar onSearch={handleSearch} />

                {loading && <LoadingSpinner />}
                {error && <ErrorMessage message={error} />}

                {!loading && !error && weatherData && (
                    <div className="max-w-4xl mx-auto">
                        <CurrentWeather data={weatherData} />
                        <WeatherStats data={weatherData} />
                        <Forecast data={forecastData} />
                    </div>
                )}

                {!loading && !error && !weatherData && (
                    <div className="text-center py-12">
                        <p className="text-gray-400">
                            Search for a city to see weather information
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
