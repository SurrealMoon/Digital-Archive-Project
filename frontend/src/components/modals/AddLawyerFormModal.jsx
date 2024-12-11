import React from "react";
import useLawyerStore from "../../store/useLawyerStore";
import InputField from "../InputField";
import Button from "../Button";

const LawyerForm = () => {
  const { formData, setFormData, addLawyer, closeModal, resetFormData } =
    useLawyerStore();

  const handleChange = (field) => (value) => {
    setFormData({ [field]: value });
  };

  const handleSubmit = () => {
    addLawyer();
    alert("Avukat başarıyla kaydedildi!");
    resetFormData();
    closeModal();
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        height: "80vh",
        overflowY: "auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>
        Avukat Kayıt Formu
      </h1>
      <InputField
        label="Avukat Ad-Soyad"
        value={formData.name}
        onChange={handleChange("name")}
        placeholder="Adınızı ve soyadınızı giriniz"
      />
      <InputField
        label="T.C. Kimlik No"
        value={formData.idNumber}
        onChange={handleChange("idNumber")}
        placeholder="T.C. Kimlik Numaranızı giriniz"
      />
      <InputField
        label="Baro Sicil No"
        value={formData.barNumber}
        onChange={handleChange("barNumber")}
        placeholder="Baro sicil numaranızı giriniz"
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
      <Button
        label="Avukatı Kaydet"
        onClick={handleSubmit}
        className="bg-yellow-400 text-white hover:bg-green-500 w-full"
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default LawyerForm;
