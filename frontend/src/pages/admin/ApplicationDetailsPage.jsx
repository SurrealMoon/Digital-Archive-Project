import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useApplicationStore from "../../store/useApplicationStore";
import useLawyerStore from "../../store/useLawyerStore";
import useArchiveStore from "../../store/useArchiveDetailsStore";
import Dropdown from "../../components/Dropdown";
import InputField from "../../components/InputField";
import { FcOpenedFolder } from "react-icons/fc";
import ArchiveModal from "../../components/modals/AddArchiveDetailsModal";
import ApplicationEditModal from "../../components/modals/ApplicationEditModal";

const ApplicationDetailsPage = () => {
  const { id } = useParams();
  const {
    fetchApplicationById,
    updateApplication,
    formData,
    setFormData,
    addApplicationLawyer,
    assignHandler,
    assignLawyerToApplication,
  } = useApplicationStore();
  const { lawyers, fetchLawyers } = useLawyerStore();
  const { openModal } = useArchiveStore();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedLawyer, setSelectedLawyer] = useState("");
  const [handlerName, setHandlerName] = useState("");

  // Başvuru detaylarını yükle
  useEffect(() => {
    const fetchData = async () => {
      await fetchApplicationById(id); // Başvuru detaylarını getir
      await fetchLawyers(); // Avukat listesini çek
      setLoading(false);
    };
    fetchData();
  }, [id, fetchApplicationById, fetchLawyers]);
  

  // Avukat ekleme işlemi
  const handleAddLawyer = async () => {
    if (selectedLawyer) {
      await assignLawyerToApplication(formData._id, selectedLawyer); // Yeni fonksiyonu çağır
      alert("Avukat başarıyla atandı ve dava oluşturuldu!");
      setSelectedLawyer(""); // Seçimi sıfırla
    } else {
      alert("Lütfen bir avukat seçin.");
    }
  };
  

  // Başvuruyu alan kişi ekleme işlemi
  const handleAssignHandler = () => {
    if (handlerName && formData) {
      // Form verisine 'processedBy' alanını ekle
      const updatedData = { ...formData, processedBy: handlerName };
  
      // Güncelleme API çağrısını tetikle
      updateApplication(formData._id, updatedData);
  
      alert(`Başvuruyu alan kişi ${handlerName} olarak eklendi!`);
      setHandlerName(""); // Input'u sıfırla
    } else {
      alert("Lütfen bir isim girin.");
    }
  };
  

  // Düzenleme modalını aç
  const handleEdit = () => {
    setFormData(formData); // Düzenleme için form verisini yükle
    setIsEditModalOpen(true);
  };

  // Güncelleme işlemini gerçekleştir
  const handleUpdate = async () => {
    await updateApplication(id); // API çağrısı
    setIsEditModalOpen(false); // Modalı kapat
    alert("Başvuru başarıyla güncellendi!");
  };

  if (loading) {
    return <div className="text-center mt-4">Yükleniyor...</div>;
  }

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Başvuru Detayları</h1>
      {formData ? (
        <>
          <div className="mt-6 flex justify-end w-full max-w-4xl">
            <Link
              to="/admin-page/application-list"
              className="bg-amber-400 text-white px-4 py-1 rounded hover:bg-rose-800 transition mr-2"
            >
              Ana Sayfa
            </Link>
            <button
              onClick={handleEdit}
              className="bg-fuchsia-400 text-white px-4 py-1 rounded hover:bg-emerald-600 transition"
            >
              Düzenle
            </button>
          </div>

          <div className="mt-6 w-full max-w-4xl bg-white shadow-xl rounded-lg p-6">
  <div className="mb-4">
    <span className="font-semibold text-gray-800">Ad-Soyad:</span> {formData.fullName}
  </div>
  <div className="mb-4">
    <span className="font-semibold text-gray-800">T.C. Kimlik Numarası:</span> {formData.citizenId}
  </div>
  <div className="mb-4">
    <span className="font-semibold text-gray-800">Telefon:</span> {formData.phone}
  </div>
  <div className="mb-4">
    <span className="font-semibold text-gray-800">E-posta:</span> {formData.email}
  </div>
  <div className="mb-4">
    <span className="font-semibold text-gray-800">Adres:</span> {formData.address}
  </div>
  <div className="mb-4">
    <span className="font-semibold text-gray-800">Başvuru Tarihi:</span> {new Date(formData.applicationDate).toLocaleDateString()}
  </div>
  <div className="mb-4">
    <span className="font-semibold text-gray-800">Olay Kategorisi:</span> {formData.eventCategory}
  </div>
  <div className="mb-4">
    <span className="font-semibold text-gray-800">Başvurma Nedeni (Olay Başlığı):</span> {formData.eventSummary}
  </div>
  <div className="mb-4">
    <span className="font-semibold text-gray-800">Olay Özeti:</span> {formData.eventDetails}
  </div>
  <div className="mb-4">
    <span className="font-semibold text-gray-800">Belgeler:</span>
    {formData.documents?.length > 0 ? (
      <ul>
        {formData.documents.map((doc, index) => (
          <li key={index}>
            <a
              href={doc.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {doc.documentTitle || "Başlıksız Belge"}
            </a>
          </li>
        ))}
      </ul>
    ) : (
      "Belge bulunamadı"
    )}
  </div>
</div>


          <div className="mt-6 w-full flex space-x-4">
            
            {/* Avukat Ekleme */}
            <div className="flex-1">
              <label className="block mb-1 text-gray-800">Avukat Seç</label>
              <select
                value={selectedLawyer || ""}
                onChange={(e) => setSelectedLawyer(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
              >
                <option value="">Seç</option>
                {lawyers.map((lawyer) => (
                  <option key={lawyer._id} value={lawyer._id}>
                  {lawyer.fullName}
                </option>
                ))}
              </select>
              <button
                onClick={handleAddLawyer}
                className="w-full mt-7 bg-amber-400 text-white px-4 py-2 rounded hover:bg-rose-800 transition"
              >
                Avukat Ekle
              </button>
            </div>
            {/* Başvuruyu Alan Kişi */}
            <div className="flex-1">
              <label htmlFor="handlerName" className="block mb-1 text-gray-800">
                Başvuruyu Alan Kişi
              </label>
              <InputField
                id="handlerName"
                type="text"
                value={handlerName}
                onChange={setHandlerName}
                placeholder="Kişi adı girin"
              />
              <button
                onClick={handleAssignHandler}
                className="w-full mt-2 bg-amber-400 text-white px-4 py-2 rounded hover:bg-rose-800 transition"
              >
                Ekle
              </button>
            </div>

            {/* Arşiv Ekleme */}
            <div className="flex-1">
              <button
                onClick={openModal}
                className="w-full text-gray-800 px-4 py-2 rounded transition flex items-center justify-center"
              >
                <span className="mr-2 transition-transform hover:scale-125">
                  <FcOpenedFolder size={30} />
                </span>
                Arşiv Ekle / Düzenle
              </button>
            </div>
          </div>

          {/* Modallar */}
          <ArchiveModal />
          {isEditModalOpen && (
            <ApplicationEditModal
              application={formData}
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              onSubmit={handleUpdate}
            />
          )}
        </>
      ) : (
        <p className="text-red-500">Başvuru bulunamadı.</p>
      )}
    </div>
  );
};

export default ApplicationDetailsPage;