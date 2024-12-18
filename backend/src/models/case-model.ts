import mongoose, { Schema, Document } from "mongoose";

// Dava Şeması Arayüzü
export interface ICase extends Document {
  applicationId: mongoose.Types.ObjectId; // Bağlı olduğu başvuru ID'si
  lawyerId?: mongoose.Types.ObjectId; // Davayı takip eden avukat
  clientname : string // müvekkil ad-soyad 
  otherlawyer? : string // varsa yetkili diğer avukat 
  courtName: string; // Mahkeme adı veya CBS
  courtFileNo: string; // Mahkeme veya savcılık dosya numarası
  caseTitle: string; // Dava başlığı
  caseDescription: string; // Dava açıklaması
  documentTitle?: string; // Döküman başlığı (opsiyonel)
  documents?: string[]; // Yüklenen dosyalar
}

// Dava Şeması
const CaseSchema: Schema = new Schema(
  {
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true }, // Application ile bağlantı
    lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Sistemde kayıtlı bir avukat
    caseTitle: { type: String, required: true, unique: true },
    investigationNo: { type: String }, // Opsiyonel
    courtName: { type: String, required: true },
    courtFileNo: { type: String, required: true, unique: true },
    caseDescription: { type: String, required: true },
    documentTitle: { type: String },
    documents: { type: [String] }, // Dökümanları bir dizi olarak tutar
  },
  { timestamps: true } // createdAt ve updatedAt otomatik olarak eklenir
);

// Model
const Case = mongoose.model<ICase>("Case", CaseSchema);
export default Case;
