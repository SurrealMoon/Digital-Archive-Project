import mongoose, { Schema, Document } from "mongoose";

// Dava Şeması Arayüzü
export interface ICase extends Document {
  applicationId: mongoose.Types.ObjectId; // Bağlı olduğu başvuru ID'si
  lawyerId?: mongoose.Types.ObjectId; // Davayı takip eden avukat
  clientname: string; // Müvekkil adı-soyadı
  otherlawyer?: string; // Opsiyonel, varsa diğer avukat
  courtName?: string; // Mahkeme adı
  courtFileOrInvestigationNo?: string; // Mahkeme veya savcılık dosya numarası
  caseTitle?: string; // Dava başlığı
  caseDescription?: string; // Dava açıklaması
  documentTitle?: string; // Döküman başlığı
  documents?: {
    fileUrl: string;
    documentTitle: string;
    uploadedAt: Date;
  }[]; // Yüklenen dosyaların listesi
}

// Dava Şeması
const CaseSchema: Schema = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
    lawyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    clientname: {
      type: String,
      required: true,
    },
    otherlawyer: {
      type: String,
    },
    courtName: {
      type: String,
    },
    courtFileOrInvestigationNo: {
      type: String,
    },
    caseTitle: {
      type: String,
    },
    caseDescription: {
      type: String,
    },
    documentTitle: {
      type: String,
    },
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
  },
  { timestamps: true }
);

const Case = mongoose.model<ICase>("Case", CaseSchema);
export default Case;
