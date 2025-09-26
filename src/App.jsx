import { useState } from 'react';
import { getCurrentWeather, getForecast } from './api/weather';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import image from './asset/iocn/Frame.svg';
import searchIcon from './asset/iocn/searchIcon.svg';
import HourlyForecast from './components/HourlyForecast';

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
        <div className="w-container flex flex-col items-center justify-center text-white">
            <div className="flex justify-between items-center w-full mb-10">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-2xl">☀️</span>
                    <h2 className="font-semibold text-lg">Weather Today</h2>
                </div>

                {/* Unit Dropdown (top-right) */}
                <div className="">
                    <button className="px-3 py-1 bg-black/40 rounded-md text-sm">
                        ⚙️ Units ▼
                    </button>
                </div>
            </div>

            {/* Main Title */}
            <h1 className="text-xl sm:text-2xl text-center mb-6 font-normal">
                How’s the sky looking today?
            </h1>

            {/* Search Bar */}
            <form
                onSubmit={handleSearch}
                className="flex gap-2 w-full max-w-xl mb-6"
            >
                <div className="relative w-full">
                    <img
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                        src={searchIcon}
                        alt=""
                    />
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Search for a place..."
                        className="w-full flex-grow pl-9 pr-4 py-2 rounded-md bg-[#1F293780] border-[#4B5563B2] focus:outline-none text-white placeholder-[#757575]"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 px-5 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
                >
                    Search
                </button>
            </form>

            {/* States */}
            {loading && <LoadingSpinner />}
            {error && (
                <div className="w-full max-w-xl mb-4">
                    <p className="text-center text-red-500 bg-red-100 border border-red-400 rounded-md px-4 py-2">
                        {error} ❌
                    </p>
                </div>
            )}
            {!weather && !loading && !error && (
                <div className="flex flex-col items-center mt-8 text-gray-300">
                    <img src={image} alt="image" className="w-32 h-32" />
                    <p className="text-[#9CA3AF] font-normal mt-2">
                        Search for a city to see weather information
                    </p>
                </div>
            )}

            {/* Weather Data */}
            {weather && forecast && (
                <div className="w-full flex flex-col lg:flex-row gap-6">
                    <div className="flex-left">
                        <WeatherCard weather={weather} forecast={forecast} />
                    </div>
                    <div className="flex-right">
                        <HourlyForecast forecast={forecast} />
                    </div>
                </div>
            )}
        </div>
    );
}
