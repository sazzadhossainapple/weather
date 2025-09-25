const Forecast = ({ data }) => {
    if (!data || !data.list) return null;

    // Get daily forecast (group by day)
    const dailyForecast = {};
    data.list.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });

        if (!dailyForecast[day]) {
            dailyForecast[day] = {
                temp: Math.round(item.main.temp),
                icon: item.weather[0].icon,
                description: item.weather[0].description,
            };
        }
    });

    // Get hourly forecast for today
    const today = new Date().toDateString();
    const hourlyForecast = data.list
        .filter((item) => new Date(item.dt * 1000).toDateString() === today)
        .slice(0, 7);

    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const currentDay = new Date().getDay();

    // Generate next 7 days starting from tomorrow
    const next7Days = [];
    for (let i = 1; i <= 7; i++) {
        const nextDayIndex = (currentDay + i) % 7;
        next7Days.push(days[nextDayIndex]);
    }

    return (
        <div>
            {/* Daily Forecast */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
                <h3 className="text-lg font-normal mb-4">Daily forecast</h3>
                <div className="space-y-3">
                    {next7Days.map((day, index) => {
                        const forecast = dailyForecast[day] || {
                            temp: '--',
                            icon: '01d',
                            description: 'clear sky',
                        };
                        return (
                            <div
                                key={index}
                                className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0"
                            >
                                <span className="text-gray-300">
                                    {day.substring(0, 3)}
                                </span>
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={`https://openweathermap.org/img/wn/${forecast.icon}.png`}
                                        alt={forecast.description}
                                        className="w-8 h-8"
                                    />
                                    <span className="text-white">
                                        {forecast.temp}°
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Hourly Forecast */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
                <h3 className="text-lg font-normal mb-4">Hourly forecast</h3>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
                    {hourlyForecast.map((item, index) => {
                        const time = new Date(item.dt * 1000);
                        const hour = time.getHours();
                        const displayTime =
                            hour === 0
                                ? '12 AM'
                                : hour < 12
                                ? `${hour} AM`
                                : hour === 12
                                ? '12 PM'
                                : `${hour - 12} PM`;

                        return (
                            <div key={index} className="text-center">
                                <p className="text-gray-400 text-sm mb-2">
                                    {displayTime}
                                </p>
                                <img
                                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                    alt={item.weather[0].description}
                                    className="w-10 h-10 mx-auto mb-2"
                                />
                                <p className="text-white font-medium">
                                    {Math.round(item.main.temp)}°
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Links Section */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-normal mb-4">Links</h3>
                <div className="text-blue-400 space-y-2">
                    <p className="cursor-pointer hover:text-blue-300">Source</p>
                    <p className="cursor-pointer hover:text-blue-300">
                        Tuesday
                    </p>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <span>20°</span>
                        <span>20°</span>
                        <span>19°</span>
                        <span>18°</span>
                        <span>17°</span>
                        <span>17°</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forecast;
