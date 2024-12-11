import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user-model"; // Kullanıcı modeli

interface DecodedToken {
  id: string;
}

const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "defaultsecret"
      ) as DecodedToken;

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        res.status(401).json({ message: "Not authorized, user not found" });
        return;
      }

      (req as any).user = user; // Tip hatasını önlemek için `as any` kullanıldı
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
      return;
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }
};

export { protect };
