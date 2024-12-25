import React, { useEffect } from "react";
import Modal from "../Modal";
import InputField from "../InputField";
import TextArea from "../TextArea";
import useCaseStore from "../../store/useCaseStore";

const AddCaseDetailsModal = ({ isOpen, onClose, caseData, onRefresh }) => {
  const {
    formData,
    setFormData,
    resetFormData,
    updateCase,
    addDocumentToCase,
    removeDocumentFromCase,
  } = useCaseStore();
  const isEditMode = Boolean(caseData?.id);

  // Modal açıldığında sadece davaya ait belgeleri yükle
  useEffect(() => {
    if (isOpen) {
      if (isEditMode) {
        const caseDocuments = caseData?.documents || []; // Sadece davaya ait belgeler
        setFormData({ ...caseData, documents: caseDocuments });
      } else {
        resetFormData();
      }
    }
  }, [isOpen, isEditMode, caseData, setFormData, resetFormData]);

  const handleChange = (field) => (value) => {
    setFormData({ [field]: value });
  };

  const handleFileChange = async (files) => {
    const uploadedFiles = [];
    const failedFiles = [];
  
    for (const file of files) {
      try {
        const updatedCase = await addDocumentToCase(formData.id, file.name, file);
        const uploadedDocument = updatedCase.documents.slice(-1)[0]; // Yüklenen son belge
        uploadedFiles.push(uploadedDocument);
      } catch (error) {
        console.error(`Dosya yüklenemedi: ${file.name}`, error);
        failedFiles.push(file.name);
      }
    }
  
    if (uploadedFiles.length > 0) {
      const updatedDocuments = [...formData.documents, ...uploadedFiles];
      setFormData({ documents: updatedDocuments });
      console.log("Yüklenen dökümanlar:", uploadedFiles);
    }
  
    if (failedFiles.length > 0) {
      alert(`Bazı dosyalar yüklenemedi: ${failedFiles.join(", ")}`);
    }
  };

  const handleRemoveFile = async (index) => {
    try {
      await removeDocumentFromCase(formData.id, index); // Backend'den de sil
      const updatedFiles = formData.documents.filter((_, i) => i !== index);
      setFormData({ documents: updatedFiles });
      console.log(`Belge silindi: ${index}`);
    } catch (error) {
      console.error("Belge silinirken bir hata oluştu:", error);
      alert("Belge silinemedi.");
    }
  };

  const handleSubmit = async () => {
    try {
      const { id, applicationId, ...updateData } = formData;
  
      // Eğer documents boşsa, caseData içinden mevcut belgeleri koruyun
      updateData.documents = formData.documents?.length
        ? formData.documents
        : caseData?.documents || [];
  
      console.log("Gönderilen veri:", updateData);
  
      await updateCase(id, updateData);
      alert("Dava başarıyla güncellendi!");
      onClose();
      onRefresh();
    } catch (error) {
      console.error("Dava güncellenirken bir hata oluştu:", error);
      alert("Güncelleme sırasında bir hata oluştu.");
    }
  };
  
  
  

  return (
    <Modal
      isOpen={isOpen}
      title={isEditMode ? "Dava Güncelle" : "Dava Detayları"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <InputField
          label="Müvekkil"
          value={formData.clientname || ""}
          onChange={handleChange("clientname")}
          placeholder="Başvuru adını giriniz"
        />
        <InputField
          label="Yetkili Diğer Avukat"
          value={formData.otherlawyer || ""}
          onChange={handleChange("otherlawyer")}
          placeholder="Varsa yetkili diğer avukat adını giriniz"
        />
        <InputField
          label="Mahkeme Adı"
          value={formData.courtName || ""}
          onChange={handleChange("courtName")}
          placeholder="Mahkeme adını giriniz"
        />
        <InputField
          label="Mahkeme Dosya No."
          value={formData.courtFileOrInvestigationNo || ""}
          onChange={handleChange("courtFileOrInvestigationNo")}
          placeholder="Mahkeme dosya numarasını giriniz"
        />
        <InputField
          label="Dava Başlığı"
          value={formData.caseTitle || ""}
          onChange={handleChange("caseTitle")}
          placeholder="Dava başlığını giriniz"
        />
        <TextArea
          label="Dava Açıklaması"
          value={formData.caseDescription || ""}
          onChange={handleChange("caseDescription")}
          placeholder="Dava açıklamasını giriniz"
        />
        <div>
          <label className="block font-semibold mb-1">Döküman Ekleme</label>
          <input
            type="file"
            multiple
            onChange={(e) => handleFileChange(e.target.files)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:text-gray-700 file:bg-gray-50 file:hover:bg-gray-100"
          />
          {formData.documents?.length > 0 ? (
            formData.documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between mt-2">
                {doc.fileUrl ? (
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {doc.documentTitle || "Belge"}
                  </a>
                ) : (
                  <span className="text-red-500">URL Eksik</span>
                )}
                <InputField
                  label="Döküman Başlığı"
                  value={doc.documentTitle || ""}
                  onChange={(value) => {
                    const updatedDocuments = [...formData.documents];
                    updatedDocuments[index].documentTitle = value;
                    setFormData({ documents: updatedDocuments });
                  }}
                  placeholder="Döküman başlığı giriniz"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:underline"
                >
                  Sil
                </button>
              </div>
            ))
          ) : (
            <p>Henüz belge eklenmedi.</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddCaseDetailsModal;
