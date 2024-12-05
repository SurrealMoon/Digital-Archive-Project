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
  return await Application.findByIdAndUpdate(
    applicationId,
    { avukatId: lawyerId },
    { new: true }
  );
};

// Hak İhlali Ekleme
export const addViolationService = async (
  applicationId: string,
  violationId: string
): Promise<IApplication | null> => {
  return await Application.findByIdAndUpdate(
    applicationId,
    { hakIhlaliId: violationId },
    { new: true }
  );
};
