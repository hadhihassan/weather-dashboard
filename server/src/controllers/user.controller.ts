import { Response } from 'express';
import User from '../models/user.models';
import { AuthRequest } from '../middleware/auth';
import { NotFoundError, ValidationError } from '../errors/AppError';

// Get user profile
export const getProfile = async (req: AuthRequest, res: Response) => {
    const user = await User.findById(req.user!._id).select('-password');

    if (!user) {
        throw new NotFoundError('User profile not found');
    }

    res.json(user);
}

// Add city to favorites
export const addFavorites = async (req: AuthRequest, res: Response) => {
    const { city } = req.body;

    if (!city) {
        throw new ValidationError('City is required')
    }

    const user = await User.findById(req.user!._id);
    if (!user) {
        throw new ValidationError('User not found')
    }

    if (user.favoriteCities.includes(city)) {
        throw new ValidationError('City already in favorites')
    }

    user.favoriteCities.push(city);
    await user.save();

    res.json({
        message: 'City added to database',
        favoriteCities: user.favoriteCities
    });
};

// Remove city from favorites
export const removeFavorites = async (req: AuthRequest, res: Response) => {
    const { city } = req.params;

    const result = await User.findByIdAndUpdate(
        req.user!._id,
        { $pull: { favoriteCities: city } },
        {
            new: true,
        }
    );

    if (!result) {
        throw new Error('User not found');
    }


    res.json({
        message: 'City removed from favorites',
        favoriteCities: result.favoriteCities
    });
};

// Get favorite cities
export const getFavorites = async (req: AuthRequest, res: Response) => {

    const user = await User.findById(req.user!._id).select('favoriteCities');

    if (!user) {
        throw new ValidationError('User not found')
    }

    res.json({ favoriteCities: user.favoriteCities });
};