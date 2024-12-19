import express from 'express';
import multer from 'multer';
import { addDocumentController } from '../controllers/application-controller';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/applications/:id/upload', upload.single('file'), (req, res, next) => {
  addDocumentController(req as any, res, next);
});

export default router;
