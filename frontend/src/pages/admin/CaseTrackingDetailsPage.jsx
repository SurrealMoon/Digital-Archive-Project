import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCaseStore from "../../store/useCaseStore";

const CaseDetailsPage = () => {
  const { id } = useParams(); // Router'dan case ID alınır
  const { getCaseById } = useCaseStore(); // Store'dan ilgili case'i getirecek fonksiyon
  const [caseData, setCaseData] = useState(null); // Dava detaylarını tutar

  useEffect(() => {
    const fetchedCase = getCaseById(id); // ID ile case'i getir
    if (fetchedCase) {
      setCaseData(fetchedCase); // Case bulunduğunda state'e kaydet
    }
  }, [id, getCaseById]);

  if (!caseData) {
    return <div>Dava bulunamadı.</div>;
  }

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Dava Detayları</h1>

      {/* Dava Bilgileri */}
      <div className="mt-6 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800">{caseData.clientname}</h2>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Başvuru ID: </span>
          <span>{caseData.applicationId || "Belirtilmemiş"}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Avukat: </span>
          <span>{caseData.lawyerName || "Belirtilmemiş"}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Başvuru Konusu: </span>
          <span>{caseData.category || "Belirtilmemiş"}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Mahkeme Adı: </span>
          <span>{caseData.courtName || "Belirtilmemiş"}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Dosya No: </span>
          <span>{caseData.courtFileOrInvestigationNo || "Belirtilmemiş"}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Dava Başlığı: </span>
          <span>{caseData.caseTitle || "Belirtilmemiş"}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Dava Açıklaması: </span>
          <span>{caseData.caseDescription || "Belirtilmemiş"}</span>
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
