import User, { IUser } from "../models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken";

const SALT_ROUNDS = 10;

// Yeni Kullanıcı Oluşturma (Şifre Hashleme Dahil)
export const createUserService = async (data: Partial<IUser>): Promise<IUser> => {
  if (data.password) {
    // Şifreyi hashle
    data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
  }

  const user = new User(data);
  return await user.save();
};

// Şifre Karşılaştırma Fonksiyonu
export const validatePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// **Sadece Avukatları Listeleme** 
export const getAllLawyersService = async (): Promise<IUser[]> => {
  return await User.find({ role: "lawyer" }); // role: "lawyer" olanları getir
};

// Belirli Bir Avukatı Getirme Servisi
export const getLawyerByIdService = async (id: string): Promise<IUser | null> => {
  return await User.findOne({ _id: id, role: "lawyer" }); // role: "lawyer" olan ve ID'ye göre kullanıcıyı getir
};

// Avukat Güncelleme
export const updateLawyerService = async (id: string, updates: Partial<IUser>): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, updates, { new: true });
};

// Avukat Silme
export const deleteUserService = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};

// Kullanıcının Refresh Token'ını Güncelleme
export const updateRefreshTokenService = async (id: string, refreshToken: string): Promise<void> => {
  await User.findByIdAndUpdate(id, { refreshToken });
};

// Kullanıcının Refresh Token'ını Temizleme
export const clearRefreshTokenService = async (refreshToken: string): Promise<boolean> => {
  // Refresh Token'ı doğrula
  const decoded: any = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET || "defaultrefreshsecret"
  );

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error("User not found");
  }

  // Kullanıcının Refresh Token'ını temizle
  user.refreshToken = null;
  await user.save();
  return true;
};

// Yeni Access Token oluşturma
export const refreshAccessTokenService = async (refreshToken: string): Promise<string> => {
  const decoded: any = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET || "defaultrefreshsecret"
  );

  const user = await User.findById(decoded.id);
  if (!user || user.refreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  return generateToken(user._id.toString());
};

export const verifyTokenService = async (token: string) => {
  if (!token) {
    throw new Error("Token gerekli");
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
    return user;
  } catch (error) {
    throw new Error("Geçersiz token");
  }
};
