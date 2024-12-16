import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import adminRoutes from './routes/admin-routes'; // Admin'e özel rotalar
import userRoutes from './routes/user-routes'; // Kullanıcı login işlemleri için
import { protect } from './middlewares/auth-middleware'; // Token doğrulama middleware
import applicationRoutes from "./routes/application-routes";
import violationRoutes from "./routes/violation-routes";
import caseRoutes from "./routes/case-routes"; // Dava rotalarını ekle

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI || '';

// Middleware
app.use(express.json());
app.use(cookieParser()); // Cookie'leri okuyabilmek için
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // Dinamik olarak FRONTEND_URL kullanılır
  credentials: true, // Cookie gönderimi için izin ver
}));

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
app.use('/api/admin', adminRoutes); // Admin işlemleri için rotalar
app.use('/api/users', userRoutes); // Kullanıcı login işlemleri için rotalar
app.use('/api/archive', applicationRoutes); // Başvuru işlemleri
app.use('/api/violations', violationRoutes); // Hak ihlali işlemleri
app.use("/api/cases", caseRoutes); // Dava işlemleri rotaları

// Protected Test Route (middleware testi için)
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'This is a protected route accessible only with a valid token' });
});

// Start Server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
