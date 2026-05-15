import express from 'express';
import movieRoutes from './routes/movieRoutes.js';

import {config} from 'dotenv';
import { connectDB, disconnectDB } from './config/db.js';

config();
connectDB();


const app = express();

app.use('/movies', movieRoutes);

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