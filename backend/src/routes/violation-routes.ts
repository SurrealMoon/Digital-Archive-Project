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
router.post("/create", createViolation); // Yeni hak ihlali ekleme
router.get("/getall", getAllViolations); // Tüm hak ihlallerini listeleme
router.get("/:id", getViolationById); // Belirli bir hak ihlalini getirme
router.put("/update/:id", updateViolation); // Hak ihlali güncelleme
router.delete("/delete/:id", deleteViolation); // Hak ihlali silme

export default router;
