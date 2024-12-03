import mongoose from 'mongoose';

// Şema tanımı
const ArchiveSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Medya Taraması', 'STK Verileri', 'Baro Komisyonları', 'Kamu Kurumları'],
      required: true,
    },
    taramaDonemi: { type: String, required: true }, // Ortak alan
    olayKategorisi: { type: String, required: true }, // Ortak alan
    olayOzeti: { type: String, required: true }, // Ortak alan
    link: { type: String }, // Ortak alan
    dosyaYukleme: { type: String }, // Ortak alan
    magdurAdSoyad: { type: String, required: true }, // Ortak alan

    // Medya Taraması'na özel alanlar
    kaynak: { type: String }, // Sadece Medya Taraması için
    gorselLink: { type: String }, // Sadece Medya Taraması için

    // STK Verileri'ne özel alanlar
    kurumAdiSTK: { type: String }, // Sadece STK Verileri için

    // Baro Komisyonları'na özel alanlar
    komisyonAdi: { type: String }, // Sadece Baro Komisyonları için

    // Kamu Kurumları'na özel alanlar
    kurumAdiKamu: { type: String }, // Sadece Kamu Kurumları için
  },
  { timestamps: true } // Her kayıt için oluşturulma ve güncellenme zamanı
);

// Şema için doğrulama (kategoriye özgü zorunluluklar)
ArchiveSchema.pre('validate', function (next) {
  const requiredFieldsByType: Record<string, string[]> = {
    'Medya Taraması': ['kaynak', 'gorselLink'],
    'STK Verileri': ['kurumAdiSTK'],
    'Baro Komisyonları': ['komisyonAdi'],
    'Kamu Kurumları': ['kurumAdiKamu'],
  };

  const requiredFields = requiredFieldsByType[this.type] || [];
  for (const field of requiredFields) {
    if (!(this as any)[field]) {
      return next(new Error(`${field} is required for type ${this.type}`));
    }
  }

  next();
});

// Modeli oluşturma
const Archive = mongoose.model('Archive', ArchiveSchema);

export default Archive;
