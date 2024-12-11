import Case, { ICase } from "../models/case-model";

// Yeni Dava Oluşturma
export const createCaseService = async (data: Partial<ICase>): Promise<ICase> => {
  const newCase = new Case(data);
  return await newCase.save();
};

// Tüm Davaları Listeleme
export const getAllCasesService = async (filter: object = {}): Promise<ICase[]> => {
  return await Case.find(filter);
};

// Belirli Bir Davayı Getirme
export const getCaseByIdService = async (id: string): Promise<ICase | null> => {
  return await Case.findById(id).populate("lawyerId", "fullName email phone role");
};

// Dava Güncelleme
export const updateCaseService = async (
  id: string,
  updates: Partial<ICase>
): Promise<ICase | null> => {
  return await Case.findByIdAndUpdate(id, updates, { new: true });
};

// Dava Silme
export const deleteCaseService = async (id: string): Promise<ICase | null> => {
  return await Case.findByIdAndDelete(id);
};
