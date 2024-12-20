import {create} from "zustand";

const useApplicationStore = create((set) => ({
  formData: {
    fullName: "",
    citizenId: "",
    email: "",
    phone: "",
    address: "",
    applicationDate: null,
    eventCategory: "",
    eventSummary: "",
    eventDetails: "",
    documentTitle: "",
    documents: []
  },
  
  // Veriyi localStorage'dan almak
  loadFormData: () => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      set({ formData: JSON.parse(savedFormData) });
    }
  },

  // Veriyi güncelleme
  setFormData: (newData) => {
    set((state) => {
      const updatedFormData = { ...state.formData, ...newData };
      // Güncellenmiş veriyi localStorage'a kaydet
      localStorage.setItem("formData", JSON.stringify(updatedFormData));
      return { formData: updatedFormData };
    });
  },

  // Form verilerini sıfırlama
  resetFormData: () => {
    const emptyFormData = {
      fullName: "",
      citizenId: "",
      email: "",
      phone: "",
      address: "",
      applicationDate: null,
      eventCategory: "",
      eventSummary: "",
      eventDetails: "",
      documentTitle: "",
      documents: []
    };
    set({ formData: emptyFormData });
    localStorage.removeItem("formData");
  },
}));

export default useApplicationStore;
