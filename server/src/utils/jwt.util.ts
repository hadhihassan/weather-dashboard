import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Generate token
export const generateToken = (userId: ObjectId): string => {
    return jwt.sign(
        { id: userId },
        JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// Verify token
export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
};
