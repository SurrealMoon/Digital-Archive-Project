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


// Tüm Kullanıcıları Listeleme
export const getUsersService = async (): Promise<IUser[]> => {
  return await User.find();
};

// Belirli Bir Kullanıcıyı Getirme
export const getUserByIdService = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

// Kullanıcı Güncelleme
export const updateUserService = async (id: string, updates: Partial<IUser>): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, updates, { new: true });
};

// Kullanıcı Silme
export const deleteUserService = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};

// Kullanıcının Refresh Token'ını Güncelleme
export const updateRefreshTokenService = async (id: string, refreshToken: string): Promise<void> => {
  await User.findByIdAndUpdate(id, { refreshToken });
};


// Kullanıcının Refresh Token'ını Doğrulama
export const validateRefreshTokenService = async (id: string, refreshToken: string): Promise<boolean> => {
  const user = await User.findById(id);
  return user?.refreshToken === refreshToken;
};

// Kullanıcının Refresh Token'ını Temizleme
export const clearRefreshTokenService = async (refreshToken: string): Promise<boolean> => {
  // Refresh Token'ı doğrula
  const decoded: any = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET || "defaultrefreshsecret"
  );

  // Kullanıcıyı veritabanında bul
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error("User not found");
  }

  // Kullanıcının Refresh Token'ını temizle
  user.refreshToken = null;
  await user.save();
  return true;
};

export const refreshAccessTokenService = async (refreshToken: string): Promise<string> => {
  // Refresh token'ı doğrula
  const decoded: any = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET || "defaultrefreshsecret"
  );

  // Kullanıcıyı bul
  const user = await User.findById(decoded.id);
  if (!user || user.refreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  // Yeni access token oluştur
  return generateToken(user._id.toString());
};

