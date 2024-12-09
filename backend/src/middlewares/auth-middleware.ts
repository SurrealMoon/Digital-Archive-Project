import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Admin from '../models/user-model';

interface DecodedToken {
  id: string;
}

// Middleware Fonksiyonu
const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'defaultsecret'
      ) as DecodedToken;

      // Kullanıcıyı veritabanından al ve req.user'a ata
      const user = await Admin.findById(decoded.id).select('-password');
      (req as any).user = user; // Hata almamak için `as any` kullandık

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };