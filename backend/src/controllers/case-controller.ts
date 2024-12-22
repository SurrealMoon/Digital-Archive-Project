import { Request, Response, NextFunction } from "express";
import {
  createCaseService,
  getAllCasesService,
  getCaseByIdService,
  updateCaseService,
  deleteCaseService,
  addDocumentToCase,
  removeDocumentFromCase,
} from "../services/case-service";
import FileService from '../services/upload-service';


interface MulterRequest extends Request {
  file?: Express.Multer.File & { location?: string };
}


// Yeni Dava Oluşturma
export const createCase = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newCase = await createCaseService(req.body);
    res.status(201).json(newCase);
  } catch (error) {
    next(error);
  }
};

// Tüm Davaları Listeleme
export const getAllCases = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cases = await getAllCasesService();
    res.status(200).json(cases);
  } catch (error) {
    next(error);
  }
};

// Belirli Bir Davayı Getirme
export const getCaseById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const foundCase = await getCaseByIdService(id);

    if (!foundCase) {
      res.status(404).json({ message: "Case not found" });
      return;
    }

    res.status(200).json(foundCase);
  } catch (error) {
    next(error);
  }
};

// Dava Güncelleme
export const updateCase = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedCase = await updateCaseService(id, req.body);

    if (!updatedCase) {
      res.status(404).json({ message: "Case not found" });
      return;
    }

    res.status(200).json(updatedCase);
  } catch (error) {
    next(error);
  }
};

// Dava Silme
export const deleteCase = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedCase = await deleteCaseService(id);

    if (!deletedCase) {
      res.status(404).json({ message: "Case not found" });
      return;
    }

    res.status(200).json({ message: "Case deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Davaya doküman ekleme
export const addDocumentToCaseController = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { documentTitle } = req.body; // Document Title'ı alın

    // Dosya yüklenmediyse hata döndür
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    // Document Title boşsa hata döndür
    if (!documentTitle || documentTitle.trim() === "") {
      res.status(400).json({ message: "Document title is required" });
      return;
    }

    // AWS S3'e dosya yükle
    const uploadResult = await FileService.uploadFile(req.file);
    const fileUrl = uploadResult.Location;

    // Case'e doküman ekle
    const updatedCase = await addDocumentToCase(req.params.id, fileUrl, documentTitle);

    if (!updatedCase) {
      res.status(404).json({ message: "Case not found" });
      return;
    }

    // Başarılı yanıt döndür
    res.status(200).json({
      message: "File uploaded successfully to case",
      updatedCase,
    });
  } catch (error) {
    next(error);
  }
};


// Davadan doküman silme
export const removeDocumentFromCaseController = async (
  req: Request<{ id: string; index: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, index } = req.params;
    const documentIndex = parseInt(index, 10);

    const updatedCase = await removeDocumentFromCase(id, documentIndex);

    res.status(200).json({
      message: "Document removed successfully",
      updatedCase,
    });
  } catch (error) {
    next(error);
  }
};
