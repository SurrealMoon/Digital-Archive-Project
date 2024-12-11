import React from "react";
import useApplicationStore from "../../store/useApplicationStore";
import Modal from "../Modal";
import InputField from "../InputField";
import TextArea from "../TextArea";
import CategoryDropdown from "../CategoryDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ApplicationEditModal = ({ application, isOpen, onClose }) => {
  const { formData, setFormData, updateApplication } = useApplicationStore();

  React.useEffect(() => {
    if (application) {
      setFormData(application);
    }
  }, [application, setFormData]);

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

  const handleSubmit = () => {
    updateApplication(application.id);
    alert("Başvuru başarıyla güncellendi!");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Başvuru Düzenle"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <InputField
        label="Başvuran Ad-Soyad"
        value={formData.name}
        onChange={handleChange("name")}
        placeholder="Adınızı ve soyadınızı giriniz"
      />
      <InputField
        label="Başvuran T.C. Kimlik No"
        value={formData.idNumber}
        onChange={handleChange("idNumber")}
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
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Başvuru Tarihi:</label>
        <DatePicker
          selected={new Date(formData.applicationDate)}
          onChange={(date) => handleChange("applicationDate")(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <CategoryDropdown
        label="Başvuru Türü"
        selected={formData.category}
        onChange={handleChange("category")}
      />
      <InputField
        label="Başvurma Nedeni (Olay Başlık)"
        value={formData.reason}
        onChange={handleChange("reason")}
        placeholder="Başvuru nedeninizi giriniz"
      />
      <TextArea
        label="Olay Özeti"
        value={formData.summary}
        onChange={handleChange("summary")}
        placeholder="Olayın özetini giriniz"
        maxLength={500}
      />
     
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Döküman Ekleme:</label>
        <input
          type="file"
          multiple
          onChange={(e) => handleFileChange(e.target.files)}
          style={{ display: "block", marginBottom: "10px" }}
        />
        {formData.documents.map((file, index) => (
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
        ))}
      </div>
    </Modal>
  );
};

export default ApplicationEditModal;
