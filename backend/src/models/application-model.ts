import mongoose, { Schema, Document } from "mongoose";

// Başvuru Şeması Arayüzü
export interface IApplication extends Document {
  citizenId: string; // TC Kimlik numarası
  fullName: string; // Başvuran adı ve soyadı
  phone: string; // Telefon numarası
  email: string; // E-posta adresi
  address?: string; // Adres
  applicationDate: Date; // Başvuru tarihi
  violationId?: mongoose.Types.ObjectId; // Hak İhlali Şeması referansı
  eventCategory: string; // Olay kategorisi - (Kadın cinayeti vb.)
  eventSummary: string; // Olay başlığı
  eventDetails: string; // Olayın detayları
  documentTitle?: string; // Döküman başlığı
  documents?: {
    fileUrl: string;
    documentTitle: string;
    uploadedAt: Date;
  }[]; // Nesne listesi burada inline tanımlı
  processedBy?: string; // Başvuruyu düzenleyen baro personelinin adı
  lawyerId?: mongoose.Types.ObjectId; // Atanan avukatın referansı
}


// Başvuru Şeması
const ApplicationSchema: Schema = new Schema(
  {
    citizenId: { type: String, required: true, unique: true }, // TC Kimlik numarası
    fullName: { type: String, required: true }, // Ad ve soyad
    phone: { type: String, required: true }, // Telefon numarası
    email: { type: String, required: false }, // E-posta adresi
    address: { type: String, required: true }, // Adres
    applicationDate: { type: Date, required: true, default: Date.now }, // Başvuru tarihi
    violationId: { type: mongoose.Schema.Types.ObjectId, ref: "Violation" }, // Hak İhlali Şeması referansı
    eventCategory: { type: String, required: true }, // Olay kategorisi
    eventSummary: { type: String, required: true }, // Olay özeti
    eventDetails: { type: String, required: true }, // Olay detayları
    documentTitle: { type: String }, // Döküman başlığı
    documents: {
      type: [
        {
          fileUrl: { type: String, required: true },
          documentTitle: { type: String, required: true },
          uploadedAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    processedBy: { type: String }, // İşlem yapan baro personelinin adı
    lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Atanan avukat referansı
    caseId: { type: mongoose.Schema.Types.ObjectId, ref: "Case" },
  },
  { timestamps: true } // createdAt ve updatedAt otomatik eklenir
);

// Model
const Application = mongoose.model<IApplication>("Application", ApplicationSchema);
export default Application;
