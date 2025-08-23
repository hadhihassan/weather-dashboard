import User, { IUser } from '../models/user.models';
import { comparePassword, hashPassword } from '../utils/bcrypt.util';
import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt.util';
import { ValidationError } from '../errors/AppError';


// Register
export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const existingUser: IUser = await User.findOne({ email });

    if (existingUser) {
        throw new ValidationError('User already exists with this email or username')
    }

    const hashedPassword = await hashPassword(password);

    const user: IUser = new User({
        username,
        email,
        password: hashedPassword
    });

    await user.save();

    res.status(201).json({
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            favoriteCities: user.favoriteCities
        }
    });
};

// Login
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user: IUser = await User.findOne({ email });

    if (!user) {
        throw new ValidationError('Invalid credentials')
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new ValidationError('Invalid credentials, Passowrd is not same')
    }

    const token = generateToken(user._id)
    
    res.json({
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            favoriteCities: user.favoriteCities
        }
    });
};