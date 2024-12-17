import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useApplicationStore = create((set, get) => ({
  applications: [], // Başvuruların listesi
  formData: {       // Backend ile uyumlu veri
    citizenId: "",        // TC Kimlik numarası
    fullName: "",         // Ad Soyad
    phone: "",            // Telefon numarası
    email: "",            // E-posta
    address: "",          // Adres
    applicationDate: new Date(), // Tarih
    eventCategory: "",    // Olay kategorisi
    eventSummary: "",     // Olay başlığı
    eventDetails: "",     // Olay detayları
    documentTitle: "",    // Döküman başlığı
    documents: [],        // Döküman dosyaları
  },
  isModalOpen: false, // Modal açılma durumu
  error: null, // Hata durumu

  // Tüm başvuruları getirme
  fetchApplications: async () => {
    try {
      const response = await axiosInstance.get("/archive/application-list");
      set({ applications: response.data, error: null });
      console.log("Başvurular:", response.data); // Debug logu
    } catch (error) {
      set({ error: "Başvurular alınamadı." });
      console.error(error);
    }
  },

  // Belirli bir başvuru detaylarını getirme
  fetchApplicationById: async (id) => {
    try {
      const response = await axiosInstance.get(`/archive/${id}`);
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

      const response = await axiosInstance.post("/archive/create", payload);

      set((state) => ({
        applications: [...state.applications, response.data],
        formData: {}, // Formu sıfırla
        isModalOpen: false,
        error: null,
      }));
    } catch (error) {
      set({ error: "Başvuru eklenirken bir hata oluştu." });
      console.error(error.response?.data || error.message);
    }
  },

  // Başvuru güncelleme
  updateApplication: async (id) => {
    try {
      const { formData } = get();
  
      // applicationDate'i Date nesnesine dönüştür
      const applicationDate =
        formData.applicationDate instanceof Date
          ? formData.applicationDate
          : new Date(formData.applicationDate);
  
      const payload = {
        ...formData,
        applicationDate: applicationDate.toISOString(), // Date nesnesi garanti
      };
  
      const response = await axiosInstance.put(`/archive/details/${id}`, payload);
  
      set((state) => ({
        applications: state.applications.map((app) =>
          app._id === id ? response.data : app
        ),
        formData: response.data,
        isModalOpen: false,
        error: null,
      }));
    } catch (error) {
      set({ error: "Başvuru güncellenirken bir hata oluştu." });
      console.error(error);
    }
  },
  

  // Başvuru silme
  deleteApplication: async (id) => {
    try {
      await axiosInstance.delete(`/archive/${id}`);
      set((state) => ({
        applications: state.applications.filter((app) => app._id !== id),
        error: null,
      }));
    } catch (error) {
      set({ error: "Başvuru silinirken bir hata oluştu." });
      console.error(error);
    }
  },

  // Form verisini güncelleme
  setFormData: (data) =>
    set((state) => {
      // Callback function desteği ekle
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
      },
    }),

  // Modal kontrolü
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useApplicationStore;
