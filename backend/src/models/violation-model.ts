import mongoose, { Schema, Document } from "mongoose";

// Violation Schema Interface
export interface IViolation extends Document {
  type: "Media Monitoring" | "NGO Data" | "Bar Association Committees" | "Public Institutions"; // Violation type
  monitoringPeriod: string; // Tarama dönemi
  eventCategory?: string; // Olay kategorisi
  eventSummary?: string; // Olay özeti
  link?: string; // Related link
  documents: { title: string; file: string }[]; // Uploaded documents (title and file URL)
  victimNameSurname?: string; // Victim's name and surname
  source?: string; // Only for Media Monitoring (optional)
  imageLink?: string; // Only for Media Monitoring (optional)
  ngoInstitutionName?: string; // Only for NGO Data (optional)
  committeeName?: string; // Only for Bar Association Committees (optional)
  publicInstitutionName?: string; // Only for Public Institutions (optional)
  applicationId?: mongoose.Types.ObjectId; // Başvuru referansı
}

// Violation Schema
const ViolationSchema = new Schema<IViolation>(
  {
    type: {
      type: String,
      enum: [
        "Media Monitoring",
        "NGO Data",
        "Bar Association Committees",
        "Public Institutions",
      ],
      required: true,
    },
    monitoringPeriod: { type: String, required: true }, // Tarama dönemi
    eventCategory: { type: String }, // Olay kategorisi
    eventSummary: { type: String }, // Olay özeti
    link: { type: String }, // Opsiyonel
    documents: [
      {
        title: { type: String, required: true }, // Dosya başlığı
        file: { type: String, required: true }, // Dosya URL'si
      },
    ],
    victimNameSurname: { type: String }, // Opsiyonel
    source: { type: String }, // Media Monitoring için
    imageLink: { type: String }, // Media Monitoring için
    ngoInstitutionName: { type: String }, // NGO Data için
    committeeName: { type: String }, // Bar Association Committees için
    publicInstitutionName: { type: String }, // Public Institutions için
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application" }, // Başvuru referansı
  },
  {
    timestamps: true, // Oluşturma ve güncelleme tarihleri
  }
);

// Violation Model
const Violation = mongoose.model<IViolation>("Violation", ViolationSchema);

export default Violation;
