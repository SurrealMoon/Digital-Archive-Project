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
    addDocumentToApplication, // Dosya yükleme fonksiyonu
  } = useApplicationStore();

  // Modal ilk açıldığında form verisini doldur
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
        documents: application.documents || [], // Belgeleri de al
      });
    }
    // Modal kapanırken formu sıfırla
    if (!isOpen) resetFormData();
  }, [isOpen]); // Bağımlılık olarak sadece isOpen kullanıldı.

  const handleChange = (field) => (value) => {
    setFormData({ [field]: value });
  };

  const handleFileChange = (files) => {
    Array.from(files).forEach((file) => {
      addDocumentToApplication(application._id, file, file.name)
        .then(() => {
          console.log("Dosya başarıyla yüklendi:", file.name);
        })
        .catch((error) => {
          console.error("Dosya yükleme hatası:", error);
        });
    });
  };

  const handleRemoveFile = async (index) => {
    try {
      if (application?._id) {
        await removeDocumentFromApplication(application._id, index);
        console.log("Belge başarıyla silindi");
      }
    } catch (error) {
      console.error("Belge silinirken bir hata oluştu:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (application?._id) {
        await updateApplication(application._id, formData);
        console.log("Başvuru başarıyla güncellendi!");
        onClose(); // Modalı kapat
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
    <Modal isOpen={isOpen} title="Başvuru Düzenle" onClose={handleClose} onSubmit={handleSubmit}>
      <InputField
        label="Ad Soyad"
        value={formData.fullName || ""}
        onChange={handleChange("fullName")}
      />
      <InputField
        label="Kimlik Numarası"
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
        label="Kategori"
        selected={formData.eventCategory || ""}
        onChange={(value) => handleChange("eventCategory")(value)}
      />
      <TextArea
        label="Başlık"
        value={formData.eventSummary || ""}
        onChange={(value) => handleChange("eventSummary")(value)}
      />
      <TextArea
        label="Detaylar"
        value={formData.eventDetails || ""}
        onChange={(value) => handleChange("eventDetails")(value)}
      />
      <div>
        <label>Belgeler</label>
        <input type="file" multiple onChange={(e) => handleFileChange(e.target.files)} />
        {Array.isArray(formData.documents) && formData.documents.length > 0 ? (
          formData.documents.map((doc, index) => (
            <div key={index} className="flex items-center">
              <span>{doc.documentTitle}</span> {/* Belge başlığını göster */}
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                style={{ marginLeft: "10px", color: "red" }}
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