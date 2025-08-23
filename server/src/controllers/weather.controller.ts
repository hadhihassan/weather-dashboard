import { Request, Response } from 'express';
import { ValidationError } from '../errors/AppError';
import { weatherService } from '../services/weather.service';
import User from '../models/user.models';
import { AuthRequest } from '../middleware/auth';

export const getFullWeather = async (req: Request, res: Response) => {
  const { city } = req.params;
  if (!city) {
    throw new ValidationError("City parameter is required");
  }

  const [currentWeather, forecast] = await Promise.all([
    weatherService.getCurrentWeather(city),
    weatherService.getForecast(city),
  ]);

  res.json({ currentWeather, forecast });
};

export const getAllFullWeathers = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user!._id).select("favoriteCities");
  if (!user || !user.favoriteCities.length) {
    throw new ValidationError("No cities added");
  }

  const results = await Promise.allSettled(
    user.favoriteCities.map(async (city) => {
      const [currentWeather, forecast] = await Promise.all([
        weatherService.getCurrentWeather(city),
        weatherService.getForecast(city),
      ]);
      return { city, currentWeather, forecast };
    })
  );

  const normalized = results
    .filter(r => r.status === "fulfilled")
    .map(r => (r as PromiseFulfilledResult<any>).value);

  res.json(normalized);
};
