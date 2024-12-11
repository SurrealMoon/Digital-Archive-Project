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
  } = useArchiveStore();

  const handleInputChange = (field, value) => {
    updateArchiveData(field, value);
  };

  const handleFileChange = (files) => {
    const updatedFiles = [...archiveData.uploadedFiles, ...Array.from(files)];
    updateArchiveData("uploadedFiles", updatedFiles);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = archiveData.uploadedFiles.filter((_, i) => i !== index);
    updateArchiveData("uploadedFiles", updatedFiles);
  };

  const handleSubmit = () => {
    console.log("Submitted data:", archiveData);
    closeModal();
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
          <label htmlFor="fullName" className="block font-semibold mb-1">
            Başvuran Ad-Soyad
          </label>
          <input
            id="fullName"
            type="text"
            value={archiveData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Ad ve soyad girin"
          />
        </div>

        {/* Tarama Dönemi */}
        <div>
          <label className="block font-semibold mb-1">Tarama Dönemi</label>
          <MonthYearPicker
            value={archiveData.scanPeriod}
            onChange={(value) => handleInputChange("scanPeriod", value)}
          />
        </div>

        {/* Arşiv Kategorisi */}
        <div>
          <label className="block font-semibold mb-1">Arşiv Kategorisi</label>
          <ArchiveCategoryDropdown
            selected={archiveData.archiveCategory}
            onChange={(value) => handleInputChange("archiveCategory", value)}
          />
        </div>

        {/* Olay Kategorisi */}
        <div>
          <label className="block font-semibold mb-1">İhlal Kategorisi</label>
          <CategoryDropdown
            selected={archiveData.eventCategory}
            onChange={(value) => handleInputChange("eventCategory", value)}
          />
        </div>

        {/* Olay Özeti */}
        <div>
          <label className="block font-semibold mb-1">Olay Özeti</label>
          <TextArea
            value={archiveData.eventSummary}
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
            value={archiveData.link}
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
          {archiveData.uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <span>{file.name}</span>
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
            value={archiveData.source}
            onChange={(e) => handleInputChange("source", e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Kaynak bilgisi girin"
          />
        </div>

        {/* Görsel Link */}
        <div>
          <label htmlFor="visualLink" className="block font-semibold mb-1">
            Görsel Link
          </label>
          <input
            id="visualLink"
            type="text"
            value={archiveData.visualLink}
            onChange={(e) => handleInputChange("visualLink", e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Görsel linki girin"
          />
        </div>

        {/* STK Adı */}
        <div>
          <label htmlFor="ngoName" className="block font-semibold mb-1">
            STK Adı
          </label>
          <input
            id="ngoName"
            type="text"
            value={archiveData.ngoName}
            onChange={(e) => handleInputChange("ngoName", e.target.value)}
            className="w-full border rounded p-2"
            placeholder="STK adı girin"
          />
        </div>

        {/* Baro Komisyon Adı */}
        <div>
          <label htmlFor="barAssociationName" className="block font-semibold mb-1">
            Baro Komisyon Adı
          </label>
          <input
            id="barAssociationName"
            type="text"
            value={archiveData.barAssociationName}
            onChange={(e) => handleInputChange("barAssociationName", e.target.value)}
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
            value={archiveData.publicInstitutionName}
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
