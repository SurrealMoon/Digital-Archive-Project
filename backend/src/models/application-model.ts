import mongoose, { Schema, Document } from "mongoose";

// Başvuru Şeması Arayüzü
export interface IApplication extends Document {
  citizenId: string; // TC Kimlik numarası
  fullName: string; // Başvuran adı ve soyadı
  phone: string; // Telefon numarası
  email: string; // E-posta adresi
  address?: string; // Adres
  applicationDate: Date; // Başvuru tarihi
  violationType: string; // Vatandaşın yazdığı olay türü
  violationId?: mongoose.Types.ObjectId; // Hak İhlali Şeması referansı
  eventSummary: string; // Olay özeti
  eventDetails: string; // Olayın detayları
  documentTitle?: string; // Döküman başlığı
  documents?: string[]; // Dökümanlar (dosya yolları)
  processedBy?: string; // Başvuruyu düzenleyen baro personelinin adı
  lawyerId?: mongoose.Types.ObjectId; // Atanan avukatın referansı
}

// Başvuru Şeması
const ApplicationSchema: Schema = new Schema(
  {
    citizenId: { type: String, required: true, unique: true }, // TC Kimlik numarası
    fullName: { type: String, required: true }, // Ad ve soyad
    phone: { type: String, required: true }, // Telefon numarası
    email: { type: String, required: true }, // E-posta adresi
    address: { type: String }, // Adres
    applicationDate: { type: Date, required: true, default: Date.now }, // Başvuru tarihi
    violationType: { type: String, required: true }, // Vatandaşın yazdığı olay türü
    violationId: { type: mongoose.Schema.Types.ObjectId, ref: "Violation" }, // Hak İhlali Şeması referansı
    eventSummary: { type: String, required: true }, // Olay özeti
    eventDetails: { type: String, required: true }, // Olay detayları
    documentTitle: { type: String }, // Döküman başlığı
    documents: { type: [String] }, // Dökümanlar (dosya yolları)
    processedBy: { type: String }, // İşlem yapan baro personelinin adı
    lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Atanan avukat referansı
  },
  { timestamps: true } // createdAt ve updatedAt otomatik eklenir
);

// Model
const Application = mongoose.model<IApplication>("Application", ApplicationSchema);
export default Application;
