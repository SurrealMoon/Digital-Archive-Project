import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useApplicationStore = create((set, get) => ({
  applications: [], // Başvuruların listesi
  formData: {
    citizenId: "", // TC Kimlik numarası
    fullName: "", // Ad Soyad
    phone: "", // Telefon numarası
    email: "", // E-posta
    address: "", // Adres
    applicationDate: new Date(), // Tarih
    eventCategory: "", // Olay kategorisi
    eventSummary: "", // Olay başlığı
    eventDetails: "", // Olay detayları
    documents: [], // Belgeler
    processedBy: "", // Başvuruyu alan kişi
  },
  isModalOpen: false, // Modal açılma durumu
  error: null, // Hata durumu

  // Tüm başvuruları getirme
  fetchApplications: async () => {
    try {
      const response = await axiosInstance.get("/applications/application-list");
      set({ applications: response.data, error: null });
      console.log("Başvurular:", response.data);
    } catch (error) {
      set({ error: "Başvurular alınamadı." });
      console.error(error);
    }
  },

  // Belirli bir başvuru detaylarını getirme
  fetchApplicationById: async (id) => {
    try {
      const response = await axiosInstance.get(`/applications/${id}`);
      set({ formData: response.data, error: null });
      console.log("Detaylı Başvuru Verisi:", response.data);
    } catch (error) {
      set({ error: "Başvuru detayları alınamadı." });
      console.error(error);
    }
  },

   // Yeni başvuru oluşturma
   addApplication: async () => {
    try {
      const { formData } = get();
  
      // Yeni başvuru oluştur
      const applicationPayload = {
        ...formData,
        applicationDate: formData.applicationDate.toISOString(),
        documents: [], // İlk başta boş bir documents gönderiyoruz
      };
  
      console.log("Gönderilen Başvuru Payload:", applicationPayload);
  
      const createResponse = await axiosInstance.post(
        "/applications/create",
        applicationPayload
      );
  
      const applicationId = createResponse.data._id; // Oluşturulan başvurunun ID'si
  
      // Eğer birden fazla dosya yüklendiyse, dosyaları sırayla yükle
      if (formData.documents && formData.documents.length > 0) {
        for (const file of formData.documents) {
          if (file instanceof File) {
            const fileFormData = new FormData();
            fileFormData.append("file", file); // Dosya
            fileFormData.append(
              "documentTitle",
              formData.documentTitle || file.name // Dosya başlığı
            );
  
            console.log("Yüklenmekte Olan Dosya Payload:", fileFormData);
  
            // Dosyayı yükleme
            await axiosInstance.post(
              `/applications/${applicationId}/upload`, // Doğru endpoint
              fileFormData,
              {
                headers: {
                  "Content-Type": "multipart/form-data", // FormData için gerekli
                },
              }
            );
          }
        }
      }
  
      // State'i güncelle
      set((state) => ({
        applications: [...state.applications, createResponse.data],
        formData: {
          citizenId: "",
          fullName: "",
          phone: "",
          email: "",
          address: "",
          applicationDate: new Date(),
          eventCategory: "",
          eventSummary: "",
          eventDetails: "",
          documents: [], // Formdan yüklenen dokümanları sıfırla
          processedBy: "",
        },
        isModalOpen: false,
        error: null,
      }));
  
      alert("Başvuru başarıyla oluşturuldu!");
    } catch (error) {
      set({ error: "Başvuru eklenirken bir hata oluştu." });
      console.error(error.response?.data || error.message);
    }
  },
  
  

  // Başvuruya belge ekleme
  addDocumentToApplication: async (applicationId, file, documentTitle) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("documentTitle", documentTitle || file.name);
  
      // API isteği
      const response = await axiosInstance.post(
        `/applications/${applicationId}/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      // Yanıtı logla
      console.log("Backend Yanıtı:", response.data);
  
      // fileUrl'yi doğru yerden al
      const updatedApplication = response.data.updatedApplication;
      const documents = updatedApplication?.documents || [];
      const lastDocument = documents[documents.length - 1]; // Son eklenen belge
  
      if (!lastDocument || !lastDocument.fileUrl) {
        console.error("Backend yanıtında fileUrl eksik:", response.data);
        throw new Error("Backend'den geçerli bir fileUrl alınamadı!");
      }
  
      return {
        fileUrl: lastDocument.fileUrl,
        documentTitle: lastDocument.documentTitle || file.name,
      };
    } catch (error) {
      console.error(
        "Dosya yükleme sırasında hata oluştu:",
        error.response?.data || error
      );
      throw error;
    }
  },  


  // Başvurudan belge silme
removeDocumentFromApplication: async (applicationId, index) => {
  try {
    const response = await axiosInstance.delete(
      `/applications/${applicationId}/documents/${index}`
    );

    const updatedDocuments = response.data.documents; // Güncellenmiş döküman listesi

    // Store'daki formData'da dökümanları güncelle
    set((state) => ({
      formData: {
        ...state.formData,
        documents: updatedDocuments,
      },
      error: null,
    }));

    console.log("Belge başarıyla silindi:", updatedDocuments);
  } catch (error) {
    set({ error: "Belge silinirken bir hata oluştu." });
    console.error(error);
  }
},

updateApplication: async (applicationId, updatedData) => {
  try {
    const newFiles = updatedData.documents.filter((doc) => doc.file instanceof File);
    const existingDocuments = updatedData.documents.filter((doc) => !(doc.file instanceof File));

    for (const fileData of newFiles) {
      const formData = new FormData();
      formData.append("file", fileData.file);
      formData.append("documentTitle", fileData.documentTitle || "Başlıksız Belge");

      try {
        const uploadResponse = await axiosInstance.post(
          `/applications/${applicationId}/upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        const { fileUrl } = uploadResponse.data;

        if (fileUrl) {
          existingDocuments.push({
            fileUrl,
            documentTitle: fileData.documentTitle,
          });
        } else {
          console.error("Dosya yükleme sırasında fileUrl alınamadı!");
        }
      } catch (uploadError) {
        console.error("Dosya yükleme sırasında hata oluştu:", uploadError);
      }
    }

    const response = await axiosInstance.put(
      `/applications/details/${applicationId}`,
      {
        ...updatedData,
        documents: existingDocuments,
      }
    );

    set((state) => ({
      applications: state.applications.map((app) =>
        app._id === applicationId ? response.data : app
      ),
      formData: response.data,
    }));

    console.log("Başvuru başarıyla güncellendi:", response.data);
  } catch (error) {
    console.error("Başvuru güncellenirken hata:", error);
  }
},

