import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { startCronJobs } from './utils/cronJobs.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import tradeRoutes from './routes/tradeRoutes.js';
import stockRoutes from './routes/stockRoutes.js';
// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true,
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// API Routes
app.get('/api', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/trades', tradeRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/trades', tradeRoutes);
app.use('/api/stocks', stockRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Start Cron Jobs
startCronJobs();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));