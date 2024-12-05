import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin-routes'; // Admin routes dosyası
import { protect } from './middlewares/auth-middleware'; // Token doğrulama middleware
import applicationRoutes from "./routes/application-routes";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI || '';

app.use(express.json());
app.use("/api/archive", applicationRoutes);


// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
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
