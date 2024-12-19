import React, { useState } from "react";
import useApplicationStore from "../../store/useApplicationStore";
import Button from "../Button";
import InputField from "../InputField";
import TextArea from "../TextArea";
import CategoryDropdown from "../CategoryDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../Modal";

const ApplicationForm = () => {
  const {
    formData,
    setFormData,
    addApplication,
    closeModal,
    resetFormData,
  } = useApplicationStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (field) => (value) => {
    setFormData({ [field]: value });
  };

  const handleFileChange = (files) => {
    const updatedFiles = [...formData.documents, ...Array.from(files)];
    setFormData({ documents: updatedFiles });
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = formData.documents.filter((_, i) => i !== index);
    setFormData({ documents: updatedFiles });
  };

  const handleSubmit = async () => {
    console.log("Form Gönderilirkenki Data:", formData);
    await addApplication();
    alert("Başvuru başarıyla gönderildi!");
    resetFormData();
    closeModalHandler();
  };

  const openModal = () => setIsModalOpen(true);

  const closeModalHandler = () => {
    setIsModalOpen(false);
    closeModal();
  };

  return (
    <div>
      <Button
        label="Başvuru Oluştur"
        onClick={openModal} // Open the modal directly
        className="bg-yellow-400 text-white hover:bg-emerald-600 w-full"
        style={{ marginTop: "20px" }}
      />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title="Başvuru Formu"
          onClose={closeModalHandler}
          onSubmit={handleSubmit}
        >
          <InputField
            label="Başvuran Ad-Soyad"
            value={formData.fullName}
            onChange={handleChange("fullName")}
            placeholder="Adınızı ve soyadınızı giriniz"
          />
          <InputField
            label="Başvuran T.C. Kimlik No"
            value={formData.citizenId}
            onChange={handleChange("citizenId")}
            placeholder="T.C. Kimlik Numaranızı giriniz"
          />
          <InputField
            label="E-mail"
            value={formData.email}
            onChange={handleChange("email")}
            placeholder="E-posta adresinizi giriniz"
            type="email"
          />
          <InputField
            label="Telefon No"
            value={formData.phone}
            onChange={handleChange("phone")}
            placeholder="Telefon numaranızı giriniz"
            type="tel"
          />
          <InputField
            label="Adres"
            value={formData.address}
            onChange={handleChange("address")}
            placeholder="Adresinizi giriniz"
          />
          <div style={{ marginBottom: "15px", width: "100%" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Başvuru Tarihi:</label>
            <DatePicker
              selected={formData.applicationDate}
              onChange={(date) => handleChange("applicationDate")(date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <CategoryDropdown
            label="Olay Kategorisi"
            selected={formData.eventCategory}
            onChange={(value) => {
              handleChange("eventCategory")(value);
              console.log("Seçilen Olay Kategorisi:", value);
            }}
          />

          <InputField
            label="Başvurma Nedeni (Olay Başlık)"
            value={formData.eventSummary}
            onChange={handleChange("eventSummary")}
            placeholder="Başvuru nedeninizi giriniz"
          />
          <TextArea
            label="Olay Özeti"
            value={formData.eventDetails}
            onChange={handleChange("eventDetails")}
            placeholder="Olayın özetini giriniz"
            maxLength={500}
          />
          <InputField
            label="Döküman Bilgisi"
            value={formData.documentTitle}
            onChange={handleChange("documentTitle")}
            placeholder="Döküman bilgilerini giriniz"
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
              formData.documents.map((file, index) => (
                <div key={index} style={{ marginBottom: "5px" }}>
                  <span>{file.name}</span>
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
      )}
    </div>
  );
};

export default ApplicationForm;
