import express from 'express';
import { authenticate } from '../middleware/auth';
import { addFavorites, getFavorites, getProfile, removeFavorites } from '../controllers/user.controller';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

// Apply authentication middleware to all user routes
router.use(authenticate);

// Get user profile
router.get('/profile', asyncHandler(getProfile));

// Add city to favorites
router.post('/favorites', asyncHandler(addFavorites));

// Remove city from favorites
router.delete('/favorites/:city', asyncHandler(removeFavorites));

// Get favorite cities
router.get('/favorites', asyncHandler(getFavorites));

export default router;