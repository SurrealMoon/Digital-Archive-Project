import express from "express";
import {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  assignLawyer,
  addViolation,
} from "../controllers/application-controller";

const router = express.Router();

// CRUD Routes
router.post("/", createApplication); // Yeni başvuru oluşturma
router.get("/", getAllApplications); // Tüm başvuruları listeleme
router.get("/:id", getApplicationById); // Belirli bir başvuruyu getirme
router.put("/:id", updateApplication); // Başvuru güncelleme
router.delete("/:id", deleteApplication); // Başvuru silme

// Ek Özellikler
router.put("/:id/assign-lawyer", assignLawyer); // Avukat atama
router.put("/:id/add-violation", addViolation); // Hak ihlali ekleme

export default router;
