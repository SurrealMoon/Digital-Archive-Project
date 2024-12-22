import express from 'express';
import multer from 'multer';
import { addDocumentController} from '../controllers/application-controller';
import { addDocumentToCaseController, removeDocumentFromCaseController } from "../controllers/case-controller";


const router = express.Router();
// Multer yapılandırması
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Only .jpg, .png, and .pdf files are allowed!'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // Maksimum dosya boyutu: 5 MB
  },
});

// Dosya yükleme rotası
router.post('/applications/:id/upload', upload.single('file'), (req, res, next) => {

  addDocumentController(req as any, res, next);
});

// Davaya döküman ekleme
router.post("/cases/:id/upload", upload.single("file"), (req, res, next) => {
  addDocumentToCaseController(req as any, res, next);
});

// Dava'dan döküman silme
router.delete("/cases/:id/documents/:index", (req, res, next) => {
  removeDocumentFromCaseController(req as any, res, next);
});

export default router;