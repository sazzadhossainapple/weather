import axios from 'axios';

const API_KEY = '9d729cfd40c256defac28e6a8266b774';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const getCurrentWeather = async (city) => {
    const res = await axios.get(`${import.meta.env.VITE_API_KEY_URL}weather`, {
        params: {
            q: city,
            appid: import.meta.env.VITE_API_KEY_WEATHER,
            units: 'metric',
        },
    });
    return res.data;
};

export const getForecast = async (city) => {
    const res = await axios.get(`${import.meta.env.VITE_API_KEY_URL}forecast`, {
        params: {
            q: city,
            appid: import.meta.env.VITE_API_KEY_WEATHER,
            units: 'metric',
        },
    });
    return res.data;
};
