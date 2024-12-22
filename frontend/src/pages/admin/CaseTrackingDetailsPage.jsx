import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCaseStore from "../../store/useCaseStore";

const CaseDetailsPage = () => {
  const { id } = useParams(); // Router'dan case ID alınır
  const { getCaseById } = useCaseStore(); // Store'dan ilgili case'i getirecek fonksiyon
  const [caseData, setCaseData] = useState(null); // Dava detaylarını tutar
  const [applicationData, setApplicationData] = useState(null); // Başvuru detaylarını tutar

  useEffect(() => {
    const fetchedCase = getCaseById(id); // ID ile case'i getir
    if (fetchedCase) {
      setCaseData(fetchedCase); // Case verisini state'e kaydet
      setApplicationData(fetchedCase.applicationId); // Başvuruyu state'e kaydet
    }
  }, [id, getCaseById]);

  if (!caseData || !applicationData) {
    return <div>Yükleniyor veya veri bulunamadı.</div>;
  }

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      {/* Başvuru Detayları */}
      <h1 className="text-2xl font-bold text-gray-800">Başvuru Detayları</h1>
      <div className="mt-6 w-full max-w-4xl bg-white shadow-xl rounded-lg p-6">
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Ad Soyad:</span> {applicationData.fullName}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Kimlik Numarası:</span> {applicationData.citizenId}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Telefon:</span> {applicationData.phone}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">E-posta:</span> {applicationData.email}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Adres:</span> {applicationData.address}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Başvuru Tarihi:</span>{" "}
          {new Date(applicationData.applicationDate).toLocaleDateString()}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Başlık:</span> {applicationData.eventSummary}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Detaylar:</span> {applicationData.eventDetails}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Belgeler:</span>
          {applicationData.documents?.length > 0 ? (
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
