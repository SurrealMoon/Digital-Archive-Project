import { Request, Response, NextFunction } from "express";
import User from "../models/user-model"; 
import { generateToken, generateRefreshToken } from "../utils/generateToken";
import {
  createUserService,
  updateLawyerService,
  deleteUserService,
  validatePassword,
  getAllLawyersService,
  getLawyerByIdService,
  updateRefreshTokenService,
  clearRefreshTokenService,
  refreshAccessTokenService
} from "../services/login-service";

// Admin Giriş İşlemi
export const loginAdmin = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, role: "admin" });

    if (user && (await validatePassword(password, user.password))) {
      const accessToken = generateToken(user._id.toString());
      const refreshToken = generateRefreshToken(user._id.toString());

      // Refresh token'ı veritabanına kaydediyoruz
      await updateRefreshTokenService(user._id.toString(), refreshToken);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        id: user._id,
        username: user.username,
        role: user.role,
        accessToken,
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
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, role: "lawyer" });

    if (user && (await validatePassword(password, user.password))) {
      const accessToken = generateToken(user._id.toString());
      const refreshToken = generateRefreshToken(user._id.toString());

      await updateRefreshTokenService(user._id.toString(), refreshToken);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        id: user._id,
        username: user.username,
        role: user.role,
        accessToken,
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
    // Kullanıcı rolü "lawyer" ise baroSicilNo'yu username olarak ayarla
    if (req.body.role === "lawyer" && req.body.baroSicilNo) {
      req.body.username = req.body.baroSicilNo;
    }

    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllLawyers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lawyers = await getAllLawyersService();

    if (lawyers.length === 0) {
      res.status(404).json({ message: "No lawyers found" });
      return;
    }

    res.status(200).json(lawyers);
  } catch (error) {
    next(error);
  }
};


export const getLawyerById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const lawyer = await getLawyerByIdService(id);

    if (!lawyer) {
      res.status(404).json({ message: "Lawyer not found" });
      return;
    }

    res.status(200).json(lawyer);
  } catch (error) {
    next(error);
  }
};



// Kullanıcı Güncelleme
export const updateLawyer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params; // Güncellenecek avukatın ID'sini al
    const updates = req.body;

    // Güncellemeden önce role'ü kontrol et
    const updatedLawyer = await updateLawyerService(id, { ...updates, role: "lawyer" });

    if (!updatedLawyer) {
      res.status(404).json({ message: "Lawyer not found" });
      return;
    }

    res.status(200).json({ message: "Lawyer updated successfully", data: updatedLawyer });
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
