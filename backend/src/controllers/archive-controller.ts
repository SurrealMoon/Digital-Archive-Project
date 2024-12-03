import { RequestHandler } from "express";
import {
  createArchiveService,
  getArchivesService,
  getArchiveByIdService,
  updateArchiveService,
  deleteArchiveService,
} from "../services/archive-service";

// Yeni bir olay ekleme (Create)
export const createArchive: RequestHandler = async (req, res, next) => {
  try {
    const savedArchive = await createArchiveService(req.body);
    res.status(201).json(savedArchive);
  } catch (error) {
    next(error); // Hata middleware'ine yönlendirilir
  }
};

// Tüm olayları listeleme
export const getArchives: RequestHandler = async (req, res, next) => {
  try {
    const { type } = req.query as { type?: string };
    const archives = await getArchivesService(type);
    res.status(200).json(archives);
  } catch (error) {
    next(error);
  }
};

// Belirli bir olayı ID'ye göre getirme
export const getArchiveById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const archive = await getArchiveByIdService(id);

    if (!archive) {
      res.status(404).json({ message: "Archive not found" });
      return; // Fonksiyon burada sonlanır
    }

    res.status(200).json(archive);
  } catch (error) {
    next(error);
  }
};

// Olay güncelleme
export const updateArchive: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedArchive = await updateArchiveService(id, req.body);

    if (!updatedArchive) {
      res.status(404).json({ message: "Archive not found" });
      return; // Fonksiyon burada sonlanır
    }

    res.status(200).json(updatedArchive);
  } catch (error) {
    next(error);
  }
};

// Olay silme
export const deleteArchive: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedArchive = await deleteArchiveService(id);

    if (!deletedArchive) {
      res.status(404).json({ message: "Archive not found" });
      return; // Fonksiyon burada sonlanır
    }

    res.status(200).json({ message: "Archive deleted successfully" });
  } catch (error) {
    next(error);
  }
};
