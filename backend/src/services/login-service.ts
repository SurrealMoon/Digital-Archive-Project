import User, { IUser } from "../models/user-model";
import bcrypt from "bcrypt";


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
export const validatePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
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
