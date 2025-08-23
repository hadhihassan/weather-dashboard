export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export interface UserPreferences {
  preferredCities: string[];
  units: 'metric' | 'imperial';
}

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  timestamp: Date;
}

export interface ForecastItem {
  date: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export interface ForecastData {
  city: string;
  country: string;
  forecasts: ForecastItem[];
  timestamp: Date;
}