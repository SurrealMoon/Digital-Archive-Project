import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useCaseStore from "../../store/useCaseStore";
import AddCaseDetailsModal from "../../components/modals/AddCaseDetailsModal";

const CaseDetailsPage = () => {
  const { id } = useParams();
  const { fetchCases, cases } = useCaseStore();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);

  const fetchCaseDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      await fetchCases(); // Tüm davaları getir
      const fetchedCase = cases.find((caseItem) => caseItem.id === id); // Belirli davayı bul
      if (fetchedCase) {
        setCaseData(fetchedCase);
      } else {
        setError("Dava bulunamadı.");
      }
    } catch (err) {
      setError("Dava detayları getirilemedi. Lütfen tekrar deneyin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseDetails();
  }, [id]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!caseData) return <div>Veri bulunamadı.</div>;

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen relative">
      {/* Sağ Üstteki Buton */}
      <button
        onClick={handleOpenModal}
        className="absolute top-4 right-4 bg-fuchsia-400 text-white px-4 py-1 rounded hover:bg-emerald-600 transition"
      >
        Dava Detay Ekle
      </button>

      {/* Modal */}
      <AddCaseDetailsModal
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        caseData={caseData}
        onRefresh={fetchCaseDetails}
      />

      {/* Başvuru Detayları */}
      <h1 className="text-2xl font-bold text-gray-800">Başvuru Detayları</h1>
      <div className="mt-6 w-full max-w-4xl bg-white shadow-xl rounded-lg p-6">
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Ad Soyad:</span> {caseData.name}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Kimlik Numarası:</span> {caseData.citizenId}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Telefon:</span> {caseData.phone}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">E-posta:</span> {caseData.email}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Adres:</span> {caseData.address}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Başvuru Tarihi:</span> {caseData.applicationDate}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Olay Başlık:</span> {caseData.eventSummary}
        </div>
        <div className="mb-4"
        style={{
          wordWrap: 'break-word', 
          whiteSpace: 'normal',   
          overflowWrap: 'break-word',
        }}>
          <span className="font-semibold text-gray-800">Olay Özeti:</span> {caseData.eventDetails}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Belgeler:</span>
          {caseData.documents?.length > 0 ? (
            <ul>
              {caseData.documents.map((doc, index) => (
                <li key={index}>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {doc.documentTitle || doc.fileUrl}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            "Belge bulunamadı."
          )}
        </div>
      </div>

      {/* Dava Detayları */}
      <h1 className="text-2xl font-bold text-gray-800 mt-8">Dava Detayları</h1>
      <div className="mt-6 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Müvekkil:</span> {caseData.clientname}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Mahkeme Adı:</span> {caseData.courtName}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Dosya No:</span> {caseData.courtFileOrInvestigationNo}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Dava Başlığı:</span> {caseData.caseTitle}
        </div>
        <div className="mb-4"
        style={{
          wordWrap: 'break-word', 
          whiteSpace: 'normal',   
          overflowWrap: 'break-word', 
        }}>
          <span className="font-semibold text-gray-800">Dava Açıklaması:</span> {caseData.caseDescription}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Dava Belgeleri:</span>
          {caseData.caseDocuments?.length > 0 ? (
            <ul>
              {caseData.caseDocuments.map((doc, index) => (
                <li key={index}>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {doc.documentTitle || doc.fileUrl}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            "Belge bulunamadı."
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsPage;
