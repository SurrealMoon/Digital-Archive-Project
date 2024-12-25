import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import CategoryDropdown from "../components/CategoryDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useApplicationStore from "../store/useUserApplicationStore";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const {
    formData,
    setFormData,
    resetFormData,
    addApplication
  } = useApplicationStore();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addApplication();
      alert("Başvuru başarıyla gönderildi!");
      resetFormData();
      navigate("/thank-you");
    } catch (error) {
      console.error("Başvuru sırasında hata oluştu:", error);
      alert("Başvuru sırasında bir hata oluştu.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-amber-50">
      <header className="text-center mb-12">
        <img src="/src/assets/HitasLogo.png" alt="HİTAS Logo" className="mx-auto mb-4 w-40" />
        <h1 className="text-3xl font-semibold text-gray-800">HİTAS'a Hoş Geldiniz</h1>
        <p className="text-lg text-gray-600 mt-2">Başvurunuzu başvuru formunu doldurarak oluşturabilirsiniz.</p>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <InputField
          label="Başvuran Ad-Soyad"
          value={formData.fullName}
          onChange={handleChange("fullName")}
          placeholder="Adınızı ve soyadınızı giriniz"
          className="w-full"
        />
        <InputField
          label="Başvuran T.C. Kimlik No"
          value={formData.citizenId}
          onChange={handleChange("citizenId")}
          placeholder="T.C. Kimlik Numaranızı giriniz"
          className="w-full"
        />
        <InputField
          label="E-mail"
          value={formData.email}
          onChange={handleChange("email")}
          placeholder="E-posta adresinizi giriniz"
          type="email"
          className="w-full"
        />
        <InputField
          label="Telefon No"
          value={formData.phone}
          onChange={handleChange("phone")}
          placeholder="Telefon numaranızı giriniz"
          type="tel"
          className="w-full"
        />
        <InputField
          label="Adres"
          value={formData.address}
          onChange={handleChange("address")}
          placeholder="Adresinizi giriniz"
          className="w-full"
        />
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Başvuru Tarihi:</label>
          <DatePicker
            selected={formData.applicationDate}
            onChange={(date) => handleChange("applicationDate")(date)}
            dateFormat="dd/MM/yyyy"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <CategoryDropdown
          label="Olay Kategorisi"
          selected={formData.eventCategory}
          onChange={(value) => handleChange("eventCategory")(value)}
        />

        <InputField
          label="Başvurma Nedeni (Olay Başlık)"
          value={formData.eventSummary}
          onChange={handleChange("eventSummary")}
          placeholder="Başvuru nedeninizi giriniz"
          className="w-full"
        />
        <TextArea
          label="Olay Özeti"
          value={formData.eventDetails}
          onChange={handleChange("eventDetails")}
          placeholder="Olayın özetini giriniz"
          maxLength={500}
          className="w-full"
        />

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">Döküman Ekleme:</label>
          <input
            type="file"
            multiple
            onChange={(e) => handleFileChange(e.target.files)}
            className="w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2"
          />
          {formData.documents.length > 0 ? (
            formData.documents.map((file, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Sil
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Henüz dosya yüklenmedi.</p>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            label="Başvuruyu Gönder"
            type="submit"
            className="w-1/2 bg-rose-700 text-white hover:bg-emerald-600 py-3 rounded-xl"
          />
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
