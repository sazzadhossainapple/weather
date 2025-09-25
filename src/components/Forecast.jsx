export default function Forecast({ forecast }) {
    const daily = {};
    forecast.list.forEach((item) => {
        const date = new Date(item.dt_txt).toLocaleDateString('en-US', {
            weekday: 'short',
        });
        if (!daily[date]) daily[date] = [];
        daily[date].push(item);
    });

    const days = Object.entries(daily).slice(0, 7);

 

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Daily Forecast */}
            <div className="bg-purple-800/40 p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold mb-4">7-Day Forecast</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                    {days.map(([day, items]) => {
                        const temps = items.map((i) => i.main.temp);
                        const min = Math.round(Math.min(...temps));
                        const max = Math.round(Math.max(...temps));
                        const icon = items[0].weather[0].icon;
                        return (
                            <div
                                key={day}
                                className="bg-purple-900/40 p-3 rounded-xl text-center"
                            >
                                <p>{day}</p>
                                <img
                                    src={`https://openweathermap.org/img/wn/${icon}.png`}
                                    alt="icon"
                                    className="mx-auto"
                                />
                                <p>
                                    {max}° / {min}°
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Hourly Forecast */}
            <div className="bg-purple-800/40 p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Hourly Forecast</h3>
                <div className="space-y-2">
                    {forecast.list.slice(0, 8).map((item) => (
                        <div
                            key={item.dt}
                            className="flex justify-between bg-purple-900/40 p-2 rounded-md"
                        >
                            <span>
                                {new Date(item.dt_txt).toLocaleTimeString(
                                    'en-US',
                                    {
                                        hour: 'numeric',
                                        hour12: true,
                                    }
                                )}
                            </span>
                            <div className="flex items-center gap-2">
                                <img
                                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                    alt="icon"
                                    className="w-6 h-6"
                                />
                                <span>{Math.round(item.main.temp)}°</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
