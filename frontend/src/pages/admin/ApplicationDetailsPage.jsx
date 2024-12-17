import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useApplicationStore from "../../store/useApplicationStore";
import ApplicationEditModal from "../../components/modals/ApplicationEditModal";

const ApplicationDetailsPage = () => {
  const { id } = useParams();
  const {
    fetchApplicationById,
    updateApplication,
    formData,
    setFormData,
  } = useApplicationStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Başvuru detaylarını yükle
  useEffect(() => {
    const fetchData = async () => {
      await fetchApplicationById(id);
      setLoading(false);
    };
    fetchData();
  }, [id, fetchApplicationById]);

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
              <span className="font-semibold text-gray-800">
                Kimlik Numarası:
              </span>{" "}
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
              <span className="font-semibold text-gray-800">
                Başvuru Tarihi:
              </span>{" "}
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

          {/* Düzenleme Modalı */}
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
