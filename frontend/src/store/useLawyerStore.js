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
  editingLawyer: null, // Düzenlenecek avukat bilgisi

  // Form verilerini güncelle
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),

  // Yeni avukat ekle
  addLawyer: () =>
    set((state) => ({
      lawyers: [
        ...state.lawyers,
        { id: Date.now(), ...state.formData }, // Benzersiz ID ile avukat ekle
      ],
    })),

  // Avukat düzenle
  updateLawyer: () =>
    set((state) => ({
      lawyers: state.lawyers.map((lawyer) =>
        lawyer.id === state.editingLawyer.id
          ? { ...lawyer, ...state.formData } // Düzenlenen avukatı güncelle
          : lawyer
      ),
    })),

  // Formu sıfırla
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

  // Düzenlenecek avukatı ayarla
  setEditingLawyer: (lawyer) =>
    set((state) => ({
      editingLawyer: lawyer,
      formData: lawyer ? { ...lawyer } : state.formData, // Düzenleme için formu doldur
    })),

  // Modal kontrolü
  openModal: () => set({ isModalOpen: true }),
  closeModal: () =>
    set((state) => ({
      isModalOpen: false,
      editingLawyer: null, // Modal kapandığında düzenleme durumunu sıfırla
    })),
}));

export default useLawyerStore;
