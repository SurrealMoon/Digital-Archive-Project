import { Request, Response, NextFunction } from "express";

export const restrictTo =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user; // Tip hatasını önlemek için `as any` kullanıldı

    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ message: "You do not have permission to perform this action" });
      return;
    }

    next();
  };
