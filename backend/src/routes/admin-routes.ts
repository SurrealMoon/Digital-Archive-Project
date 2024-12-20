import express from "express";
import {
  getAllLawyers,
  getLawyerById,
  createUser,
  updateLawyer,
  deleteUser,
  loginAdmin,
  loginLawyer,
  logoutUser,
  verifyTokenController,
} from "../controllers/login-controller";

const router = express.Router();

// Sabit Route'lar
router.post("/login", loginAdmin);
router.post("/lawyer/login", loginLawyer);
router.get("/lawyers", getAllLawyers); // Sadece avukatları getir
router.get("/lawyers/:id", getLawyerById); // Belirli bir avukatı getir
router.post("/", createUser); // Yeni kullanıcı oluştur
router.post("/logout", logoutUser);
router.get("/verify", verifyTokenController); // Token'i dogrula

// Dinamik Route'lar
router.put("/:id", updateLawyer); // Kullanıcı güncelle
router.delete("/:id", deleteUser); // Kullanıcı sil

export default router;
