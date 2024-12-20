import express from "express";
import {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  assignLawyer,
  addViolation,
  removeDocumentController
} from "../controllers/application-controller";

const router = express.Router();

router.post("/create", createApplication); // Yeni başvuru oluşturma
router.get("/application-list", getAllApplications); // Tüm başvuruları listeleme
router.get("/:id", getApplicationById); // Belirli bir başvuruyu getirme
router.put("/details/:id", updateApplication); // Başvuru güncelleme
router.delete("/:id", deleteApplication); // Başvuru silme
router.delete('/:id/documents/:index', removeDocumentController); // Döküman silme


// Ek Özellikler
router.put("/:id/assign-lawyer", assignLawyer); // Avukat atama
router.put("/:id/add-violation", addViolation); // Hak ihlali ekleme

export default router;
