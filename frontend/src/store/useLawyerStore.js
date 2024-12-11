import { create } from "zustand";

const useLawyerStore = create((set) => ({
  formData: {
    name: "",
    idNumber: "",
    barNumber: "",
    email: "",
    phone: "",
  },
  lawyers: [],
  isModalOpen: false,

  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),

  addLawyer: () =>
    set((state) => ({
      lawyers: [...state.lawyers, state.formData],
    })),

  resetFormData: () =>
    set({
      formData: {
        name: "",
        idNumber: "",
        barNumber: "",
        email: "",
        phone: "",
      },
    }),

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useLawyerStore;
