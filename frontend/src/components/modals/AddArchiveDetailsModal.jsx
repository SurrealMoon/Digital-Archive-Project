import React from "react";
import Modal from "../Modal";
import MonthYearPicker from "../MonthYearPicker";
import ArchiveCategoryDropdown from "../../components/ArchiveCategoryDropdown";
import CategoryDropdown from "../../components/CategoryDropdown";
import TextArea from "../../components/TextArea";
import useArchiveStore from "../../store/useArchiveDetailsStore";

const ArchiveModal = () => {
  const {
    isModalOpen,
    archiveData,
    closeModal,
    updateArchiveData,
    resetArchiveData,
    createViolation,
  } = useArchiveStore();

  const handleInputChange = (field, value) => {
    updateArchiveData(field, value);
  };

  const handleFileChange = (files) => {
    const updatedFiles = [
      ...archiveData.documents,
      ...Array.from(files).map((file) => ({
        title: file.name,
        file, // Gerçek dosya nesnesini ekliyoruz
      })),
    ];
    updateArchiveData("documents", updatedFiles);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = archiveData.documents.filter((_, i) => i !== index);
    updateArchiveData("documents", updatedFiles);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.keys(archiveData).forEach((key) => {
        if (key === "documents") {
          archiveData.documents.forEach((doc) => {
            formData.append("documents", doc.file); // Belgeleri FormData'ya ekliyoruz
          });
        } else {
          formData.append(key, archiveData[key]);
        }
      });

      await createViolation(formData); // createViolation artık FormData bekliyor
      console.log("Data submitted successfully");
      resetArchiveData(); // Formu sıfırla
      closeModal(); // Modalı kapat
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      title="Arşiv Bilgileri Ekle"
      onClose={closeModal}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        {/* Başvuran Ad-Soyad */}
        <div>
          <label htmlFor="victimNameSurname" className="block font-semibold mb-1">
            Başvuran Ad-Soyad
          </label>
          <input
            id="victimNameSurname"
            type="text"
            value={archiveData.victimNameSurname || ""}
            onChange={(e) => handleInputChange("victimNameSurname", e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Ad ve soyad girin"
          />
        </div>

        {/* Tarama Dönemi */}
        <div>
          <label className="block font-semibold mb-1">Tarama Dönemi</label>
          <MonthYearPicker
            value={archiveData.monitoringPeriod || ""}
            onChange={(value) => handleInputChange("monitoringPeriod", value)}
          />
        </div>

        {/* Arşiv Kategorisi */}
        <div>
          <label className="block font-semibold mb-1">Arşiv Kategorisi</label>
          <ArchiveCategoryDropdown
            selected={archiveData.type || ""}
            onChange={(value) => handleInputChange("type", value)}
          />
        </div>

        {/* Olay Kategorisi */}
        <div>
          <label className="block font-semibold mb-1">İhlal Kategorisi</label>
          <CategoryDropdown
            selected={archiveData.eventCategory || ""}
            onChange={(value) => handleInputChange("eventCategory", value)}
          />
        </div>

        {/* Olay Özeti */}
        <div>
          <label className="block font-semibold mb-1">Olay Özeti</label>
          <TextArea
            value={archiveData.eventSummary || ""}
            onChange={(value) => handleInputChange("eventSummary", value)}
            placeholder="Olay özeti girin"
          />
        </div>

        {/* Link */}
        <div>
          <label htmlFor="link" className="block font-semibold mb-1">
            Link
          </label>
          <input
            id="link"
            type="text"
            value={archiveData.link || ""}
            onChange={(e) => handleInputChange("link", e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Link girin"
          />
        </div>

        {/* Dosya Yükleme */}
        <div>
          <label className="block font-semibold mb-1">Dosya Yükleme</label>
          <input
            type="file"
            multiple
            onChange={(e) => handleFileChange(e.target.files)}
            className="block mb-2"
          />
          {archiveData.documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <span>{doc.title}</span>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="text-red-500 hover:underline"
              >
                Sil
              </button>
            </div>
          ))}
        </div>

        {/* Kaynak */}
        <div>
          <label htmlFor="source" className="block font-semibold mb-1">
            Kaynak (Web Sitesi, Gazete vb.)
          </label>
          <input
            id="source"
            type="text"
            value={archiveData.source || ""}
            onChange={(e) => handleInputChange("source", e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Kaynak bilgisi girin"
          />
        </div>

        {/* Görsel Link */}
        <div>
          <label htmlFor="imageLink" className="block font-semibold mb-1">
            Görsel Link
          </label>
          <input
            id="imageLink"
            type="text"
            value={archiveData.imageLink || ""}
            onChange={(e) => handleInputChange("imageLink", e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Görsel linki girin"
          />
        </div>

        {/* STK Adı */}
        <div>
          <label htmlFor="ngoInstitutionName" className="block font-semibold mb-1">
            STK Adı
          </label>
          <input
            id="ngoInstitutionName"
            type="text"
            value={archiveData.ngoInstitutionName || ""}
            onChange={(e) => handleInputChange("ngoInstitutionName", e.target.value)}
            className="w-full border rounded p-2"
            placeholder="STK adı girin"
          />
        </div>

        {/* Baro Komisyon Adı */}
        <div>
          <label htmlFor="committeeName" className="block font-semibold mb-1">
            Baro Komisyon Adı
          </label>
          <input
            id="committeeName"
            type="text"
            value={archiveData.committeeName || ""}
            onChange={(e) => handleInputChange("committeeName", e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Baro komisyon adını girin"
          />
        </div>

        {/* Kamu Kurumu Adı */}
        <div>
          <label htmlFor="publicInstitutionName" className="block font-semibold mb-1">
            Kamu Kurumu Adı
          </label>
          <input
            id="publicInstitutionName"
            type="text"
            value={archiveData.publicInstitutionName || ""}
            onChange={(e) => handleInputChange("publicInstitutionName", e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Kamu kurumu adını girin"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ArchiveModal;
