import { create } from "zustand";

const useArchiveStore = create((set) => ({
  isModalOpen: false,
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

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  updateArchiveData: (field, value) =>
    set((state) => ({
      archiveData: { ...state.archiveData, [field]: value },
    })),
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
