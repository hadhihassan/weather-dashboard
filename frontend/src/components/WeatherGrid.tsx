import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCity, loadFullWeather } from "../redux/slices/weatherSlice";
import { addFavoriteCity, removeFavoriteCity } from "../redux/slices/authSlice";
import type { WeatherData } from "../types/weather";
import WeatherCard from "./WeatherCard";
import type { AppDispatch, RootState } from "../redux/store";
import { toast } from "sonner";

interface WeatherGridProps {
  weatherData: WeatherData[];
}

const WeatherGrid: React.FC<WeatherGridProps> = ({ weatherData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cities = useSelector(
    (state: RootState) => state.auth.user?.favoriteCities || []
  );

  const handleRemoveCity = (city: string) => {
    const normalized = city.toLowerCase();
    dispatch(removeCity(normalized));
    dispatch(removeFavoriteCity(normalized))
      .unwrap()
      .then(() => {
        toast.success(`${city} removed from favorites`);
      })
      .catch((err) => {
        toast.error(`Failed to remove ${city}: ${err}`);
      });
  };

  const handleAddCity = (city: string) => {
    const normalized = city.toLowerCase();
    dispatch(addFavoriteCity(normalized))
      .unwrap()
      .then(() => {
        dispatch(loadFullWeather(normalized));
        toast.success(`${city} added to favorites`);
      })
      .catch((err) => {
        toast.error(`Failed to add ${city}: ${err}`);
      });
  };

  if (weatherData.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <p className="text-gray-500 text-lg">
          No cities added yet. Search for a city to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {weatherData.map((weather) => (
        <WeatherCard
          key={weather.city}
          weather={weather}
          cities={cities}
          onAdd={handleAddCity}
          onRemove={() => handleRemoveCity(weather.city)}
        />
      ))}
    </div>
  );
};

export default WeatherGrid;
