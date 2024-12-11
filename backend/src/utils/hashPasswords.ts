import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user-model"; // User modelini ithal et
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = 10;

const hashExistingPasswords = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");

    const users = await User.find(); // Tüm kullanıcıları al
    for (const user of users) {
      if (!user.password.startsWith("$2b$")) {
        // Şifre zaten hashlenmemişse
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        await user.save(); // Şifreyi hashleyip kaydet
        console.log(`Kullanıcı ${user.username} için şifre hashlenmiştir.`);
      }
    }

    console.log("Tüm kullanıcıların şifreleri hashlendi.");
    process.exit(0);
  } catch (error) {
    console.error("Şifreleri hashlerken hata oluştu:", error);
    process.exit(1);
  }
};

hashExistingPasswords();
