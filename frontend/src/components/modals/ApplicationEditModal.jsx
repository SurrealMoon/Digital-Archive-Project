import React, { useEffect } from "react";
import Modal from "../Modal";
import InputField from "../InputField";
import TextArea from "../TextArea";
import CategoryDropdown from "../CategoryDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useApplicationStore from "../../store/useApplicationStore";

const ApplicationEditModal = ({ application, isOpen, onClose }) => {
  const {
    formData,
    setFormData,
    resetFormData,
    removeDocumentFromApplication,
    updateApplication,
    addDocumentToApplication,
  } = useApplicationStore();

  useEffect(() => {
    if (isOpen && application) {
      setFormData({
        fullName: application.fullName || "",
        citizenId: application.citizenId || "",
        phone: application.phone || "",
        email: application.email || "",
        address: application.address || "",
        applicationDate: application.applicationDate
          ? new Date(application.applicationDate)
          : new Date(),
        eventCategory: application.eventCategory || "",
        eventSummary: application.eventSummary || "",
        eventDetails: application.eventDetails || "",
        documents: application.documents || [],
      });
    }
    if (!isOpen) resetFormData();
  }, [isOpen]);

  const handleChange = (field) => (value) => {
    setFormData({ [field]: value });
  };

  // Dosya yükleme işlemi
  const handleFileChange = async (files) => {
    const uploadedFiles = [];
    const failedFiles = [];
  
    for (const file of files) {
      try {
        const uploadResponse = await addDocumentToApplication(application._id, file, file.name);
        uploadedFiles.push(uploadResponse);
      } catch (error) {
        console.error(`Dosya yüklenemedi: ${file.name}`, error);
        failedFiles.push(file.name);
      }
    }
  
    if (uploadedFiles.length > 0) {
      const updatedDocuments = [
        ...formData.documents,
        ...uploadedFiles.map(({ fileUrl, documentTitle }) => ({
          fileUrl,
          documentTitle,
          uploadedAt: new Date(),
        })),
      ];
  
      setFormData({ documents: updatedDocuments });
      console.log("Başarıyla yüklenen dosyalar:", uploadedFiles);
    }
  
    if (failedFiles.length > 0) {
      alert(`Bazı dosyalar yüklenemedi: ${failedFiles.join(", ")}`);
    }
  };
  
  
  const handleSubmit = async () => {
    try {
      if (application?._id) {
        await updateApplication(application._id, formData);
        console.log("Başvuru başarıyla güncellendi!");
        onClose();
      }
    } catch (error) {
      console.error("Başvuru güncellenirken bir hata oluştu:", error);
    }
  };

  const handleClose = () => {
    resetFormData();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Başvuru Düzenle"
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <InputField
        label="Ad-Soyad"
        value={formData.fullName || ""}
        onChange={handleChange("fullName")}
      />
      <InputField
        label="T.C. Kimlik Numarası"
        value={formData.citizenId || ""}
        onChange={handleChange("citizenId")}
      />
      <InputField
        label="Telefon"
        value={formData.phone || ""}
        onChange={handleChange("phone")}
      />
      <InputField
        label="E-posta"
        value={formData.email || ""}
        onChange={handleChange("email")}
      />
      <InputField
        label="Adres"
        value={formData.address || ""}
        onChange={handleChange("address")}
      />
      <div>
        <label>Başvuru Tarihi</label>
        <DatePicker
          selected={formData.applicationDate}
          onChange={(date) => setFormData({ applicationDate: date })}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <CategoryDropdown
        label="Olay Kategorisi"
        selected={formData.eventCategory || ""}
        onChange={(value) => handleChange("eventCategory")(value)}
      />
      <TextArea
        label="Başvurma Nedeni (Olay Başlığı)"
        value={formData.eventSummary || ""}
        onChange={(value) => handleChange("eventSummary")(value)}
      />
      <TextArea
        label="Olay Özeti"
        value={formData.eventDetails || ""}
        onChange={(value) => handleChange("eventDetails")(value)}
      />
      <InputField
        label="Döküman Başlığı"
        value={formData.documentTitle || ""}
        onChange={handleChange("documentTitle")}
      />
      <div>
        <label>Belgeler</label>
        <input
          type="file"
          multiple
          onChange={(e) => handleFileChange(e.target.files)}
        />
        {formData.documents.length > 0 ? (
          formData.documents.map((doc, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              {doc.fileUrl ? (
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  {doc.documentTitle || "Dosya"}
                </a>
              ) : (
                <span style={{ color: "red" }}>URL Eksik</span>
              )}
              <button
                type="button"
                onClick={() => removeDocumentFromApplication(application._id, index)}
                style={{
                  marginLeft: "10px",
                  color: "red",
                  cursor: "pointer",
                }}
              >
                Sil
              </button>
            </div>
          ))
        ) : (
          <p>Henüz belge eklenmedi.</p>
        )}
      </div>
    </Modal>
  );
};

export default ApplicationEditModal;
