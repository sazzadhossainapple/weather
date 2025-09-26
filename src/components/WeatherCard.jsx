import DailyForecast from './DailyForecast';

export default function WeatherCard({ weather, forecast }) {
    const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    if (!weather) return null;

    return (
        <div>
            <div className="bg-gradient-to-br from-[#2563EB] to-[#9333EA] p-6 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                        {weather.name}, {weather.sys.country}
                    </h2>
                    <span>📍</span>
                </div>
                <p className="text-sm mb-2 font-normal text-[#DBEAFE]">
                    {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
                <div>
                    <img src={icon} alt="weather icon" className="w-6 h-6" />
                </div>

                <div className="flex justify-end items-center">
                    <p className="text-6xl font-normal">
                        {Math.round(weather.main.temp)}°
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-[#1F293780] p-4 rounded-xl flex flex-col gap-1">
                    <p className="text-sm text-[#9CA3AF]"> Feels like</p>
                    <p className="text-[20px] font-normal">
                        {Math.round(weather.main.feels_like)}°
                    </p>
                </div>
                <div className="bg-[#1F293780] p-4 rounded-xl flex flex-col gap-1">
                    <p className="text-sm text-[#9CA3AF]"> Humidity</p>
                    <p className="text-[20px] font-normal">
                        {weather.main.humidity}%
                    </p>
                </div>
                <div className="bg-[#1F293780] p-4 rounded-xl flex flex-col gap-1">
                    <p className="text-sm text-[#9CA3AF]"> Wind</p>
                    <p className="text-[20px] font-normal">
                        {Math.round(weather.wind.speed)} km/h
                    </p>
                </div>
                <div className="bg-[#1F293780] p-4 rounded-xl flex flex-col gap-1">
                    <p className="text-sm text-[#9CA3AF]"> Pressure</p>
                    <p className="text-[20px] font-normal">
                        {weather.main.pressure} hPa
                    </p>
                </div>
            </div>
            <div className="mt-6">
                <DailyForecast forecast={forecast} />
            </div>
        </div>
    );
}
