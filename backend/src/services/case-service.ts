import Case, { ICase } from "../models/case-model";
import Application , {IApplication} from "../models/application-model";
import mongoose from "mongoose";

// Yeni Dava Oluşturma
export const createCaseService = async (data: Partial<ICase>): Promise<ICase> => {
  const {
    applicationId,
    lawyerId,
    clientname,
    otherlawyer,
    courtName,
    courtFileOrInsvestigationNo,
    caseTitle,
    caseDescription,
    documents,
    documentTitle,
  } = data;

  // Bağlı başvuruyu bul
  const application: IApplication | null = await Application.findById(applicationId).exec();
  if (!application) {
    throw new Error("Application not found");
  }

  // Avukatı belirle: Başvurudan alınabilir ya da manuel girilebilir
  const caseLawyer = lawyerId || application.lawyerId;
  if (!caseLawyer) {
    throw new Error("Lawyer must be assigned to the application or provided to create a case");
  }

  // Müvekkil adını belirle: Başvurudan alınabilir ya da manuel girilebilir
  const caseClientName = clientname || application.fullName;

  // Yeni dava oluştur
  const newCase = new Case({
    applicationId: application._id,
    lawyerId: caseLawyer,
    clientname: caseClientName,
    otherlawyer,
    courtName,
    courtFileOrInsvestigationNo,
    caseTitle,
    caseDescription,
    documents,
    documentTitle,
  });

  // Yeni davayı veritabanına kaydet
  await newCase.save();

  // Başvuruya dava bilgisi ekle
  if (!application.caseId) {
    application.caseId = newCase._id as mongoose.Types.ObjectId; // Eğer Application modelinde `caseId` varsa
    await application.save();
  }

  return newCase;
};

// Tüm Davaları Listeleme
export const getAllCasesService = async (filter: object = {}): Promise<ICase[]> => {
  try {
    // Filtre ile davaları bul
    const cases = await Case.find(filter)
      .populate("applicationId", "fullName") // İlişkili Application bilgisi (özellikle clientname veya fullName)
      .populate("lawyerId", "name") // İlişkili Lawyer bilgisi (özellikle avukat adı)
      .exec();

    return cases;
  } catch (error) {
    console.error("Error getting cases:", error);
    throw new Error("Error fetching cases.");
  }
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
