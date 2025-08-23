import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth';
import weatherRoutes from './routes/weather';
import userRoutes from './routes/user';
import { connectDB } from './config/db.config';
import { errorHandler } from './middleware/errorHandler';
import { corsOptions } from './config/cors.config';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150
});

app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB()
});