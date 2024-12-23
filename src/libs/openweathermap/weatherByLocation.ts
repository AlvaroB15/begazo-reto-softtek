import axios from "axios";
import {WeatherData} from "../../models/Weather";
import * as process from "node:process";

export const getWeatherByLocation = async (lat: number, lon: number): Promise<WeatherData> => {
    const apiKey = process.env.WEATHER_API_KEY;
    console.log(apiKey);
    const baseUrl = "https://api.openweathermap.org/data/2.5";
    console.log("Data antes de axios");
    console.log(`${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    try {
        const response = await axios.get(
            `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        return {
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            description: response.data.weather[0].description
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};
