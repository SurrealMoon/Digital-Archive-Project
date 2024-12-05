import mongoose, { Schema, Document } from "mongoose";

// Başvuru Şeması Arayüzü
export interface IApplication extends Document {
  tcKimlik: string;
  adSoyad: string;
  telefon: string;
  email: string;
  adres?: string;
  basvuruTarihi: Date;
  hakIhlaliTuru: string; // Vatandaşın yazdığı olay türü
  hakIhlaliId?: mongoose.Types.ObjectId; // Hak İhlali Şeması referansı
  olayOzeti: string;
  olayDetayi: string;
  dokumanBaslik?: string;
  dokumanlar?: string[];
  islemYapanPersonel?: string; // Başvuruyla ilgilenen baro personeli
  avukatId?: mongoose.Types.ObjectId; // Atanan avukat
}

// Başvuru Şeması
const ApplicationSchema: Schema = new Schema(
  {
    tcKimlik: { type: String, required: true, unique: true },
    adSoyad: { type: String, required: true },
    telefon: { type: String, required: true },
    email: { type: String, required: true },
    adres: { type: String },
    basvuruTarihi: { type: Date, required: true, default: Date.now },
    hakIhlaliTuru: { type: String, required: true }, // Vatandaşın yazdığı olay türü
    hakIhlaliId: { type: mongoose.Schema.Types.ObjectId, ref: "Violation" }, // Hak İhlali Şeması referansı
    olayOzeti: { type: String, required: true },
    olayDetayi: { type: String, required: true },
    dokumanBaslik: { type: String },
    dokumanlar: { type: [String] }, // Dosyaları liste olarak tutar
    islemYapanPersonel: { type: String }, // Başvuruyu düzenleyen baro personeli
    avukatId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Atanan avukat
  },
  { timestamps: true } // createdAt ve updatedAt otomatik eklenir
);

// Model
const Application = mongoose.model<IApplication>("Application", ApplicationSchema);
export default Application;
