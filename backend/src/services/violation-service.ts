import Violation, { IViolation } from "../models/violation-model";

// Yeni Hak İhlali Ekleme
export const createViolationService = async (
  data: Partial<IViolation>, 
  applicationId: string // applicationId parametresi eklendi
): Promise<IViolation> => {
  // Application ID'yi ekle
  const violation = new Violation({ ...data, applicationId });
  return await violation.save();
};


// Tüm Hak İhlallerini Getirme (Application ID'ye göre)
export const getAllViolationsService = async (
  applicationId: string // applicationId parametresi eklendi
): Promise<IViolation[]> => {
  return await Violation.find({ applicationId }); // Application ID'ye göre filtreleme yapıldı
};


// Belirli Bir Hak İhlalini Getirme (ID ve Application ID'ye göre)
export const getViolationByIdService = async (
  id: string, 
  applicationId: string // applicationId parametresi eklendi
): Promise<IViolation | null> => {
  return await Violation.findOne({ _id: id, applicationId }); // Hem ID'yi hem de applicationId'yi kontrol ediyoruz
};


// Hak İhlali Güncelleme (ID ve Application ID'ye göre)
export const updateViolationService = async (
  id: string, 
  updates: Partial<IViolation>, 
  applicationId: string // applicationId parametresi eklendi
): Promise<IViolation | null> => {
  return await Violation.findOneAndUpdate(
    { _id: id, applicationId }, // Hem ID'yi hem de applicationId'yi kontrol ediyoruz
    updates, 
    { new: true }
  );
};


// Hak İhlali Silme (ID ve Application ID'ye göre)
export const deleteViolationService = async (
  id: string, 
  applicationId: string // applicationId parametresi eklendi
): Promise<IViolation | null> => {
  return await Violation.findOneAndDelete({ _id: id, applicationId }); // Hem ID'yi hem de applicationId'yi kontrol ediyoruz
};

