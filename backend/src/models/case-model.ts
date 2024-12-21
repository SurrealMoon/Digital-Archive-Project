import mongoose, { Schema, Document } from "mongoose";

// Dava Şeması Arayüzü
export interface ICase extends Document {
  applicationId: mongoose.Types.ObjectId; // Bağlı olduğu başvuru ID'si
  lawyerId?: mongoose.Types.ObjectId; // Davayı takip eden avukat
  clientname: string; // Müvekkil ad-soyad
  otherlawyer?: string; // Opsiyonel, varsa diğer avukat
  courtName?: string; // Mahkeme adı veya CBS
  courtFileOrInsvestigationNo?: string; // Mahkeme veya savcılık dosya numarası
  caseTitle?: string; // Dava başlığı
  caseDescription?: string; // Dava açıklaması
  documentTitle?: string; // Döküman başlığı (opsiyonel)
  documents?: string[]; // Yüklenen dosyalar
 
}

// Dava Şeması
const CaseSchema: Schema = new Schema(
  {
    applicationId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Application", 
      required: true 
    }, // Application ile bağlantı
    lawyerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }, // Sistemde kayıtlı bir avukat
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
    },
    clientname: { 
      type: String, 
      required: true 
    }, // Müvekkil adı-soyadı
    otherlawyer: { 
      type: String 
    }, // Opsiyonel, varsa diğer avukat
    courtName: { 
      type: String 
    }, // Mahkeme adı veya CBS (opsiyonel hale getirildi)
    courtFileOrInsvestigationNo: { 
      type: String 
    }, // Mahkeme dosya numarası veya soruşturma numarası (opsiyonel hale getirildi)
    caseTitle: { 
      type: String 
    }, // Dava başlığı (opsiyonel hale getirildi)
    caseDescription: { 
      type: String 
    }, // Dava açıklaması (opsiyonel hale getirildi)
    documentTitle: { 
      type: String 
    }, // Döküman başlığı (opsiyonel)
    documents: { 
      type: [String] 
    }, // Yüklenen dosyaların dizisi
  },
  { timestamps: true } // createdAt ve updatedAt otomatik olarak eklenir
);


// Model
const Case = mongoose.model<ICase>("Case", CaseSchema);
export default Case;
