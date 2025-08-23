import mongoose from "mongoose";
import User from '../models/user.models';

export const connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/weather-dashboard')
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch(err => {
            console.error('MongoDB connection error:', err);
        });
}