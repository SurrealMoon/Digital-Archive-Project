import React from "react";
import Modal from "../Modal";
import InputField from "../InputField";
import TextArea from "../TextArea";
import useCaseStore from "../../store/useCaseStore";

const AddCaseDetailsModal = () => {
  const {
    isModalOpen,
    formData,
    setFormData,
    closeModal,
    addCase,
    updateCase,
    resetFormData,
  } = useCaseStore();

  const isEditMode = Boolean(formData.id); // Determine mode based on presence of an ID

  const handleChange = (field) => (value) => {
    setFormData({ [field]: value });
  };

  const handleFileChange = (files) => {
    const updatedFiles = Array.from(files).map((file) => ({
      fileUrl: "",
      documentTitle: "",
    }));
    setFormData({ documents: [...formData.documents, ...updatedFiles] });
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
    if (isEditMode) {
      await updateCase();
      alert("Dava başarıyla güncellendi!");
    } else {
      await addCase();
      alert("Dava başarıyla kaydedildi!");
    }
    resetFormData();
    closeModal();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      title={isEditMode ? "Dava Güncelle" : "Yeni Dava Kaydı"}
      onClose={closeModal}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        {/* Müvekkil Ad-Soyad */}
        <InputField
          label="Müvekkil Ad-Soyad"
          value={formData.clientname}
          onChange={handleChange("clientname")}
          placeholder="Müvekkil adını ve soyadını giriniz"
        />
        {/* Yetkili Diğer Avukat */}
        <InputField
          label="Yetkili Diğer Avukat"
          value={formData.otherlawyer}
          onChange={handleChange("otherlawyer")}
          placeholder="Varsa yetkili diğer avukat adını giriniz"
        />
        {/* Mahkeme Adı */}
        <InputField
          label="Mahkeme Adı"
          value={formData.courtName}
          onChange={handleChange("courtName")}
          placeholder="Mahkeme adını giriniz"
        />
        {/* Dosya No */}
        <InputField
          label="Mahkeme Dosya Numarası"
          value={formData.courtFileOrInvestigationNo}
          onChange={handleChange("courtFileOrInvestigationNo")}
          placeholder="Mahkeme dosya numarasını giriniz"
        />
        {/* Başlık */}
        <InputField
          label="Dava Başlığı"
          value={formData.caseTitle}
          onChange={handleChange("caseTitle")}
          placeholder="Dava başlığını giriniz"
        />
        {/* Açıklama */}
        <TextArea
          label="Dava Açıklaması"
          value={formData.caseDescription}
          onChange={handleChange("caseDescription")}
          placeholder="Dava açıklamasını giriniz"
        />
        {/* Dosya Yükleme */}
        <div>
          <label className="block font-semibold mb-1">Döküman Ekleme</label>
          <input
            type="file"
            multiple
            onChange={(e) => handleFileChange(e.target.files)}
          />
          {formData.documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between mt-2">
              <InputField
                label="Döküman Başlığı"
                value={doc.documentTitle}
                onChange={(value) => handleDocumentTitleChange(index, value)}
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
