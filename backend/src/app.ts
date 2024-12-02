import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes'; // Admin routes dosyası
import { protect } from './middlewares/authMiddleware'; // Token doğrulama middleware

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL || '';

// Middleware
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    if (error instanceof Error) {
      console.error('MongoDB connection failed:', error.message);
    } else {
      console.error('MongoDB connection failed with an unknown error');
    }
    process.exit(1);
  }
};

// Routes
app.use('/api/admin', adminRoutes); // Admin login ve diğer işlemler için

// Protected Test Route (middleware testi için)
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'This is a protected route accessible only with a valid token' });
});

// Start Server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
