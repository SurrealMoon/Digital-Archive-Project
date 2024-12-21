import express from "express";
import {
  createCase,
  getAllCases,
  getCaseById,
  updateCase,
  deleteCase,
} from "../controllers/case-controller";
import { protect } from "../middlewares/auth-middleware"; // Yetkilendirme için
import { restrictTo } from "../middlewares/role-middleware"; // Rol bazlı kontrol için

const router = express.Router();

// CRUD Routes
router.post("/create", protect, restrictTo("admin"), createCase); // Admin dava oluşturabilir
router.get("/getallcases", protect, restrictTo("admin", "lawyer"), getAllCases); // Tüm davaları görüntüleyebilir
router.get("/:id", protect, restrictTo("admin", "lawyer"), getCaseById); // Belirli bir davayı görüntüleyebilir
router.put("/:id", protect, restrictTo("admin", "lawyer"), updateCase); // Dava güncelleyebilir
router.delete("/:id", protect, restrictTo("admin"), deleteCase); // Sadece admin dava silebilir

export default router;
