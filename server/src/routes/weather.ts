import express from 'express';
import { getAllFullWeathers, getFullWeather } from '../controllers/weather.controller';
import { authenticate } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.use(authenticate);
// Get weather data for a specific city
router.get("/full/:city", asyncHandler(getFullWeather));
// Get all added weathers orecast with full details
router.get("/addedWeathersFull", asyncHandler(getAllFullWeathers));

export default router;