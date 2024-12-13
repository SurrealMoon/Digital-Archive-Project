import React from "react";
import { useNavigate } from "react-router-dom";
import useCaseStore from "../../store/useCaseStore"; 
import { FcOpenedFolder } from "react-icons/fc";
import Button from "../../components/Button";

const CaseTrackingListPage = () => {
  const { cases } = useCaseStore(); 
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-rose-800 text-white text-sm uppercase font-semibold px-6 py-4">
          Dava / Soruşturma Detayları
        </div>
        <div className="divide-y divide-gray-200">
          <div className="flex items-center bg-gray-100 px-6 py-3 text-gray-700 font-semibold text-sm">
            <div className="mr-5 w-20 text-center">Başvuru No</div>
            <div className="mr-5 flex-1">Başvuran Ad-Soyad</div>
            <div className="flex-1 ml-2">Atanan Avukat</div>
            <div className="flex-1">Hak İhlal Türü</div>
            <div className="flex-1 ml-2">Mahkeme Adı / CBS</div>
            <div className="flex-1">Dosya No</div>
            <div className="w-24 text-center">Detay</div>
          </div>

          {cases.map((item) => {
            return (
              <div
                key={item.id} // Burada item.id ile anahtar değeri ayarlıyoruz
                className="flex items-center px-6 py-4 hover:bg-gray-50 transition"
              >
                <div className="w-20 mr-5 text-center text-gray-800">{item.id}</div> {/* Başvuru No: item.id */}
                <div className="mr-5 flex-1 text-gray-800">{item.name}</div>
                <div className="flex-1 text-gray-800">{item.lawyer?.name || "Belirtilmemiş"}</div>
                <div className="mr-3 flex-1 text-gray-800">{item.category || "Belirtilmemiş"}</div>
                <div className="flex-1 text-gray-800">{item.courtName || "Belirtilmemiş"}</div>
                <div className="flex-1 text-gray-800">{item.fileNumber || "Belirtilmemiş"}</div>
                <div className="w-24 flex items-center justify-center gap-2">
                  <Button
                    label={<FcOpenedFolder size={28} />}
                    onClick={() => navigate(`/admin-page/case-list/details/${item.id}`)} // Burada item.id kullanıyoruz
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CaseTrackingListPage;
