import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin';

// JWT Token oluşturma fonksiyonu
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'defaultsecret', {
    expiresIn: '1d', // Token 1 gün geçerli
  });
};

// Admin Login Controller
export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Kullanıcıyı veritabanında bul
    const admin = await Admin.findOne({ username });

    // Şifreyi doğrudan kontrol et
    if (admin && admin.password === password) {
      res.json({
        id: admin._id,
        username: admin.username,
        token: generateToken(admin._id.toString()),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
