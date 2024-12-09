import User, { IUser } from "../models/user-model";

// Yeni Kullanıcı Oluşturma
export const createUserService = async (data: Partial<IUser>): Promise<IUser> => {
  const user = new User(data);
  return await user.save();
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
