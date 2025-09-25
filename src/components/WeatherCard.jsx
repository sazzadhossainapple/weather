export default function WeatherCard({ weather }) {
    const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    return (
        <div className="bg-purple-800/40 p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-lg font-medium">
                {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-sm mb-2">
                {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </p>

            <div className="flex justify-center items-center gap-4">
                <img src={icon} alt="weather icon" className="w-16 h-16" />
                <p className="text-6xl font-bold">
                    {Math.round(weather.main.temp)}°
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
                <div className="bg-purple-900/40 p-3 rounded-xl">
                    Feels like: {Math.round(weather.main.feels_like)}°
                </div>
                <div className="bg-purple-900/40 p-3 rounded-xl">
                    Humidity: {weather.main.humidity}%
                </div>
                <div className="bg-purple-900/40 p-3 rounded-xl">
                    Wind: {Math.round(weather.wind.speed)} km/h
                </div>
                <div className="bg-purple-900/40 p-3 rounded-xl">
                    Pressure: {weather.main.pressure} hPa
                </div>
            </div>
        </div>
    );
}
