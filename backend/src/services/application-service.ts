import mongoose from "mongoose";
import Application, { IApplication } from "../models/application-model";
import User from "../models/user-model";
import { createCaseService } from "./case-service";


// Yeni Başvuru Oluşturma
export const createApplicationService = async (
  data: Partial<IApplication>
): Promise<IApplication> => {
  const application = new Application(data);
  return await application.save();
};

// Tüm Başvuruları Listeleme
export const getAllApplicationsService = async (): Promise<IApplication[]> => {
  return await Application.find()
    .populate({
      path: "lawyerId", // lawyerId alanını ilişkilendiriyoruz
      model : User, // User modelinden veri çekiyoruz
      select: "fullName email phone", // Döndürülecek alanlar
    });
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

// Avukat Atama ve Dava Oluşturma
export const assignLawyerService = async (
  applicationId: string,
  lawyerId: string
): Promise<IApplication | null> => {
  // Geçerli ID kontrolü
  if (!mongoose.isValidObjectId(applicationId) || !mongoose.isValidObjectId(lawyerId)) {
    throw new Error("Invalid applicationId or lawyerId");
  }

  // Başvuruyu bul
  const application = (await Application.findById(applicationId)) as IApplication;

  if (!application) {
    throw new Error("Application not found");
  }

  // lawyerId'yi ObjectId formatına dönüştür
  application.lawyerId = new mongoose.Types.ObjectId(lawyerId);

  // Eğer caseId yoksa yeni bir dava oluştur
  if (!application.caseId) {
    const newCase = await createCaseService({
      applicationId: application._id as mongoose.Types.ObjectId,
      lawyerId: application.lawyerId as mongoose.Types.ObjectId,
      clientname: application.fullName,
      courtName: "",
      courtFileOrInvestigationNo: "",
      caseTitle: `Case for ${application.eventCategory}`,
      caseDescription: application.eventDetails,
    });

    // Dava ID'sini başvuruya ekle
    application.caseId = newCase._id as mongoose.Types.ObjectId;
  }

  // Güncellenmiş başvuruyu kaydet
  const updatedApplication = await application.save();

  return updatedApplication;
};

// Hak İhlali Ekleme
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

export const addDocumentToApplication = async (
  applicationId: string,
  fileUrl: string,
  documentTitle: string
) => {

  // Başvuru belgesini veritabanından al
  const application = await Application.findById(applicationId);

  if (!application) {
    console.error("Application not found for ID:", applicationId);
    throw new Error('Application not found'); 
  }

  console.log("Application found:", application);

  // Eklemek istediğiniz doküman
  const newDocument = {
    fileUrl,
    documentTitle,
    uploadedAt: new Date(),
  };

  // Başvurunun documents alanına dokümanı ekle
  if (!Array.isArray(application.documents)) {
    console.error("Invalid documents structure in application:", application.documents);
    throw new Error('Invalid application documents structure');
  }

  console.log("Adding new document:", newDocument);

  application.documents.push(newDocument);

  // Güncellenmiş başvuruyu kaydet ve döndür
  const updatedApplication = await application.save();
  console.log("Updated application successfully:", updatedApplication);

  return updatedApplication;
};


export const removeDocumentFromApplication = async (
  applicationId: string,
  documentIndex: number
) => {
  const application = await Application.findById(applicationId);

  if (!application) {
    throw new Error('Application not found');
  }

  // documents property'sinin undefined olup olmadığını kontrol et
  if (!application.documents || application.documents.length <= documentIndex || documentIndex < 0) {
    throw new Error('Document not found');
  }

  // Silme işlemi
  application.documents.splice(documentIndex, 1);

  // Güncellenmiş başvuruyu kaydet
  const updatedApplication = await application.save();

  return updatedApplication;
};

