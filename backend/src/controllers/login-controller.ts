import { Request, Response, NextFunction } from "express";
import User from "../models/user-model"; // Kullanıcı modeli
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  createUserService,
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} from "../services/login-service";

// JWT Token oluşturma fonksiyonu
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "defaultsecret", {
    expiresIn: "1d", // Token 1 gün geçerli
  });
};

// Admin Giriş İşlemi
export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, role: "admin" });

    if (user && user.password === password) {
      res.status(200).json({
        id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id.toString()),
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
) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, role: "lawyer" });

    // Şifreyi doğrudan karşılaştırıyoruz
    if (user && password === user.password) {
      res.status(200).json({
        id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    next(error);
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
