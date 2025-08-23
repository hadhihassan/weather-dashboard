import express from 'express';
import { login, register } from '../controllers/auth.controller';
import { asyncHandler } from '../middleware/asyncHandler';


const router = express.Router();

// Register
router.post('/register', asyncHandler(register));

// Login
router.post('/login', asyncHandler(login));

export default router;