import {create} from "zustand";

const useApplicationStore = create((set) => ({
  isModalOpen: false,
  formData: {
    name: "",
    idNumber: "",
    email: "",
    phone: "",
    address: "",
    applicationDate: new Date(),
    category: "",
    reason: "",
    summary: "",
    documentInfo: "",
    documents: [],
    index: "",
    lawyer: { name: "", id: "" }, // Avukat bilgisi
    courtName: "", // Mahkeme Adı
    caseSummary: "", // Dava Özeti
    additionalLawyers: "", // Diğer Yetkili Vekiller
  },
  applications: [],
  cases: [], // Case listesi eklendi

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  setFormData: (newData) => 
    set((state) => ({ formData: { ...state.formData, ...newData } })),

  resetFormData: () => 
    set(() => ({
      formData: {
        name: "",
        idNumber: "",
        email: "",
        phone: "",
        address: "",
        applicationDate: new Date(),
        category: "",
        reason: "",
        summary: "",
        documentInfo: "",
        documents: [],
        index: "",
        lawyer: { name: "", id: "" },
        courtName: "",
        caseSummary: "",
        additionalLawyers: "",
      },
    })),

  addApplication: () =>
    set((state) => {
      const newApplication = {
        id: Date.now(),
        ...state.formData,
      };

      // Yeni başvuruyu applications'a ekliyoruz
      const updatedApplications = [...state.applications, newApplication];

      // Ayrıca, yeni bir case ekliyoruz (eğer case eklenmesi gerekiyorsa)
      const newCase = {
        id: Date.now(), // Her case'in benzersiz bir ID'si olmalı
        applicationId: newApplication.id, // Başvuru ID'sini case'e bağlıyoruz
        courtName: state.formData.courtName,
        caseSummary: state.formData.caseSummary,
        // diğer gerekli case verilerini buraya ekleyebilirsiniz
      };

      // Case listesine yeni case'i ekliyoruz
      const updatedCases = [...state.cases, newCase];

      return {
        applications: updatedApplications,
        cases: updatedCases, // cases listesine yeni case'i ekliyoruz
      };
    }),

  updateApplication: (applicationId) =>
    set((state) => {
      // Başvuru güncelleme
      const updatedApplications = state.applications.map((app) =>
        app.id === applicationId ? { ...app, ...state.formData } : app
      );

      // İlgili case'i güncelleme
      const updatedCases = state.cases.map((caseItem) =>
        caseItem.applicationId === applicationId
          ? { ...caseItem, ...state.formData } // Dava verilerini de güncelliyoruz
          : caseItem
      );

      return {
        applications: updatedApplications,
        cases: updatedCases,
      };
    }),

  addApplicationLawyer: (applicationId, lawyer) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === applicationId
          ? { ...app, lawyer: { name: lawyer.name, id: lawyer.id } }
          : app
      ),
      // Eğer avukat bilgisi dava ile ilişkilendirilecekse, bunu da ekleyebilirsiniz
      cases: state.cases.map((caseItem) =>
        caseItem.applicationId === applicationId
          ? { ...caseItem, lawyer: { name: lawyer.name, id: lawyer.id } }
          : caseItem
      ),
    })),
}));

export default useApplicationStore;

