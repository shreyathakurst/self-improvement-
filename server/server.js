import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import authRoutes from './routes/auth.js';
import behaviorRoutes from './routes/behaviors.js';
import itemRoutes from './routes/items.js';
import { errorHandler } from './middlewares/errorHandler.js';
import path from 'path';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/behaviors', behaviorRoutes);
app.use('/api/items', itemRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), 'client', 'build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'client', 'build', 'index.html'));
  });
}

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
