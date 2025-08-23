import React from 'react';
import type { ForecastData } from '../types/weather';
import { getWeatherIcon } from '../services/api';
import { formatDate } from '../utils/dateUtils';

interface ForecastListProps {
  forecast: ForecastData;
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast }) => {

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">
          5-Day Forecast for {forecast.city}, {forecast.country}
        </h3>
        <span className="text-sm text-gray-500">
          Updated: {new Date(forecast.timestamp).toLocaleString()}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {forecast.forecasts.map((day, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="font-semibold text-gray-700 mb-2">{formatDate(day.date)}</p>
            <img 
              src={getWeatherIcon(day.icon)} 
              alt={day.description}
              className="mx-auto w-12 h-12 mb-2 filter drop-shadow-lg"
            />
            <p className="text-lg font-bold text-blue-600 mb-1">
              {Math.round(day.temperature)}°C
            </p>
            <p className="text-sm text-gray-500 capitalize mb-2">{day.description}</p>
            
            <div className="text-xs text-gray-600 space-y-1">
              <p>Feels like: {Math.round(day.feelsLike)}°C</p>
              <p>Humidity: {day.humidity}%</p>
              <p>Wind: {day.windSpeed} m/s</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastList;