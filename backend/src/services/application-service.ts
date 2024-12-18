import mongoose from "mongoose";
import Application, { IApplication } from "../models/application-model";

// Yeni Başvuru Oluşturma
export const createApplicationService = async (
  data: Partial<IApplication>
): Promise<IApplication> => {
  const application = new Application(data);
  return await application.save();
};

// Tüm Başvuruları Listeleme
export const getAllApplicationsService = async (): Promise<IApplication[]> => {
  return await Application.find();
};

// Belirli Bir Başvuruyu Getirme
export const getApplicationByIdService = async (
  id: string
): Promise<IApplication | null> => {
  return await Application.findById(id);
};

// Başvuru Güncelleme
export const updateApplicationService = async (
  id: string,
  updates: Partial<IApplication>
): Promise<IApplication | null> => {
  return await Application.findByIdAndUpdate(id, updates, { new: true });
};

// Başvuru Silme
export const deleteApplicationService = async (
  id: string
): Promise<IApplication | null> => {
  return await Application.findByIdAndDelete(id);
};

// Avukat Atama
export const assignLawyerService = async (
  applicationId: string,
  lawyerId: string
): Promise<IApplication | null> => {
  // Geçerli ID kontrolü
  if (!mongoose.isValidObjectId(applicationId) || !mongoose.isValidObjectId(lawyerId)) {
    throw new Error("Invalid applicationId or lawyerId");
  }

  // lawyerId'yi ObjectId formatına dönüştür
  const lawyerObjectId = new mongoose.Types.ObjectId(lawyerId);

  // Güncelleme işlemi
  const updatedApplication = await Application.findByIdAndUpdate(
    applicationId,
    { lawyerId: lawyerObjectId }, // Modeldeki alan adı
    { new: true }
  );

  if (!updatedApplication) {
    throw new Error("Application not found");
  }

  return updatedApplication;
};

// Hak İhlali Ekleme
// services/application-service.ts
export const addViolationService = async (
  applicationId: string,
  violationId: string
): Promise<IApplication | null> => {
  
  const updated = await Application.findByIdAndUpdate(
    applicationId,
    { violationId },
    { new: true }
  );

  return updated;
};
