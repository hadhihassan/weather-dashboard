import axios from "../config/axios";

export const fetchFullWeather = async (city: string) => {
  const { data } = await axios.get(`/weather/full/${city}`);
  return data;
};

export const fetchAddedFullWeathers = async () => {
  const { data } = await axios.get(`/weather/addedWeathersFull`);
  return data;
};

export const removeCity = async (city: string) => {
  const { data } = await axios.delete(`/user/favorites/${city.toLowerCase()}`);
  return data
};

export const getWeatherIcon = (iconCode: string) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};