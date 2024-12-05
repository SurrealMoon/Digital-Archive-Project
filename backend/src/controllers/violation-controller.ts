import { RequestHandler } from "express";
import {
  createViolationService,
  getAllViolationsService,
  getViolationByIdService,
  updateViolationService,
  deleteViolationService,
} from "../services/violation-service";

// Yeni Hak İhlali Ekleme
export const createViolation: RequestHandler = async (req, res, next) => {
  try {
    const violation = await createViolationService(req.body);
    res.status(201).json(violation);
    return; // Fonksiyonun sonlandığını belirtmek için return eklenir
  } catch (error) {
    next(error);
  }
};

// Tüm Hak İhlallerini Listeleme
export const getAllViolations: RequestHandler = async (req, res, next) => {
  try {
    const violations = await getAllViolationsService();
    res.status(200).json(violations);
    return;
  } catch (error) {
    next(error);
  }
};

// Belirli Bir Hak İhlalini Getirme
export const getViolationById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const violation = await getViolationByIdService(id);

    if (!violation) {
      res.status(404).json({ message: "Violation not found" });
      return;
    }

    res.status(200).json(violation);
    return;
  } catch (error) {
    next(error);
  }
};

// Hak İhlali Güncelleme
export const updateViolation: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedViolation = await updateViolationService(id, req.body);

    if (!updatedViolation) {
      res.status(404).json({ message: "Violation not found" });
      return;
    }

    res.status(200).json(updatedViolation);
    return;
  } catch (error) {
    next(error);
  }
};

// Hak İhlali Silme
export const deleteViolation: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedViolation = await deleteViolationService(id);

    if (!deletedViolation) {
      res.status(404).json({ message: "Violation not found" });
      return;
    }

    res.status(200).json({ message: "Violation deleted successfully" });
    return;
  } catch (error) {
    next(error);
  }
};
