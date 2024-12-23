import Case, { ICase } from "../models/case-model";
import Application, { IApplication } from "../models/application-model";
import mongoose from "mongoose";

export const createCaseService = async (data: Partial<ICase>): Promise<ICase> => {
  const {
    applicationId,
    lawyerId,
    clientname,
  } = data;

  // Başvuru verilerini al
  const application: IApplication | null = await Application.findById(applicationId).exec();
  if (!application) {
    throw new Error("Application not found");
  }

  // Müvekkil adı başvurudan alınır
  const caseClientName = clientname || application.fullName;

  // Yeni dava oluştur
  const newCase = new Case({
    applicationId: application._id, // Başvuru ID'si
    lawyerId: lawyerId || application.lawyerId, // Avukat ID'si
    clientname: caseClientName, // Müvekkil adı
    otherlawyer: "", // Boş bırakılıyor
    courtName: "", // Boş bırakılıyor
    courtFileOrInvestigationNo: "", // Boş bırakılıyor
    caseTitle: "", // Boş bırakılıyor
    caseDescription: "", // Boş bırakılıyor
    documentTitle: "", // Boş bırakılıyor
    documents: [], // Boş dizi olarak bırakılıyor
  });

  // Dava veritabanına kaydediliyor
  await newCase.save();

  // Başvurunun caseId alanını güncelle
  if (!application.caseId) {
    application.caseId = newCase._id as mongoose.Types.ObjectId;
    await application.save();
  }

  return newCase;
};


// Tüm Davaları Listeleme
export const getAllCasesService = async (filter: object = {}): Promise<ICase[]> => {
  const cases = await Case.find(filter)
    .populate({
      path: 'applicationId',
      select: 'fullName citizenId phone email address applicationDate eventCategory eventSummary eventDetails documents', // Gerekli tüm alanlar
    })
    .populate("lawyerId", "fullName") // Avukat bilgileri için fullName alanı
    .exec();

  return cases;
};

// Belirli Bir Davayı Getirme
export const getCaseByIdService = async (id: string): Promise<ICase | null> => {
  return await Case.findById(id)
    .populate({
      path: 'applicationId',
      select: 'fullName citizenId phone email address applicationDate eventCategory eventSummary eventDetails documents', // Başvuru bilgileri
    })
    .populate({
      path: 'lawyerId',
      select: 'fullName email phone role cases', // Avukat bilgileri
    })
  
    .exec();
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

// Davaya döküman ekleme
export const addDocumentToCase = async (
  caseId: string,
  fileUrl: string,
  documentTitle: string
) => {
  const caseDocument = await Case.findById(caseId);

  if (!caseDocument) {
    throw new Error("Case not found");
  }

  const newDocument = {
    fileUrl,
    documentTitle,
    uploadedAt: new Date(),
  };

  if (!Array.isArray(caseDocument.documents)) {
    throw new Error("Invalid documents structure in case");
  }

  caseDocument.documents.push(newDocument);

  // Güncellenmiş Case belgesini kaydet ve döndür
  const updatedCase = await caseDocument.save();

  return updatedCase;
};

// Davadan doküman silme
export const removeDocumentFromCase = async (
  caseId: string,
  documentIndex: number
) => {
  const caseDocument = await Case.findById(caseId);

  if (!caseDocument) {
    throw new Error("Case not found");
  }

  // Documents alanını kontrol et
  if (
    !caseDocument.documents ||
    documentIndex < 0 ||
    documentIndex >= caseDocument.documents.length
  ) {
    throw new Error("Document not found");
  }

  // Belirtilen dokümanı sil
  caseDocument.documents.splice(documentIndex, 1);

  // Güncellenmiş Case belgesini kaydet ve döndür
  const updatedCase = await caseDocument.save();

  return updatedCase;
};
