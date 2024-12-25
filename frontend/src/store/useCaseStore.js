import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useCaseStore = create((set, get) => ({
  formData: {
    applicationId: "",
    clientname: "",
    otherlawyer: "",
    courtName: "",
    courtFileOrInvestigationNo: "", // Mahkeme dosya numarası
    caseTitle: "",
    caseDescription: "",
    documents: [], // Sadece davaya ait belgeler
  },

  cases: [],
  loading: false,
  error: null,

  // Form datasını güncellemek için
  setFormData: (newData) =>
    set((state) => ({
      formData: { ...state.formData, ...newData },
    })),

  // Tüm davaları getir
  fetchCases: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/cases/getallcases");
      const fetchedCases = response.data.map((caseItem) => ({
        id: caseItem._id,
        name: caseItem.applicationId?.fullName || "Belirtilmemiş", // Başvuran adı-soyadı
        citizenId: caseItem.applicationId?.citizenId || "Belirtilmemiş", // Kimlik numarası
        phone: caseItem.applicationId?.phone || "Belirtilmemiş", // Telefon numarası
        email: caseItem.applicationId?.email || "Belirtilmemiş", // E-posta adresi
        address: caseItem.applicationId?.address || "Belirtilmemiş", // Adres
        applicationDate: caseItem.applicationId?.applicationDate || "Belirtilmemiş", // Başvuru tarihi
        eventCategory: caseItem.applicationId?.eventCategory || "Belirtilmemiş", // Olay kategorisi
        eventSummary: caseItem.applicationId?.eventSummary || "Belirtilmemiş", // Olay özeti
        eventDetails: caseItem.applicationId?.eventDetails || "Belirtilmemiş", // Olay detayları
        applicationDocuments: caseItem.applicationId?.documents || [], // Başvuru belgeleri
        lawyerName: caseItem.lawyerId?.fullName || "Belirtilmemiş", // Atanan avukat
        clientname: caseItem.clientname, // Müvekkil adı
        otherlawyer: caseItem.otherlawyer, // Diğer avukat
        courtName: caseItem.courtName || "Belirtilmemiş", // Mahkeme adı
        courtFileOrInvestigationNo: caseItem.courtFileOrInvestigationNo || "Belirtilmemiş", // Mahkeme dosya numarası
        caseTitle: caseItem.caseTitle || "Belirtilmemiş", // Dava başlığı
        caseDescription: caseItem.caseDescription || "Belirtilmemiş", // Dava açıklaması
        caseDocuments: caseItem.documents || [], // Davaya ait belgeler
      }));
  
      set({ cases: fetchedCases, loading: false });
    } catch (error) {
      console.error("Dava listesi alınırken hata oluştu:", error);
      set({ error: error.message, loading: false });
    }
  },
  
  // Yeni dava ekle
  addCase: async () => {
    const formData = get().formData;
    try {
      const response = await axiosInstance.post("/cases/create", formData);
      const newCase = response.data;

      set((state) => ({
        cases: [...state.cases, newCase],
        formData: {
          applicationId: "",
          clientname: "",
          otherlawyer: "",
          courtName: "",
          courtFileOrInvestigationNo: "",
          caseTitle: "",
          caseDescription: "",
          documents: [],
        },
        error: null,
      }));

      console.log("Yeni dava kaydedildi:", newCase);
    } catch (error) {
      console.error("Dava kaydedilirken hata oluştu:", error);
      set({ error: "Dava kaydedilirken bir hata oluştu." });
    }
  },

  // Belirli bir dava getir
  getCaseById: async (id) => {
    try {
      const response = await axiosInstance.get(`/cases/${id}`);
      return response.data || null; // API'den gelen davayı döndür
    } catch (error) {
      console.error("Error fetching case by ID:", error);
      set({ error: "Dava getirilemedi." });
      return null;
    }
  },
  // Dava güncelle
  updateCase: async (id, formData) => {
    try {
      const { applicationId, ...filteredFormData } = formData; // applicationId çıkarılıyor
      const response = await axiosInstance.put(`/cases/${id}/update`, filteredFormData);
      const updatedCase = response.data;
  
      set((state) => ({
        cases: state.cases.map((caseItem) =>
          caseItem.id === id ? { ...caseItem, ...updatedCase } : caseItem
        ),
        formData: {
          ...state.formData,
          documents: updatedCase.documents || [],
        },
        error: null,
      }));
  
      console.log("Dava başarıyla güncellendi:", updatedCase);
    } catch (error) {
      console.error("Dava güncellenirken hata oluştu:", error.response?.data || error);
      set({ error: error.response?.data?.message || "Dava güncellenirken bir hata oluştu." });
    }
  },  
  
  // Davaya belge ekle
  addDocumentToCase: async (caseId, documentTitle, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentTitle", documentTitle);
  
    try {
      const response = await axiosInstance.post(`/cases/${caseId}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Backend'den dönen yanıtı kontrol et
      const updatedCase = response?.data?.updatedCase;
      if (!updatedCase) {
        throw new Error("Belge yükleme işleminde hata oluştu.");
      }
  
      // State güncelle
      set((state) => ({
        cases: state.cases.map((caseItem) =>
          caseItem.id === caseId ? { ...caseItem, ...updatedCase } : caseItem
        ),
        formData: {
          ...state.formData,
          documents: updatedCase.documents || [], // Yüklenen dökümanları güncelle
        },
        error: null,
      }));
  
      console.log(`Dava (${caseId}) için döküman yüklendi:`, updatedCase);
      return updatedCase;
    } catch (error) {
      console.error("Döküman yüklenirken hata oluştu:", error.response || error);
      set({ error: error.response?.data?.message || "Döküman yüklenirken bir hata oluştu." });
      throw error; // Hatanın üst katmana ulaşmasını sağla
    }
  },  

  // Davadan belge sil
  removeDocumentFromCase: async (caseId, index) => {
    try {
      const response = await axiosInstance.delete(`/cases/${caseId}/documents/${index}`);
      const updatedCase = response.data.updatedCase;

      set((state) => ({
        cases: state.cases.map((caseItem) =>
          caseItem.id === caseId ? { ...caseItem, ...updatedCase } : caseItem
        ),
        error: null,
      }));

      console.log(`Dava (${caseId}) için döküman silindi:`, updatedCase);
    } catch (error) {
      console.error("Döküman silinirken hata oluştu:", error.response || error);
      set({ error: error.response?.data?.message || "Döküman silinirken bir hata oluştu." });
    }
  },

  closeModal: () =>
    set(() => ({
      formData: {
        applicationId: "",
        clientname: "",
        otherlawyer: "",
        courtName: "",
        courtFileOrInvestigationNo: "",
        caseTitle: "",
        caseDescription: "",
        documents: [],
      },
    })),

  resetFormData: () =>
    set(() => ({
      formData: {
        applicationId: "",
        clientname: "",
        otherlawyer: "",
        courtName: "",
        courtFileOrInvestigationNo: "",
        caseTitle: "",
        caseDescription: "",
        documents: [],
      },
    })),
}));

export default useCaseStore;
