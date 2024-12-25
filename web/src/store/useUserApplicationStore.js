import { create } from "zustand";
import axiosInstance from "../utils/axiosInstanceWeb";

const useApplicationStore = create((set, get) => ({
  applications: [],
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

      const createResponse = await axiosInstance.post(
        "/applications/create",
        applicationPayload
      );

      const applicationId = createResponse.data._id; // Oluşturulan başvurunun ID'si

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
            await axiosInstance.post(
              `/applications/${applicationId}/upload`, // Doğru endpoint
              fileFormData,
              {
                headers: {
                  "Content-Type": "multipart/form-data", // FormData için gerekli
                },
              }
            );
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

      console.log("Başvuru başarıyla oluşturuldu!");
    } catch (error) {
      set({ error: "Başvuru eklenirken bir hata oluştu." });
      console.error(error.response?.data || error.message);
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
        processedBy: "",
      },
    }),
}));

export default useApplicationStore;
