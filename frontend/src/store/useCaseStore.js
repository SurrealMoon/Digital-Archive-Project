import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useCaseStore = create((set, get) => ({
  formData: {
    applicationId: "",
    clientname: "",
    otherlawyer: "",
    courtName: "",
    courtFileOrInvestigationNo: "", // Güncellenen alan
    caseTitle: "",
    caseDescription: "",
    documents: [], // Belge listesi, fileUrl ve documentTitle içerir
  },

  cases: [],
  loading: false,
  error: null,

  setFormData: (newData) =>
    set((state) => ({
      formData: { ...state.formData, ...newData },
    })),

  fetchCases: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/cases/getallcases");
      const fetchedCases = response.data.map((caseItem) => ({
        id: caseItem._id,
        name: caseItem.applicationId?.fullName || "Belirtilmemiş",
        category: caseItem.applicationId?.eventCategory || "Belirtilmemiş",
        lawyerName: caseItem.lawyerId?.fullName || "Belirtilmemiş",
        clientname: caseItem.clientname || "Belirtilmemiş",
        otherlawyer: caseItem.otherlawyer || "Belirtilmemiş",
        courtName: caseItem.courtName || "Belirtilmemiş",
        courtFileOrInvestigationNo:
          caseItem.courtFileOrInvestigationNo || "Belirtilmemiş",
        caseTitle: caseItem.caseTitle || "Belirtilmemiş",
        caseDescription: caseItem.caseDescription || "Belirtilmemiş",
        documents: caseItem.documents || [],
      }));

      set({ cases: fetchedCases, loading: false });
    } catch (error) {
      console.error("Dava listesi alınırken hata oluştu:", error);
      set({ error: error.message, loading: false });
    }
  },

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

  updateCase: async (id) => {
    try {
      const formData = get().formData;

      const response = await axiosInstance.put(`/cases/${id}/update`, formData);
      const updatedCase = response.data;

      set((state) => ({
        cases: state.cases.map((caseItem) =>
          caseItem.id === id
            ? {
                id: updatedCase._id,
                applicationId: updatedCase.applicationId || "Belirtilmemiş",
                lawyerId: updatedCase.lawyerId || "Belirtilmemiş",
                clientname: updatedCase.clientname || "Belirtilmemiş",
                otherlawyer: updatedCase.otherlawyer || "Belirtilmemiş",
                courtName: updatedCase.courtName || "Belirtilmemiş",
                courtFileOrInvestigationNo:
                  updatedCase.courtFileOrInvestigationNo || "Belirtilmemiş",
                caseTitle: updatedCase.caseTitle || "Belirtilmemiş",
                caseDescription: updatedCase.caseDescription || "Belirtilmemiş",
                documents: updatedCase.documents || [],
              }
            : caseItem
        ),
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

      console.log("Dava başarıyla güncellendi:", updatedCase);
    } catch (error) {
      console.error("Dava güncellenirken hata oluştu:", error);
      set({ error: "Dava güncellenirken bir hata oluştu." });
    }
  },

  getCaseByApplicationId: (applicationId) => {
    const cases = get().cases;
    return cases.find((caseItem) => caseItem.applicationId === applicationId);
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
