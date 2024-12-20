import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

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
  isModalOpen: false, // Modal açılma durumu
  error: null, // Hata durumu

  // Tüm başvuruları getirme
  fetchApplications: async () => {
    try {
      const response = await axiosInstance.get("/applications/application-list");
      set({ applications: response.data, error: null });
      console.log("Başvurular:", response.data);
    } catch (error) {
      set({ error: "Başvurular alınamadı." });
      console.error(error);
    }
  },

  // Belirli bir başvuru detaylarını getirme
  fetchApplicationById: async (id) => {
    try {
      const response = await axiosInstance.get(`/applications/${id}`);
      set({ formData: response.data, error: null });
      console.log("Detaylı Başvuru Verisi:", response.data);
    } catch (error) {
      set({ error: "Başvuru detayları alınamadı." });
      console.error(error);
    }
  },

   // Yeni başvuru oluşturma
   addApplication: async () => {
    try {
      const { formData } = get();
      const payload = {
        ...formData,
        applicationDate: formData.applicationDate.toISOString(),
      };
      console.log("Gönderilen Payload:", payload);

      const response = await axiosInstance.post("/applications/create", payload);

      set((state) => ({
        applications: [...state.applications, response.data],
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
        isModalOpen: false,
        error: null,
      }));
    } catch (error) {
      set({ error: "Başvuru eklenirken bir hata oluştu." });
      console.error(error.response?.data || error.message);
    }
  },

  // Başvuruya belge ekleme
  addDocumentToApplication: async (applicationId, file, documentTitle) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("documentTitle", documentTitle);
  
      const response = await axiosInstance.post(
        `/applications/${applicationId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // FormData için gerekli header
          },
        }
      );
  
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
    const response = await axiosInstance.delete(
      `/applications/${applicationId}/documents/${index}`
    );

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

// Başvuruyu güncelleme
updateApplication: async (applicationId, updatedData) => {
  try {
    const response = await axiosInstance.put(
      `/applications/details/${applicationId}`,
      updatedData
    );

    // Güncellenmiş veriyi al ve uygulama listesini güncelle
    set((state) => ({
      applications: state.applications.map((app) =>
        app._id === applicationId ? response.data : app
      ),
      formData: response.data, // Güncel veriyi formda da saklayalım
      error: null,
    }));

    console.log("Başvuru başarıyla güncellendi:", response.data);
  } catch (error) {
    set({ error: "Başvuru güncellenirken bir hata oluştu." });
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

  // Modal kontrolü
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useApplicationStore;
