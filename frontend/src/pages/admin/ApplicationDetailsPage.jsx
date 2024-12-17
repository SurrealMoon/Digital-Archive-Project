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
  } = useApplicationStore();
  const lawyers = useLawyerStore((state) => state.lawyers);
  const { openModal } = useArchiveStore();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedLawyer, setSelectedLawyer] = useState("");
  const [handlerName, setHandlerName] = useState("");

  // Başvuru detaylarını yükle
  useEffect(() => {
    const fetchData = async () => {
      await fetchApplicationById(id);
      setLoading(false);
    };
    fetchData();
  }, [id, fetchApplicationById]);

  // Avukat ekleme işlemi
  const handleAddLawyer = () => {
    if (selectedLawyer && formData) {
      addApplicationLawyer(formData.id, selectedLawyer);
      alert(`Avukat ${selectedLawyer.name} başarıyla eklendi!`);
      setSelectedLawyer(null);
    } else {
      alert("Lütfen bir avukat seçin.");
    }
  };

  // Başvuruyu alan kişi ekleme işlemi
  const handleAssignHandler = () => {
    if (handlerName && formData) {
      assignHandler(formData.id, handlerName);
      alert(`Başvuruyu alan kişi ${handlerName} olarak eklendi!`);
      setHandlerName("");
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
              <span className="font-semibold text-gray-800">Ad Soyad:</span>{" "}
              {formData.fullName}
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Kimlik Numarası:</span>{" "}
              {formData.citizenId}
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Telefon:</span>{" "}
              {formData.phone}
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">E-posta:</span>{" "}
              {formData.email}
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Adres:</span>{" "}
              {formData.address}
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Başvuru Tarihi:</span>{" "}
              {new Date(formData.applicationDate).toLocaleDateString()}
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Başlık:</span>{" "}
              {formData.eventSummary}
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Detaylar:</span>{" "}
              {formData.eventDetails}
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Belgeler:</span>
              {formData.documents?.length > 0 ? (
                <ul>
                  {formData.documents.map((doc, index) => (
                    <li key={index}>
                      <a
                        href={doc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {doc}
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
              <Dropdown
                label="Avukat Seç"
                options={lawyers.map((lawyer) => lawyer.name)}
                selected={selectedLawyer}
                onChange={(name) => {
                  const selected = lawyers.find((lawyer) => lawyer.name === name);
                  setSelectedLawyer(selected);
                }}
              />
              <button
                onClick={handleAddLawyer}
                className="w-full mt-1 bg-amber-400 text-white px-4 py-2 rounded hover:bg-rose-800 transition"
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
