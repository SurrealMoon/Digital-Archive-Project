import { Request, Response, NextFunction } from "express";
import {
  createCaseService,
  getAllCasesService,
  getCaseByIdService,
  updateCaseService,
  deleteCaseService,
} from "../services/case-service";

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
    const user = (req as any).user; // req.user üzerinde kullanıcı bilgisi mevcut

    let cases;
    if (user.role === "admin") {
      // Admin tüm davaları görür
      cases = await getAllCasesService();
    } else if (user.role === "lawyer") {
      // Avukat yalnızca kendisine atanan davaları görür
      cases = await getAllCasesService({ lawyerId: user._id });
    } else {
      res.status(403).json({ message: "You do not have permission to view cases" });
      return;
    }

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
