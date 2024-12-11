import { create } from "zustand";

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
  },
  applications: [],

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  setFormData: (newData) =>
    set((state) => ({ formData: { ...state.formData, ...newData } })),

 resetFormData: () =>
  set((state) => ({
    formData: {
      ...state.formData, 
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
    },
  })),

    addApplication: () =>
      set((state) => ({
        applications: [
          ...state.applications,
          { id: Date.now(), ...state.formData },
        ],
      })),

  addApplicationLawyer: (applicationId, lawyerName) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === applicationId
          ? { ...app, lawyer: lawyerName }
          : app
      ),
    })),

  assignHandler: (applicationId, handlerName) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === applicationId
          ? { ...app, handler: handlerName }
          : app
      ),
    })),
    
    updateApplication: (applicationId) =>
      set((state) => ({
        applications: state.applications.map((app) =>
          app.id === applicationId ? { ...app, ...state.formData } : app
        ),
      })),
}));

export default useApplicationStore;
