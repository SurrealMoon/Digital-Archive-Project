import {create} from "zustand";

const useCaseStore = create((set) => ({
  cases: [], 
  getCase: (id) => 
    set((state) => state.cases.find((app) => app.id === id)),
  
  setCase: (id, caseData) =>
    set((state) => ({
      cases: [
        ...state.cases.filter((app) => app.id !== id),
        { id, ...caseData },
      ],
    })),
    
  addCase: (caseData) => 
    set((state) => ({
      cases: [...state.cases, caseData],
    })),
    
  updateCase: (id, updatedData) => 
    set((state) => ({
      cases: state.cases.map((app) => 
        app.id === id ? { ...app, ...updatedData } : app
      ),
    }))
}));

export default useCaseStore;
