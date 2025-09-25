const API_KEY = '9d729cfd40c256defac28e6a8266b774';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city) => {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(
                    'City not found. Please check the spelling and try again.'
                );
            } else {
                throw new Error(
                    'Failed to fetch weather data. Please try again.'
                );
            }
        }

        return await response.json();
    } catch (error) {
        if (error.message.includes('Failed to fetch')) {
            throw new Error(
                'Network error. Please check your connection and try again.'
            );
        }
        throw error;
    }
};

export const fetchForecastData = async (city) => {
    try {
        const response = await fetch(
            `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch forecast data.');
        }

        return await response.json();
    } catch (error) {
        if (error.message.includes('Failed to fetch')) {
            throw new Error(
                'Network error. Please check your connection and try again.'
            );
        }
        throw error;
    }
};
