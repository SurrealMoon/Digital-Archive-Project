import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCaseStore from "../../store/useCaseStore";

const CaseDetailsPage = () => {
  const { id } = useParams(); // Router'dan case ID alınır
  const { getCaseById } = useCaseStore(); // Store'dan API ile bağlantılı case fetch fonksiyonu
  const [caseData, setCaseData] = useState(null); // Dava detaylarını tutar
  const [loading, setLoading] = useState(true); // Yüklenme durumunu yönetir
  const [error, setError] = useState(null); // Hata durumunu tutar

  useEffect(() => {
    const fetchCaseDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedCase = await getCaseById(id); // API çağrısı yapılır
        if (fetchedCase) {
          setCaseData(fetchedCase); // Case verisini state'e kaydet
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

    fetchCaseDetails();
  }, [id, getCaseById]);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!caseData) {
    return <div>Veri bulunamadı.</div>;
  }

  const applicationData = caseData.applicationId;

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      {/* Başvuru Detayları */}
      <h1 className="text-2xl font-bold text-gray-800">Başvuru Detayları</h1>
      <div className="mt-6 w-full max-w-4xl bg-white shadow-xl rounded-lg p-6">
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Ad Soyad:</span> {applicationData?.fullName || "Belirtilmemiş"}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Kimlik Numarası:</span> {applicationData?.citizenId || "Belirtilmemiş"}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Telefon:</span> {applicationData?.phone || "Belirtilmemiş"}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">E-posta:</span> {applicationData?.email || "Belirtilmemiş"}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Adres:</span> {applicationData?.address || "Belirtilmemiş"}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Başvuru Tarihi:</span>{" "}
          {applicationData?.applicationDate
            ? new Date(applicationData.applicationDate).toLocaleDateString()
            : "Belirtilmemiş"}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Olay Başlık:</span> {applicationData?.eventSummary || "Belirtilmemiş"}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Olay Özeti:</span> {applicationData?.eventDetails || "Belirtilmemiş"}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Belgeler:</span>
          {applicationData?.documents?.length > 0 ? (
            <ul>
              {applicationData.documents.map((doc, index) => (
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
          <span className="font-semibold text-gray-800">Müvekkil:</span> {caseData.clientname || "Belirtilmemiş"}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Mahkeme Adı:</span> {caseData.courtName || "Belirtilmemiş"}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Dosya No:</span>{" "}
          {caseData.courtFileOrInvestigationNo || "Belirtilmemiş"}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Dava Başlığı:</span> {caseData.caseTitle || "Belirtilmemiş"}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Dava Açıklaması:</span> {caseData.caseDescription || "Belirtilmemiş"}
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
    </div>
  );
};

export default CaseDetailsPage;
