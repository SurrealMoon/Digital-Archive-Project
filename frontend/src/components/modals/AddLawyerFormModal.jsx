import React, { useEffect } from "react";
import useLawyerStore from "../../store/useLawyerStore";
import InputField from "../InputField";
import Button from "../Button";

const LawyerForm = ({ isEditing, editingLawyer }) => {
  const {
    formData,
    setFormData,
    addLawyer,
    updateLawyer,
    closeModal,
    resetFormData,
  } = useLawyerStore();

  React.useEffect(() => {
    if (isEditing && editingLawyer) {
      setFormData(editingLawyer); // Düzenleme için formu doldur
    } else {
      resetFormData(); // Yeni kayıt için formu sıfırla
    }
  }, [isEditing, editingLawyer, setFormData, resetFormData]);

  // Baro Sicil Numarası girildikçe username'i otomatik doldur
  useEffect(() => {
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
    <div>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        {isEditing ? "Avukat Bilgilerini Düzenle" : "Avukat Kayıt Formu"}
      </h1>
      {/* Ad-Soyad */}
      <InputField
        label="Ad-Soyad"
        value={formData.fullName}
        onChange={handleChange("fullName")}
        placeholder="Adınızı ve soyadınızı giriniz"
      />

      {/* TC Kimlik No */}
      <InputField
        label="T.C. Kimlik No"
        value={formData.tcNumber}
        onChange={handleChange("tcNumber")}
        placeholder="T.C. Kimlik Numaranızı giriniz"
        type="text"
      />

      {/* Baro Sicil No */}
      <InputField
        label="Baro Sicil No"
        value={formData.baroSicilNo}
        onChange={handleChange("baroSicilNo")}
        placeholder="Baro sicil numaranızı giriniz"
      />

      {/* Şifre */}
      <InputField
        label="Şifre"
        value={formData.password}
        onChange={handleChange("password")}
        placeholder="Şifre giriniz"
        type="password"
      />

      {/* E-mail */}
      <InputField
        label="E-mail"
        value={formData.email}
        onChange={handleChange("email")}
        placeholder="E-posta adresinizi giriniz"
        type="email"
      />

      {/* Telefon No */}
      <InputField
        label="Telefon No"
        value={formData.phone}
        onChange={handleChange("phone")}
        placeholder="Telefon numaranızı giriniz"
        type="tel"
      />

      <Button
        label={isEditing ? "Avukatı Güncelle" : "Avukatı Kaydet"}
        onClick={handleSubmit}
        className="bg-yellow-400 text-white hover:bg-green-500 w-full"
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default LawyerForm;
