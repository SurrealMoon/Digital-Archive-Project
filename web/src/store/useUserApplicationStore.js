import { create } from "zustand";
import axios from "axios";

const useApplicationStore = create((set, get) => ({
  applications: [], // Başvuruların listesi
  formData: {
    citizenId: "", // TC Kimlik numarası
    fullName: "", // Ad Soyad
    phone: "", // Telefon numarası
    email: "", // E-posta
    address: "", // Adres
    applicationDate: new Date(), // Tarih
    eventCategory: "", // Olay kategorisi
    eventSummary: "", // Olay başlığı
    eventDetails: "", // Olay detayları
    documents: [], // Belgeler
    processedBy: "", // Başvuruyu alan kişi
  },
  error: null, // Hata durumu

  // Yeni başvuru oluşturma
  addApplication: async () => {
    try {
      const { formData } = get();

      // Yeni başvuru oluştur
      const applicationPayload = {
        ...formData,
        applicationDate: formData.applicationDate.toISOString(),
        documents: [], // İlk başta boş bir documents gönderiyoruz
      };

      console.log("Gönderilen Başvuru Payload:", applicationPayload);

      const createResponse = await axios.post("api/applications/create", applicationPayload);

      // Oluşturulan başvurunun ID'si
      const applicationId = createResponse.data._id;

      // Eğer birden fazla dosya yüklendiyse, dosyaları sırayla yükle
      if (formData.documents && formData.documents.length > 0) {
        for (const file of formData.documents) {
          if (file instanceof File) {
            const fileFormData = new FormData();
            fileFormData.append("file", file); // Dosya
            fileFormData.append(
              "documentTitle",
              formData.documentTitle || file.name // Dosya başlığı
            );

            console.log("Yüklenmekte Olan Dosya Payload:", fileFormData);

            // Dosyayı yükleme
            await axios.post(`/applications/${applicationId}/upload`, fileFormData, {
              headers: {
                "Content-Type": "multipart/form-data", // FormData için gerekli
              },
            });
          }
        }
      }

      // State'i güncelle
      set((state) => ({
        applications: [...state.applications, createResponse.data],
        formData: {
          citizenId: "",
          fullName: "",
          phone: "",
          email: "",
          address: "",
          applicationDate: new Date(),
          eventCategory: "",
          eventSummary: "",
          eventDetails: "",
          documents: [], // Formdan yüklenen dokümanları sıfırla
          processedBy: "",
        },
        error: null,
      }));

      alert("Başvuru başarıyla oluşturuldu!");
    } catch (error) {
      set({ error: "Başvuru eklenirken bir hata oluştu." });
      console.error(error.response?.data || error.message);
    }
  },

  // Başvurudan belge ekleme
  addDocumentToApplication: async (applicationId, file, documentTitle) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("documentTitle", documentTitle);

      const response = await axios.post(`api/applications/${applicationId}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // FormData için gerekli header
        },
      });

      const { fileUrl } = response.data;

      // Store'daki veriyi güncelle
      set((state) => ({
        formData: {
          ...state.formData,
          documents: [
            ...state.formData.documents,
            { fileUrl, documentTitle, uploadedAt: new Date() },
          ],
        },
        error: null,
      }));

      console.log("Dosya başarıyla yüklendi:", fileUrl);
    } catch (error) {
      set({ error: "Dosya yükleme sırasında bir hata oluştu." });
      console.error(error);
    }
  },

  // Başvurudan belge silme
  removeDocumentFromApplication: async (applicationId, index) => {
    try {
      const response = await axios.delete(`api/applications/${applicationId}/documents/${index}`);

      const updatedDocuments = response.data.documents; // Güncellenmiş döküman listesi

      // Store'daki formData'da dökümanları güncelle
      set((state) => ({
        formData: {
          ...state.formData,
          documents: updatedDocuments,
        },
        error: null,
      }));

      console.log("Belge başarıyla silindi:", updatedDocuments);
    } catch (error) {
      set({ error: "Belge silinirken bir hata oluştu." });
      console.error(error);
    }
  },

  // Form verisini güncelleme
  setFormData: (data) =>
    set((state) => {
      if (typeof data === "function") {
        return { formData: { ...state.formData, ...data(state.formData) } };
      }

      if (data && typeof data === "object" && !Array.isArray(data)) {
        return { formData: { ...state.formData, ...data } };
      }

      console.warn("setFormData: Geçersiz veri formatı", data);
      return state;
    }),

  // Tek bir form alanını güncelleme
  updateFormField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  // Formu sıfırlama
  resetFormData: () =>
    set({
      formData: {
        citizenId: "",
        fullName: "",
        phone: "",
        email: "",
        address: "",
        applicationDate: new Date(),
        eventCategory: "",
        eventSummary: "",
        eventDetails: "",
        documents: [],
        processedBy: "", // Başvuruyu alan kişi alanını sıfırla
      },
    }),
}));

export default useApplicationStore;
