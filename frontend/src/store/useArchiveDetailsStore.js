import {create} from "zustand";

const useArchiveStore = create((set) => ({
  // Modal durumu
  isModalOpen: false,

  // Form verileri
  archiveData: {
    fullName: "",
    scanPeriod: null,
    archiveCategory: "",
    eventCategory: "",
    eventSummary: "",
    link: "",
    uploadedFiles: [],
    source: "",
    visualLink: "",
    ngoName: "",
    barAssociationName: "",
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
        fullName: "",
        scanPeriod: null,
        archiveCategory: "",
        eventCategory: "",
        eventSummary: "",
        link: "",
        uploadedFiles: [],
        source: "",
        visualLink: "",
        ngoName: "",
        barAssociationName: "",
        publicInstitutionName: "",
      },
    }),
}));

export default useArchiveStore;
