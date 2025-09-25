const CurrentWeather = ({ data }) => {
    const { name, sys, main, weather, dt } = data;
    const date = new Date(dt * 1000);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-normal">
                        {name}, {sys.country}
                    </h2>
                    <p className="text-gray-400 text-sm">Today April 2024</p>
                </div>
                <div className="text-right">
                    <p className="text-4xl font-light">
                        {Math.round(main.temp)}°
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <img
                    src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                    alt={weather[0].description}
                    className="w-16 h-16"
                />
                <p className="text-gray-300 capitalize text-lg">
                    {weather[0].description}
                </p>
            </div>
        </div>
    );
};

export default CurrentWeather;
