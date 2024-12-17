import mongoose, { Document, ObjectId } from "mongoose";

// Kullanıcı Arayüzü
export interface IUser extends Document {
  _id: ObjectId;
  username: string; // Baro Sicil No olacak
  password: string;
  role: "admin" | "lawyer"; // Kullanıcı rolü
  fullName?: string; // Avukat için gerekli
  tcNumber?: string; // Avukat için gerekli
  baroSicilNo?: string; // Baro Sicil No, username olarak kullanılacak
  email?: string; // Avukat için gerekli
  phone?: string; // Avukat için gerekli
  refreshToken?: string | null; // refreshToken'ı interface'e ekle
}

// Kullanıcı Şeması
const userSchema = new mongoose.Schema<IUser>({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    required: true, 
    enum: ["admin", "lawyer"], // Admin ve Lawyer rollerini destekle
  },
  fullName: { 
    type: String, 
    required: function() { return this.role === "lawyer"; } // Avukat için zorunlu
  },
  tcNumber: { 
    type: String, 
    required: function() { return this.role === "lawyer"; } // Avukat için zorunlu
  },
  baroSicilNo: { 
    type: String, 
    required: function() { return this.role === "lawyer"; }, // Avukat için zorunlu
    unique: true
  },
  email: { 
    type: String, 
    required: function() { return this.role === "lawyer"; } // Avukat için zorunlu
  },
  phone: { 
    type: String, 
    required: function() { return this.role === "lawyer"; } // Avukat için zorunlu
  },
  refreshToken: { 
    type: String, 
    default: null // Refresh Token'ı opsiyonel tut
  },
});

// Kullanıcı Modeli
const User = mongoose.model<IUser>("User", userSchema);

export default User;
