import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useArchiveStore = create((set, get) => ({
  // Modal durumu
  isModalOpen: false,

  // Form verileri
  archiveData: {
    victimNameSurname: "",
    monitoringPeriod: null,
    type: "",
    eventCategory: "",
    eventSummary: "",
    link: "",
    documents: [], // Belgeler burada saklanacak
    source: "",
    imageLink: "",
    ngoInstitutionName: "",
    committeeName: "",
    publicInstitutionName: "",
  },

  // Modal açma/kapatma
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  // Verileri güncelleme fonksiyonu
  updateArchiveData: (field, value) =>
    set((state) => ({
      archiveData: {
        ...state.archiveData,
        [field]: value,
      },
    })),

  // Form sıfırlama fonksiyonu
  resetArchiveData: () =>
    set({
      archiveData: {
        victimNameSurname: "",
        monitoringPeriod: null,
        type: "",
        eventCategory: "",
        eventSummary: "",
        link: "",
        documents: [],
        source: "",
        imageLink: "",
        ngoInstitutionName: "",
        committeeName: "",
        publicInstitutionName: "",
      },
    }),

  // CRUD İşlevleri

  // Yeni hak ihlali ekleme
  createViolation: async (applicationId) => { // applicationId parametresi eklendi
    try {
      const { archiveData } = get();

      // API'ye gönderilecek ana payload
      const violationPayload = {
        ...archiveData,
        documents: [], // Başlangıçta belgeler boş
        applicationId,  // applicationId ekleniyor
      };

      console.log("Gönderilen Violation Payload:", violationPayload);

      // Hak ihlali kaydı oluşturma
      const createResponse = await axiosInstance.post(
        "/violations/create",
        violationPayload
      );

      const violationId = createResponse.data._id; // Oluşturulan hak ihlali ID'si

      // Belgeleri yükleme işlemi
      if (archiveData.documents && archiveData.documents.length > 0) {
        for (const file of archiveData.documents) {
          if (file instanceof File) {
            const fileFormData = new FormData();
            fileFormData.append("file", file); // Dosya
            fileFormData.append(
              "documentTitle",
              file.name // Dosya adı veya kullanıcıdan gelen başlık
            );

            console.log("Yüklenmekte Olan Dosya Payload:", fileFormData);

            // Dosyayı yükleme
            await axiosInstance.post(
              `/violations/${violationId}/upload`, // Doğru endpoint
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
      set({
        archiveData: {
          victimNameSurname: "",
          monitoringPeriod: null,
          type: "",
          eventCategory: "",
          eventSummary: "",
          link: "",
          documents: [],
          source: "",
          imageLink: "",
          ngoInstitutionName: "",
          committeeName: "",
          publicInstitutionName: "",
        },
        isModalOpen: false,
      });

      console.log("Hak ihlali başarıyla oluşturuldu!");
    } catch (error) {
      console.error("Hak ihlali eklenirken bir hata oluştu:", error.response?.data || error.message);
    }
  },

  // Tüm hak ihlallerini getirme
  getAllViolations: async (applicationId) => { // applicationId parametresi eklendi
    try {
      const response = await axiosInstance.get(`/violations/getall?applicationId=${applicationId}`);
      console.log("Fetched violations:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching violations:", error);
    }
  },

  // Belirli bir hak ihlalini getirme
  getViolationById: async (id, applicationId) => { // applicationId parametresi eklendi
    try {
      const response = await axiosInstance.get(`/violations/${id}?applicationId=${applicationId}`);
      console.log("Fetched violation:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching violation:", error);
    }
  },

  // Hak ihlali güncelleme
  updateViolation: async (id, data, applicationId) => { // applicationId parametresi eklendi
    try {
      const response = await axiosInstance.put(`/violations/update/${id}?applicationId=${applicationId}`, data);
      console.log("Violation updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating violation:", error);
    }
  },

  // Hak ihlali silme
  deleteViolation: async (id, applicationId) => { // applicationId parametresi eklendi
    try {
      const response = await axiosInstance.delete(`/violations/delete/${id}?applicationId=${applicationId}`);
      console.log("Violation deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting violation:", error);
    }
  },
}));

export default useArchiveStore;
