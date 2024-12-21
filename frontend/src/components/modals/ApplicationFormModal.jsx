import React, { useState } from "react";
import useApplicationStore from "../../store/useApplicationStore";
import Button from "../Button";
import InputField from "../InputField";
import TextArea from "../TextArea";
import CategoryDropdown from "../CategoryDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../Modal";

/**
 * Uygulamada "Yeni Kayıt" butonuna basıldığında açılan
 * başvuru oluşturma modal bileşeni.
 */
const ApplicationFormModal = () => {
  const {
    formData,
    setFormData,
    addApplication,
    closeModal,
    resetFormData,
    removeDocumentFromApplication,
  } = useApplicationStore();

  // Bu modal kendi içinde açılıp kapandığı için
  // local state tutuyoruz.
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Tek alanlık güncelleme fonksiyonu
   * Örn: handleChange("phone")(value)
   */
  const handleChange = (field) => (value) => {
    setFormData({ [field]: value });
  };

  /**
   * Seçilen dosyaları `documents` dizisine ekler.
   * Hem tarayıcı `File` nesneleri hem de backend doküman nesneleri
   * bir arada tutulur.
   */
  const handleFileChange = (files) => {
    // Mevcut `documents` dizisi + yeni seçilen dosyalar
    const updatedFiles = [...formData.documents, ...Array.from(files)];
    setFormData({ documents: updatedFiles });
  };

  /**
   * Belge veya dosya silme işlemi.
   * Tarayıcıdan gelen `File` nesnesi mi, yoksa backend'den gelen doküman nesnesi mi kontrol eder.
   */
  const handleRemoveFile = async (index) => {
    const docOrFile = formData.documents[index];

    // 1) Tarayıcı `File` nesnesi ise local'den sil
    if (docOrFile instanceof File) {
      const updatedFiles = formData.documents.filter((_, i) => i !== index);
      setFormData({ documents: updatedFiles });
      return;
    }

    // 2) Backend'den gelen doküman nesnesi ise
    if (docOrFile.fileUrl) {
      try {
        // Form verisinde `_id` varsa backend'den de sil
        if (formData?._id) {
          await removeDocumentFromApplication(formData._id, index);
          console.log("Belge başarıyla silindi (backend).");
        }
        // local state'den de sil
        const updatedDocs = formData.documents.filter((_, i) => i !== index);
        setFormData({ documents: updatedDocs });
      } catch (error) {
        console.error("Belge silinirken bir hata oluştu:", error);
      }
    }
  };

  /**
   * Form gönderiminde başvuru oluşturma fonksiyonunu çağırır,
   * işlem bittikten sonra formu ve modalı kapatır.
   */
  const handleSubmit = async () => {
    console.log("Form Gönderilirkenki Data:", formData);
    await addApplication();
    alert("Başvuru başarıyla gönderildi!");
    resetFormData();
    closeModalHandler();
  };

  /**
   * Modal açma-kapama
   */
  const openModal = () => setIsModalOpen(true);
  const closeModalHandler = () => {
    setIsModalOpen(false);
    closeModal(); // Store'daki modal kontrolünü de kapatır
  };

  return (
    <div>
      {/* Ana sayfadaki 'Yeni Kayıt' butonuna basınca bu buton görünür */}
      <Button
        label="Başvuru Oluştur"
        onClick={openModal}
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
          {/* Ad Soyad */}
          <InputField
            label="Başvuran Ad-Soyad"
            value={formData.fullName}
            onChange={handleChange("fullName")}
            placeholder="Adınızı ve soyadınızı giriniz"
          />

          {/* T.C. Kimlik */}
          <InputField
            label="Başvuran T.C. Kimlik No"
            value={formData.citizenId}
            onChange={handleChange("citizenId")}
            placeholder="T.C. Kimlik Numaranızı giriniz"
          />

          {/* E-posta */}
          <InputField
            label="E-mail"
            value={formData.email}
            onChange={handleChange("email")}
            placeholder="E-posta adresinizi giriniz"
            type="email"
          />

          {/* Telefon */}
          <InputField
            label="Telefon No"
            value={formData.phone}
            onChange={handleChange("phone")}
            placeholder="Telefon numaranızı giriniz"
            type="tel"
          />

          {/* Adres */}
          <InputField
            label="Adres"
            value={formData.address}
            onChange={handleChange("address")}
            placeholder="Adresinizi giriniz"
          />

          {/* Başvuru Tarihi */}
          <div style={{ marginBottom: "15px", width: "100%" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Başvuru Tarihi:
            </label>
            <DatePicker
              selected={formData.applicationDate}
              onChange={(date) => handleChange("applicationDate")(date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>

          {/* Olay Kategorisi */}
          <CategoryDropdown
            label="Olay Kategorisi"
            selected={formData.eventCategory}
            onChange={(value) => handleChange("eventCategory")(value)}
          />

          {/* Olay Başlık */}
          <InputField
            label="Başvurma Nedeni (Olay Başlık)"
            value={formData.eventSummary}
            onChange={handleChange("eventSummary")}
            placeholder="Başvuru nedeninizi giriniz"
          />

          {/* Olay Özeti */}
          <TextArea
            label="Olay Özeti"
            value={formData.eventDetails}
            onChange={handleChange("eventDetails")}
            placeholder="Olayın özetini giriniz"
            maxLength={500}
          />

          {/* Döküman Başlığı */}
          <InputField
            label="Döküman Bilgisi"
            value={formData.documentTitle}
            onChange={handleChange("documentTitle")}
            placeholder="Döküman bilgilerini giriniz"
          />

          {/* Dosya Yükleme */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Döküman Ekleme:
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(e.target.files)}
              style={{ display: "block", marginBottom: "10px" }}
            />

            {formData.documents.length > 0 ? (
              formData.documents.map((docOrFile, index) => {
                // Tarayıcıdan gelen File nesnesi
                if (docOrFile instanceof File) {
                  return (
                    <div key={index} style={{ marginBottom: "5px" }}>
                      <span>{docOrFile.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
                      >
                        Sil
                      </button>
                    </div>
                  );
                }
                // Backend'den gelen doküman nesnesi
                if (docOrFile.fileUrl) {
                  return (
                    <div key={index} style={{ marginBottom: "5px" }}>
                      <span>{docOrFile.documentTitle || docOrFile.fileUrl}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
                      >
                        Sil
                      </button>
                    </div>
                  );
                }
                // Beklenmeyen format
                return (
                  <div key={index} style={{ marginBottom: "5px", color: "red" }}>
                    <span>Geçersiz belge formatı!</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
                    >
                      Sil
                    </button>
                  </div>
                );
              })
            ) : (
              <p>Henüz dosya yüklenmedi.</p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ApplicationFormModal;
