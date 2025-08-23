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

export interface ForecastData {
  city: string;
  country: string;
  forecasts: ForecastDay[];
  timestamp: Date;
}

export interface ForecastDay {
  date: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}