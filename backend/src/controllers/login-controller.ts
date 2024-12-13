import { Request, Response, NextFunction } from "express";
import User from "../models/user-model"; // Kullanıcı modeli
import { generateToken, generateRefreshToken } from "../utils/generateToken"; // Token fonksiyonlarını içe aktar
import {
  createUserService,
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  validatePassword,
  updateRefreshTokenService,
  clearRefreshTokenService,
  refreshAccessTokenService
} from "../services/login-service";

// Admin Giriş İşlemi
export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, role: "admin" });

    if (user && (await validatePassword(password, user.password))) {
      const accessToken = generateToken(user._id.toString());
      const refreshToken = generateRefreshToken(user._id.toString());

      // Refresh token'ı veritabanına kaydediyoruz
      await updateRefreshTokenService(user._id.toString(), refreshToken);

      // Refresh token'ı HTTP-Only cookie'ye ekleyelim
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // XSS saldırılarına karşı koruma
        secure: process.env.NODE_ENV === "production", // Sadece HTTPS üzerinde gönder
        sameSite: "strict", // Cross-site requestlere karşı koruma
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün geçerlilik
      });

      res.status(200).json({
        id: user._id,
        username: user.username,
        role: user.role,
        accessToken, // Access token
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    next(error);
  }
};

// Avukat Giriş İşlemi
export const loginLawyer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, role: "lawyer" });

    if (user && (await validatePassword(password, user.password))) {
      // Access Token ve Refresh Token oluşturuluyor
      const accessToken = generateToken(user._id.toString());
      const refreshToken = generateRefreshToken(user._id.toString());

      // Refresh token veritabanına kaydediliyor
      await updateRefreshTokenService(user._id.toString(), refreshToken);

      // Refresh token'ı HTTP-Only cookie'ye ekleyelim
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // XSS saldırılarına karşı koruma
        secure: process.env.NODE_ENV === "production", // Sadece HTTPS üzerinde gönder
        sameSite: "strict", // Cross-site requestlere karşı koruma
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün geçerlilik
      });

      // Yanıt olarak Access Token gönderiliyor
      res.status(200).json({
        id: user._id,
        username: user.username,
        role: user.role,
        accessToken, // Access Token
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    next(error);
  }
};

// Kullanıcı Çıkış
export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Refresh token'ı HTTP-Only cookie'den al
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      res.status(400).json({ message: "Refresh token is required" });
      return;
    }

    // Servis fonksiyonunu çağır
    await clearRefreshTokenService(refreshToken);

    // Refresh token'ı cookie'den temizle
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Sadece HTTPS üzerinde gönder
      sameSite: "strict", // Cross-site requestlere karşı koruma
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(401).json({ message: "Invalid refresh token" });
    }
  }
};
  // Access Token Yenileme
export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is required" });
      return;
    }

    // Servis fonksiyonunu çağır
    const accessToken = await refreshAccessTokenService(refreshToken);

    // Yeni access token'ı döndür
    res.status(200).json({ accessToken });
  } catch (error) {
    if (error instanceof Error) {
      res.status(403).json({ message: error.message });
    } else {
      res.status(403).json({ message: "Invalid or expired refresh token" });
    }
  }
};

// Yeni Kullanıcı Oluşturma (Admin veya Avukat)
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Tüm Kullanıcıları Listeleme
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getUsersService();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Belirli Bir Kullanıcıyı Getirme
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Kullanıcı Güncelleme
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUserService(id, req.body);

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Kullanıcı Silme
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserService(id);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
