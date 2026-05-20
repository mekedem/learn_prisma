import express from 'express';
import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';

import {config} from 'dotenv';
import { connectDB, disconnectDB } from './config/db.js';

config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/movies', movieRoutes);
app.use('/auth', authRoutes);
app.use('/watchlist', watchlistRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.log(`Error: ${error.message}`);
  disconnectDB();
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log('SIGTERM signal received');
  disconnectDB();
  process.exit(0);
});

process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  disconnectDB();
  process.exit(1);
});