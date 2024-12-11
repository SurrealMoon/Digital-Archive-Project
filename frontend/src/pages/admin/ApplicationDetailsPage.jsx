import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useApplicationStore from "../../store/useApplicationStore";
import useLawyerStore from "../../store/useLawyerStore";
import Dropdown from "../../components/Dropdown";
import InputField from "../../components/InputField";
import { FcOpenedFolder } from "react-icons/fc";
import ArchiveModal from "../../components/modals/AddArchiveDetailsModal";
import useArchiveStore from "../../store/useArchiveDetailsStore";
import ApplicationEditModal from "../../components/modals/ApplicationEditModal";

const ApplicationDetailsPage = () => {
  const { id } = useParams();

  const applications = useApplicationStore((state) => state.applications);
  const addApplicationLawyer = useApplicationStore((state) => state.addApplicationLawyer);
  const lawyers = useLawyerStore((state) => state.lawyers);
  const assignHandler = useApplicationStore((state) => state.assignHandler);
  const { openModal } = useArchiveStore();

  const [selectedLawyer, setSelectedLawyer] = useState("");
  const [handlerName, setHandlerName] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const application = applications.find((app) => app.id.toString() === id);

  const handleAddLawyer = () => {
    if (selectedLawyer && application) {
      addApplicationLawyer(application.id, selectedLawyer);
      alert(`Avukat ${selectedLawyer} başarıyla eklendi!`);
      setSelectedLawyer("");
    } else {
      alert("Lütfen bir avukat seçin.");
    }
  };

  const handleAssignHandler = () => {
    if (handlerName && application) {
      assignHandler(application.id, handlerName);
      alert(`Başvuruyu alan kişi ${handlerName} olarak eklendi!`);
      setHandlerName("");
    } else {
      alert("Lütfen bir isim girin.");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Başvuru Detayları</h1>
      {application ? (
        <>
          <div className="mt-6 flex justify-end w-full max-w-4xl">
            <Link
              to="/admin-page/application-list"
              className="bg-amber-400 text-white px-4 py-1 rounded hover:bg-rose-800 transition mr-2"
            >
              Ana Sayfa
            </Link>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="bg-fuchsia-400 text-white px-4 py-1 rounded hover:bg-emerald-600 transition"
            >
              Düzenle
            </button>
          </div>
          <h2 className="mt-2 text-lg font-semibold text-gray-800">{application.title}</h2>
          <p className="mt-2 text-gray-600">{application.description}</p>

          <div className="mt-6 w-full max-w-4xl bg-white shadow-xl rounded-lg p-6">
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Ad: </span>
              <span>{application.name}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Kimlik Numarası: </span>
              <span>{application.idNumber}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">E-posta: </span>
              <span>{application.email}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Telefon: </span>
              <span>{application.phone}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Adres: </span>
              <span>{application.address}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Başvuru Tarihi: </span>
              <span>{new Date(application.applicationDate).toLocaleDateString()}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Kategori: </span>
              <span>{application.category}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Sebep: </span>
              <span>{application.reason}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Özet: </span>
              <span>{application.summary}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Belge Bilgisi: </span>
              <span>{application.documentInfo}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Belgeler: </span>
              <ul>
                {application.documents.length > 0 ? (
                  application.documents.map((file, index) => (
                    <li key={index} className="text-gray-600 flex items-center">
                      <span className="mr-2">📄</span>
                      {file.name ? (
                        <span>{file.name}</span>
                      ) : (
                        <span>{file}</span>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-600">Belgeler bulunamadı.</li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-6 w-full flex space-x-4">
            <div className="flex-1">
              <Dropdown
                label="Avukat Seç"
                options={lawyers.map((lawyer) => lawyer.name)}
                selected={selectedLawyer}
                onChange={setSelectedLawyer}
              />
              <button
                onClick={handleAddLawyer}
                className="w-full mt-1 bg-amber-400 text-white px-4 py-2 rounded hover:bg-rose-800 transition"
              >
                Avukat Ekle
              </button>
            </div>
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
            <div className="flex-1">
              <button
                onClick={openModal}
                className="w-full text-gray-800 px-4 py-2 rounded transition flex items-center justify-center"
              >
                <span className="mr-2 transition-transform hover:scale-125">
                  <FcOpenedFolder size={30} />
                </span>
                Arşiv Ekle
              </button>
            </div>
          </div>
          <ArchiveModal />
          {isEditModalOpen && (
            <ApplicationEditModal
              application={application}
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
            />
          )}
        </>
      ) : (
        <p className="mt-4 text-red-500">Başvuru bulunamadı.</p>
      )}
    </div>
  );
};

export default ApplicationDetailsPage;
