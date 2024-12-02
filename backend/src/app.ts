import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
const MONGO_URL = 'mongodb+srv://admin:1234@digital-archive.x1uht.mongodb.net/';

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
  
  

// Start Server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