// Avukat atama fonksiyonu
assignLawyerToApplication: async (applicationId, lawyerId) => {
  try {
    const response = await axiosInstance.put(
      `/applications/${applicationId}/assign-lawyer`,
      { lawyerId }
    );

    const updatedApplication = response.data;

    set((state) => ({
      applications: state.applications.map((app) =>
        app._id === applicationId ? updatedApplication : app
      ),
      formData:
        state.formData._id === applicationId
          ? updatedApplication
          : state.formData,
      error: null,
    }));

    console.log("Avukat başarıyla atandı:", updatedApplication);
  } catch (error) {
    set({ error: "Avukat ataması sırasında bir hata oluştu." });
    console.error(error);
  }
},


  // Form verisini güncelleme
  setFormData: (data) =>
    set((state) => {
      if (typeof data === "function") {
        return { formData: { ...state.formData, ...data(state.formData) } };
      }

      if (data && typeof data === "object" && !Array.isArray(data)) {
        return { formData: { ...state.formData, ...data } };
      }

      console.warn("setFormData: Geçersiz veri formatı", data);
      return state;
    }),

  // Tek bir form alanını güncelleme
  updateFormField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  // Formu sıfırlama
  resetFormData: () =>
    set({
      formData: {
        citizenId: "",
        fullName: "",
        phone: "",
        email: "",
        address: "",
        applicationDate: new Date(),
        eventCategory: "",
        eventSummary: "",
        eventDetails: "",
        documents: [],
        processedBy: "", // Başvuruyu alan kişi alanını sıfırla
      },
    }),

  // Modal kontrolü
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useApplicationStore;
