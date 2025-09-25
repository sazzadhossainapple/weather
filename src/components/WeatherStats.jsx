const WeatherStats = ({ data }) => {
    const { main, wind } = data;

    const stats = [
        { label: 'Humidity', value: `${main.humidity}%` },
        { label: 'Wind', value: `${wind.speed} m/s` },
        { label: 'Precipitation', value: '0 mm' }, // OpenWeatherMap doesn't provide precipitation in current weather
    ];

    return (
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
            <table className="w-full">
                <thead>
                    <tr className="text-left text-gray-400 text-sm">
                        <th className="pb-2 font-normal">Particle</th>
                        <th className="pb-2 font-normal">Humidity</th>
                        <th className="pb-2 font-normal">Wind</th>
                        <th className="pb-2 font-normal">Precipitation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-white">
                        <td className="py-2"></td>
                        <td className="py-2">{main.humidity}%</td>
                        <td className="py-2">{wind.speed} m/s</td>
                        <td className="py-2">0 mm</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default WeatherStats;
