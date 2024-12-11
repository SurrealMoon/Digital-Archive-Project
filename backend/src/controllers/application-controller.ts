import { RequestHandler } from "express";
import {
  createApplicationService,
  getAllApplicationsService,
  getApplicationByIdService,
  updateApplicationService,
  deleteApplicationService,
  assignLawyerService,
  addViolationService,
} from "../services/application-service";

// Yeni Başvuru Oluşturma
export const createApplication: RequestHandler = async (req, res, next) => {
  try {
    const application = await createApplicationService(req.body);
    res.status(201).json(application); // Burada açıkça bir JSON yanıt dönüyoruz.
    return; // TypeScript'e fonksiyonun sonlandığını belirtmek için return ekliyoruz.
  } catch (error) {
    next(error);
  }
};

// Tüm Başvuruları Listeleme
export const getAllApplications: RequestHandler = async (req, res, next) => {
  try {
    const applications = await getAllApplicationsService();
    res.status(200).json(applications); // Yanıt döndürüyoruz.
    return; // Fonksiyonun sonlandığını belirtmek için return ekliyoruz.
  } catch (error) {
    next(error);
  }
};

// Belirli Bir Başvuru Getirme
export const getApplicationById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await getApplicationByIdService(id);

    if (!application) {
      res.status(404).json({ message: "Application not found" });
      return; // Fonksiyonun sonlandığını belirtmek için return ekliyoruz.
    }

    res.status(200).json(application);
    return;
  } catch (error) {
    next(error);
  }
};

// Başvuru Güncelleme
export const updateApplication: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedApplication = await updateApplicationService(id, req.body);

    if (!updatedApplication) {
      res.status(404).json({ message: "Application not found" });
      return;
    }

    res.status(200).json(updatedApplication);
    return;
  } catch (error) {
    next(error);
  }
};

// Başvuru Silme
export const deleteApplication: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedApplication = await deleteApplicationService(id);

    if (!deletedApplication) {
      res.status(404).json({ message: "Application not found" });
      return;
    }

    res.status(200).json({ message: "Application deleted successfully" });
    return;
  } catch (error) {
    next(error);
  }
};

// Avukat Atama
export const assignLawyer: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { avukatId } = req.body;
    const updatedApplication = await assignLawyerService(id, avukatId);

    if (!updatedApplication) {
      res.status(404).json({ message: "Application not found" });
      return;
    }

    res.status(200).json(updatedApplication);
    return;
  } catch (error) {
    next(error);
  }
};

// Hak İhlali Ekleme
export const addViolation: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params; // Başvuru ID'si
    const { violationId } = req.body; // Gövdeden gelen violationId

    const updatedApplication = await addViolationService(id, violationId);

    if (!updatedApplication) {
      res.status(404).json({ message: "Application not found" });
      return;
    }

    res.status(200).json(updatedApplication); // Güncellenmiş kaydı döndür
    return;
  } catch (error) {
    next(error);
  }
};
