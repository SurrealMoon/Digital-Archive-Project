import React, { useEffect } from "react";
import Modal from "../Modal";
import InputField from "../InputField";
import TextArea from "../TextArea";
import useCaseStore from "../../store/useCaseStore";

const AddCaseDetailsModal = ({ isOpen, onClose, caseData, onRefresh }) => {
  const { formData, setFormData, resetFormData, updateCase } = useCaseStore();
  const isEditMode = Boolean(caseData?.id);

  useEffect(() => {
    if (isOpen) {
      isEditMode ? setFormData(caseData) : resetFormData();
    }
  }, [isOpen, isEditMode, caseData, setFormData, resetFormData]);

  const handleChange = (field) => (value) => {
    setFormData({ [field]: value });
  };

  const handleFileChange = (files) => {
    const newFiles = Array.from(files).map(() => ({
      fileUrl: "",
      documentTitle: "",
    }));
    setFormData({ documents: [...(formData.documents || []), ...newFiles] });
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = formData.documents.filter((_, i) => i !== index);
    setFormData({ documents: updatedFiles });
  };

  const handleDocumentTitleChange = (index, value) => {
    const updatedDocuments = [...formData.documents];
    updatedDocuments[index].documentTitle = value;
    setFormData({ documents: updatedDocuments });
  };

  const handleSubmit = async () => {
    console.log("formdata", formData.id)
    try {
      await updateCase(formData.id, formData);
      alert("Dava başarıyla güncellendi!");
      onClose();
      onRefresh();
    } catch (error) {
      console.error("Güncelleme hatası:", error);
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
          label="Başvuran Ad-Soyad"
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
          label="Mahkeme Dosya Numarası"
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
          {formData.documents?.map((doc, index) => (
            <div key={index} className="flex items-center justify-between mt-2">
              <InputField
                label="Döküman Başlığı"
                value={doc.documentTitle || ""}
                onChange={(value) => handleDocumentTitleChange(index, value)}
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
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default AddCaseDetailsModal;
