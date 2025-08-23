import React from "react";
import type { WeatherData } from "../types/weather";
import { getWeatherIcon } from "../services/api";

interface WeatherCardProps {
  weather: WeatherData;
  onRemove: () => void;
  onAdd: (city: string) => void;
  cities: string[];
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  onRemove,
  onAdd,
  cities,
}) => {
  const normalizedCity = weather.city.toLowerCase();
  const isFavorite = cities.includes(normalizedCity);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden relative">
      <button
        onClick={onRemove}
        className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xl font-bold"
        aria-label={`Remove ${weather.city}`}
      >
        ×
      </button>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {weather.city}, {weather.country}
            </h2>
            <p className="text-gray-500 capitalize">{weather.description}</p>
          </div>
          <img
            src={getWeatherIcon(weather.icon)}
            alt={weather.description}
            className="w-16 h-16 filter drop-shadow-xl"
          />
        </div>

        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-blue-600">
            {Math.round(weather.temperature)}°C
          </div>
          <p className="text-gray-500">
            Feels like {Math.round(weather.feelsLike)}°C
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-500">Humidity</p>
            <p className="font-semibold">{weather.humidity}%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-500">Wind Speed</p>
            <p className="font-semibold">{weather.windSpeed} m/s</p>
          </div>
        </div>

        <div className="flex justify-between items-center text-center mt-4">
          <p className="text-xs text-gray-400">
            Updated: {new Date(weather.timestamp).toLocaleTimeString()}
          </p>
          {isFavorite ? (
            <button
              className="text-sm font-semibold bg-gray-200 rounded-md border py-1.5 px-4 text-gray-500 cursor-not-allowed"
              disabled
            >
              Added
            </button>
          ) : (
            <button
              onClick={() => onAdd(weather.city.toLocaleLowerCase())}
              className="text-sm font-semibold bg-blue-500 text-white rounded-md py-1.5 px-4 hover:bg-blue-600"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
