import express from "express";
import {
  createViolation,
  getAllViolations,
  getViolationById,
  updateViolation,
  deleteViolation,
} from "../controllers/violation-controller";

const router = express.Router();

// CRUD Routes
router.post("/", createViolation); // Yeni hak ihlali ekleme
router.get("/", getAllViolations); // Tüm hak ihlallerini listeleme
router.get("/:id", getViolationById); // Belirli bir hak ihlalini getirme
router.put("/:id", updateViolation); // Hak ihlali güncelleme
router.delete("/:id", deleteViolation); // Hak ihlali silme

export default router;
