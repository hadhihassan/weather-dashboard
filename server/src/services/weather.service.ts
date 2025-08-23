import axios from 'axios';
import cache from '../utils/cache.util';
import { ValidationError, InternalError } from '../errors/AppError';
import { ForecastData, ForecastItem, WeatherData } from '../types';
import dotenv from 'dotenv';
dotenv.config();


const WEATHER_TTL = 600;   // 10 minutes
const FORECAST_TTL = 7200; // 2 hour

const API_BASE = process.env.WEATHER_API_URL!;
const API_KEY = process.env.WEATHER_API_KEY!;

export const weatherService = {
  async getCurrentWeather(city: string): Promise<WeatherData> {

    const cacheKey = `current-${city.toLowerCase()}`;
    const cached = cache.get<WeatherData>(cacheKey);
    if (cached) return cached;

    try {
      const { data } = await axios.get(`${API_BASE}/weather`, {
        params: { q: city, appid: API_KEY, units: 'metric' }
      });

      const weatherData: WeatherData = {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        timestamp: new Date()
      };

      cache.set(cacheKey, weatherData, WEATHER_TTL);
      return weatherData;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new ValidationError(`${city} city not found`);
      }
      throw new InternalError('Failed to fetch current weather');
    }
  },

  async getForecast(city: string): Promise<ForecastData> {

    const cacheKey = `forecast-${city.toLowerCase()}`;
    const cached = cache.get<ForecastData>(cacheKey);
    if (cached) return cached;

    try {
      const { data } = await axios.get(`${API_BASE}/forecast`, {
        params: { q: city, appid: API_KEY, units: 'metric' }
      });

      const forecasts: ForecastItem[] = data.list
        .filter((item: any) => item.dt_txt.includes('12:00:00'))
        .map((item: any) => ({
          date: item.dt_txt,
          temperature: item.main.temp,
          feelsLike: item.main.feels_like,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
          description: item.weather[0].description,
          icon: item.weather[0].icon
        }));

      const forecastData: ForecastData = {
        city: data.city.name,
        country: data.city.country,
        forecasts,
        timestamp: new Date()
      };

      cache.set(cacheKey, forecastData, FORECAST_TTL);
      return forecastData;
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new ValidationError(`${city} city not found`);
      }
      throw new InternalError('Failed to fetch weather forecast');
    }
  }
};
