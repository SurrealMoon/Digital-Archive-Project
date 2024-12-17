import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCaseStore from "../../store/useCaseStore"; 

const CaseDetailsPage = () => {
  const { id } = useParams(); 
  const { getCase } = useCaseStore(); 
  const [application, setApplication] = useState(null); 
  

  useEffect(() => {
    const caseData = getCase(id); 
    if (caseData) {
      setApplication(caseData); 
    }
  }, [id, getCase]); 

  if (!application) {
    return <div>Dava bulunamadı.</div>;
  }

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Dava Detayları</h1>

      {/* Dava Bilgileri */}
      <div className="mt-6 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800">{application.name}</h2>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Başvuru No: </span>
          <span>{application.id}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Avukat: </span>
          <span>{application.lawyer?.name || "Belirtilmemiş"}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Başvuru Konusu: </span>
          <span>{application.category || "Belirtilmemiş"}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Mahkeme Adı / CBS: </span>
          <span>{application.courtName || "Belirtilmemiş"}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Dava Özeti: </span>
          <span>{application.caseSummary || "Belirtilmemiş"}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Döküman Bilgisi: </span>
          <span>{application.documentInfo || "Belirtilmemiş"}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-800">Diğer Yetkili Vekiller: </span>
          <span>{application.additionalLawyers || "Belirtilmemiş"}</span>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsPage;
