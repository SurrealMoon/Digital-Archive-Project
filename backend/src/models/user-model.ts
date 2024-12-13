import mongoose, { Document, ObjectId } from "mongoose";

// Kullanıcı Arayüzü
export interface IUser extends Document {
  _id: ObjectId;
  username: string;
  password: string;
  role: "admin" | "lawyer";
  fullName?: string; // Avukat için gerekli
  tcNumber?: string; // Avukat için gerekli
  baroSicilNo?: string; // Avukat için gerekli
  email?: string; // Avukat için gerekli
  phone?: string; // Avukat için gerekli
  refreshToken?: string | null; // refreshToken'ı interface'e ekle
}

// Kullanıcı Şeması
const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["admin", "lawyer"] },
  fullName: { type: String },
  tcNumber: { type: String },
  baroSicilNo: { type: String },
  email: { type: String },
  phone: { type: String },
  refreshToken: { type: String, default: null }, // refreshToken'ı schema'ya ekle
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
