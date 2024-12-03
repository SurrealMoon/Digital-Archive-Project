import express from "express";
import {
  createArchive,
  getArchives,
  getArchiveById,
  updateArchive,
  deleteArchive,
} from "../controllers/archive-controller";

const router = express.Router();

// CRUD endpoint'leri
router.post("/", createArchive); // Yeni olay ekleme
router.get("/", getArchives); // Olayları listeleme
router.get("/:id", getArchiveById); // Belirli bir olayı getir
router.put("/:id", updateArchive); // Olay güncelleme
router.delete("/:id", deleteArchive); // Olay silme

export default router;
