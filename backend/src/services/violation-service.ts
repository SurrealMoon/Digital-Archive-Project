import Violation, { IViolation } from "../models/violation-model";

// Yeni Hak İhlali Ekleme
export const createViolationService = async (data: Partial<IViolation>): Promise<IViolation> => {
  const violation = new Violation(data);
  return await violation.save();
};

// Tüm Hak İhlallerini Getirme
export const getAllViolationsService = async (): Promise<IViolation[]> => {
  return await Violation.find();
};

// Belirli Bir Hak İhlalini Getirme
export const getViolationByIdService = async (id: string): Promise<IViolation | null> => {
  return await Violation.findById(id);
};

// Hak İhlali Güncelleme
export const updateViolationService = async (
  id: string,
  updates: Partial<IViolation>
): Promise<IViolation | null> => {
  return await Violation.findByIdAndUpdate(id, updates, { new: true });
};

// Hak İhlali Silme
export const deleteViolationService = async (id: string): Promise<IViolation | null> => {
  return await Violation.findByIdAndDelete(id);
};
