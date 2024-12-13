import express from "express";
import { loginAdmin, createUser, getUsers, getUserById, updateUser, deleteUser, logoutUser } from "../controllers/login-controller";

const router = express.Router();

// Admin Login Route
router.post("/login", loginAdmin);

// Kullanıcı İşlemleri (admin yetkisi gerektirir)
router.post("/", createUser); // Yeni kullanıcı oluşturma
router.get("/", getUsers); // Tüm kullanıcıları listeleme
router.get("/:id", getUserById); // Belirli bir kullanıcıyı getirme
router.put("/:id", updateUser); // Kullanıcı güncelleme
router.delete("/:id", deleteUser); // Kullanıcı silme
router.post("/logout", logoutUser); // Kullanıcı Çıkış


export default router;
