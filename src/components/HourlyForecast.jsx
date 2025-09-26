const HourlyForecast = ({ forecast }) => {
    return (
        <>
            {/* Hourly Forecast */}
            <div className="bg-[#1F293780] p-6 rounded-xl shadow-lg h-full">
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Hourly Forecast</h3>
                    <span className="bg-[#374151] border border-[#4B5563] px-2 py-1 rounded-md text-sm">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                        })}
                    </span>
                </div>
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
        </>
    );
};

export default HourlyForecast;
