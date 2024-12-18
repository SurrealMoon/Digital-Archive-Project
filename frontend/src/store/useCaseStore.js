import { create } from "zustand";

const useCaseStore = create((set, get) => ({
  formData: {
    applicationId: "", // Başvuru ID'si
    clientname: "",
    otherlawyer: "",
    courtName: "",
    courtFileNo: "",
    caseTitle: "",
    caseDescription: "",
    documentTitle: "",
    documents: [],
  },

  cases: [], // Tüm davaları saklayan bir dizi

  setFormData: (newData) =>
    set((state) => ({
      formData: { ...state.formData, ...newData },
    })),

  addCase: async () => {
    const formData = get().formData;

    // API çağrısı yapılabilir
    console.log("Yeni dava kaydedildi:", formData);

    set((state) => ({
      cases: [...state.cases, formData],
      formData: {
        applicationId: "", // Formu sıfırlarken başvuru ID'sini de temizler
        clientname: "",
        otherlawyer: "",
        courtName: "",
        courtFileNo: "",
        caseTitle: "",
        caseDescription: "",
        documentTitle: "",
        documents: [],
      },
    }));
  },

  updateCase: async (id) => {
    const formData = get().formData;

    // API çağrısı yapılabilir
    console.log("Dava güncellendi:", formData);

    set((state) => ({
      cases: state.cases.map((caseItem) =>
        caseItem.applicationId === id ? { ...caseItem, ...formData } : caseItem
      ),
      formData: {
        applicationId: "", // Formu sıfırlarken başvuru ID'sini de temizler
        clientname: "",
        otherlawyer: "",
        courtName: "",
        courtFileNo: "",
        caseTitle: "",
        caseDescription: "",
        documentTitle: "",
        documents: [],
      },
    }));
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
        courtFileNo: "",
        caseTitle: "",
        caseDescription: "",
        documentTitle: "",
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
        courtFileNo: "",
        caseTitle: "",
        caseDescription: "",
        documentTitle: "",
        documents: [],
      },
    })),
}));

export default useCaseStore;
