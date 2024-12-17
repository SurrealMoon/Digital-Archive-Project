import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useLawyerStore = create((set, get) => ({
  formData: {
    username: "", // Baro Sicil No otomatik atanacak
    password: "", // Şifre
    fullName: "", // Ad-Soyad
    tcNumber: "", // T.C. Kimlik No
    baroSicilNo: "", // Baro Sicil No
    email: "", // E-mail
    phone: "", // Telefon
    role: "lawyer", // Varsayılan olarak "lawyer"
  },
  lawyers: [],
  isModalOpen: false,
  editingLawyer: null,
  error: null,

  // Tüm avukatları listeleme
  fetchLawyers: async () => {
    try {
      const response = await axiosInstance.get("/users/lawyers"); // GET /api/users/lawyers
      set({ lawyers: response.data });
    } catch (error) {
      console.error("Avukatlar alınırken hata oluştu:", error);
      set({ error: "Avukatlar yüklenirken hata oluştu." });
    }
  },

  // Yeni avukat ekleme
  addLawyer: async () => {
    try {
      const { formData } = get();

      // Username'i baroSicilNo olarak ayarla
      const payload = {
        ...formData,
        username: formData.baroSicilNo, // Kullanıcı adı Baro Sicil No olacak
      };

      const response = await axiosInstance.post("/users", payload); // POST /api/users
      set((state) => ({
        lawyers: [...state.lawyers, response.data],
        isModalOpen: false,
        error: null,
      }));
      // Yeni eklenen avukatı listele
      await get().fetchLawyers(); // Avukatlar listesini güncelle
    } catch (error) {
      console.error("Avukat eklenirken hata oluştu:", error.response?.data || error);
      set({ error: "Avukat eklenirken hata oluştu." });
    }
  },

  // Avukat güncelleme
  updateLawyer: async () => {
    try {
      const { formData, editingLawyer } = get();
      const payload = {
        ...formData,
        username: formData.baroSicilNo, // Username olarak Baro Sicil No kullanılıyor
      };

      // PUT /api/users/:id
      const response = await axiosInstance.put(`/users/${editingLawyer._id}`, payload);
      set((state) => ({
        lawyers: state.lawyers.map((lawyer) =>
          lawyer._id === editingLawyer._id ? response.data : lawyer
        ),
        isModalOpen: false,
        error: null,
      }));
      // Listeyi tekrar güncelle
      await get().fetchLawyers();
    } catch (error) {
      console.error("Avukat güncellenirken hata oluştu:", error.response?.data || error);
      set({ error: "Avukat güncellenirken hata oluştu." });
    }
  },

  // Avukat silme
  deleteLawyer: async (id) => {
    try {
      // DELETE /api/users/:id
      await axiosInstance.delete(`/users/${id}`);
      set((state) => ({
        lawyers: state.lawyers.filter((lawyer) => lawyer._id !== id),
        error: null,
      }));
      // Listeyi tekrar güncelle
      await get().fetchLawyers();
    } catch (error) {
      console.error("Avukat silinirken hata oluştu:", error.response?.data || error);
      set({ error: "Avukat silinirken hata oluştu." });
    }
  },

  // Form verilerini güncelle
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),

  // Formu sıfırla
  resetFormData: () =>
    set({
      formData: {
        username: "",
        password: "",
        fullName: "",
        tcNumber: "",
        baroSicilNo: "",
        email: "",
        phone: "",
        role: "lawyer",
      },
    }),

  // Düzenlenecek avukatı ayarla
  setEditingLawyer: (lawyer) =>
    set({
      editingLawyer: lawyer,
      formData: lawyer
        ? { ...lawyer, username: lawyer.baroSicilNo }
        : {
            username: "",
            password: "",
            fullName: "",
            tcNumber: "",
            baroSicilNo: "",
            email: "",
            phone: "",
            role: "lawyer",
          },
    }),

  // Modal kontrolü
  openModal: () => set({ isModalOpen: true }),
  closeModal: () =>
    set({
      isModalOpen: false,
      editingLawyer: null,
    }),
}));

export default useLawyerStore;
