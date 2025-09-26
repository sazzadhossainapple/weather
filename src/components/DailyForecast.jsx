const DailyForecast = ({ forecast }) => {
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
        <div>
            <h3 className="text-lg font-semibold mb-4">Daily forecast</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {days.map(([day, items]) => {
                    const temps = items.map((i) => i.main.temp);
                    const min = Math.round(Math.min(...temps));
                    const max = Math.round(Math.max(...temps));
                    const icon = items[0].weather[0].icon;
                    return (
                        <div
                            key={day}
                            className="bg-[#1F293780] p-4 rounded-xl text-center w-full"
                        >
                            <p className="text-[#9CA3AF] font-normal text-sm mb-2">
                                {day}
                            </p>
                            <img
                                src={`https://openweathermap.org/img/wn/${icon}.png`}
                                alt="icon"
                                className="mx-auto h-8 w-8"
                            />
                            <p className="mt-2 font-normal">{max}°</p>
                            <p className="text-sm text-[#9CA3AF]">{min}°</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DailyForecast;
