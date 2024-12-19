import React, { useEffect } from "react";
import useLawyerStore from "../../store/useLawyerStore";
import InputField from "../InputField";
import Modal from "../Modal";

const LawyerForm = ({ isEditing, editingLawyer }) => {
  const {
    formData,
    setFormData,
    addLawyer,
    updateLawyer,
    closeModal,
    resetFormData,
  } = useLawyerStore();

  useEffect(() => {
    if (isEditing && editingLawyer) {
      setFormData(editingLawyer); // Populate form for editing
    } else {
      resetFormData(); // Reset form for new entries
    }
  }, [isEditing, editingLawyer, setFormData, resetFormData]);

  useEffect(() => {
    // Automatically set the username based on baroSicilNo
    setFormData({ username: formData.baroSicilNo });
  }, [formData.baroSicilNo, setFormData]);

  const handleChange = (field) => (value) => {
    setFormData({ [field]: value });
  };

  const handleSubmit = () => {
    if (isEditing) {
      updateLawyer();
      alert("Avukat bilgileri başarıyla güncellendi!");
    } else {
      addLawyer();
      alert("Avukat başarıyla kaydedildi!");
    }
    resetFormData();
    closeModal();
  };

  return (
    <Modal
      isOpen={true}
      title={isEditing ? "Avukat Bilgilerini Düzenle" : "Avukat Kayıt Formu"}
      onClose={closeModal}
      onSubmit={handleSubmit} // Submit logic handled here
    >
      <div className="space-y-4">
        {/* Full Name */}
        <InputField
          label="Ad-Soyad"
          value={formData.fullName}
          onChange={handleChange("fullName")}
          placeholder="Adınızı ve soyadınızı giriniz"
        />

        {/* TC ID Number */}
        <InputField
          label="T.C. Kimlik No"
          value={formData.tcNumber}
          onChange={handleChange("tcNumber")}
          placeholder="T.C. Kimlik Numaranızı giriniz"
          type="text"
        />

        {/* Baro Registration Number */}
        <InputField
          label="Baro Sicil No"
          value={formData.baroSicilNo}
          onChange={handleChange("baroSicilNo")}
          placeholder="Baro sicil numaranızı giriniz"
        />

        {/* Password */}
        <InputField
          label="Şifre"
          value={formData.password}
          onChange={handleChange("password")}
          placeholder="Şifre giriniz"
          type="password"
        />

        {/* Email */}
        <InputField
          label="E-mail"
          value={formData.email}
          onChange={handleChange("email")}
          placeholder="E-posta adresinizi giriniz"
          type="email"
        />

        {/* Phone Number */}
        <InputField
          label="Telefon No"
          value={formData.phone}
          onChange={handleChange("phone")}
          placeholder="Telefon numaranızı giriniz"
          type="tel"
        />
      </div>
    </Modal>
  );
};

export default LawyerForm;
