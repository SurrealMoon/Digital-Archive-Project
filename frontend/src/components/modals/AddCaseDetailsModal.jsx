import React, { useState } from "react";
import useCaseStore from "../../store/useCaseStore";
import Button from "../Button";
import InputField from "../InputField";
import TextArea from "../TextArea";
import Modal from "../Modal";

const AddCaseDetails = () => {
  const {
    formData,
    setFormData,
    addCase,
    updateCase,
    closeModal,
    resetFormData,
  } = useCaseStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (field) => (value) => {
    setFormData({ [field]: value });
  };

  const handleFileChange = (files) => {
    const updatedFiles = Array.from(files).map((file) => ({
      fileUrl: "", // Başlangıçta boş bırakılır, S3'e yüklendikten sonra güncellenir
      documentTitle: "", // Kullanıcı tarafından girilir
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
    console.log("Form Gönderilirkenki Data:", formData);
    if (isEditMode) {
      await updateCase();
      alert("Dava başarıyla güncellendi!");
    } else {
      await addCase();
      alert("Dava başarıyla kaydedildi!");
    }
    resetFormData();
    closeModalHandler();
  };

  const openModal = (editMode = false) => {
    setIsEditMode(editMode);
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
    closeModal();
  };

  return (
    <div>
      <Button
        label="Yeni Dava Kaydı Ekle"
        onClick={() => openModal(false)}
        className="bg-yellow-400 text-white hover:bg-emerald-600 w-full"
        style={{ marginTop: "20px" }}
      />

      <Modal
        isOpen={isModalOpen}
        title={isEditMode ? "Dava Güncelle" : "Yeni Dava Kaydı"}
        onClose={closeModalHandler}
        onSubmit={handleSubmit}
      >
        <InputField
          label="Müvekkil Ad-Soyad"
          value={formData.clientname}
          onChange={handleChange("clientname")}
          placeholder="Müvekkil adını ve soyadını giriniz"
        />
        <InputField
          label="Yetkili Diğer Avukat"
          value={formData.otherlawyer}
          onChange={handleChange("otherlawyer")}
          placeholder="Varsa yetkili diğer avukat adını giriniz"
        />
        <InputField
          label="Mahkeme Adı"
          value={formData.courtName}
          onChange={handleChange("courtName")}
          placeholder="Mahkeme adını veya CBS'yi giriniz"
        />
        <InputField
          label="Mahkeme Dosya Numarası"
          value={formData.courtFileOrInvestigationNo}
          onChange={handleChange("courtFileOrInvestigationNo")}
          placeholder="Mahkeme dosya numarasını giriniz"
        />
        <InputField
          label="Dava Başlığı"
          value={formData.caseTitle}
          onChange={handleChange("caseTitle")}
          placeholder="Dava başlığını giriniz"
        />
        <TextArea
          label="Dava Açıklaması"
          value={formData.caseDescription}
          onChange={handleChange("caseDescription")}
          placeholder="Dava açıklamasını giriniz"
        />
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Döküman Ekleme:</label>
          <input
            type="file"
            multiple
            onChange={(e) => handleFileChange(e.target.files)}
            style={{ display: "block", marginBottom: "10px" }}
          />
          {formData.documents.length > 0 ? (
            formData.documents.map((doc, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <InputField
                  label="Döküman Başlığı"
                  value={doc.documentTitle}
                  onChange={(value) => handleDocumentTitleChange(index, value)}
                  placeholder="Döküman başlığını giriniz"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
                >
                  Sil
                </button>
              </div>
            ))
          ) : (
            <p>Henüz dosya yüklenmedi.</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AddCaseDetails;
