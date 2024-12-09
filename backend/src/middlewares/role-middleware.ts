import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";

// Kullanıcı arayüzü
interface IUser extends Document {
  role: string; // Kullanıcı rolü (örneğin: 'admin', 'lawyer')
}

// Rol kontrolü yapan middleware
export const restrictTo =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as IUser; // req.user üzerinden kullanıcı bilgisi alınır
      if (!user || !roles.includes(user.role)) {
        return res
          .status(403)
          .json({ message: "You do not have permission to perform this action" });
      }
      next(); // Erişim hakkı varsa devam eder
    } catch (error) {
      return res.status(500).json({ message: "An error occurred" });
    }
  };
