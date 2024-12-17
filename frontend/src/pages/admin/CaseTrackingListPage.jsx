import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCaseStore from "../../store/useCaseStore"; 
import { FcOpenedFolder } from "react-icons/fc";
import Button from "../../components/Button";

const CaseTrackingListPage = () => {
  const { cases } = useCaseStore(); 
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCases = cases.filter((item) => {
    const lowerQuery = searchQuery.toLowerCase();

    return (
      (item.name && item.name.toLowerCase().includes(lowerQuery)) || // name kontrolü
      (item.category && item.category.toLowerCase().includes(lowerQuery)) || // category kontrolü
      (item.courtName && item.courtName.toLowerCase().includes(lowerQuery)) || // courtName kontrolü
      (item.lawyer?.name && item.lawyer.name.toLowerCase().includes(lowerQuery)) // lawyer.name kontrolü
    );
  });

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
       {/* Arama Çubuğu */}
       <div className="flex mt-3 mb-6 w-full max-w-5xl justify-start">
          <input
            type="text"
            placeholder="Ara: Ad-Soyad, Hak İhlal Türü vb."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-rose-800 focus:border-green-800 px-4 py-2 rounded-xl w-1/3 transition"
          />
        </div>
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

          {filteredCases.map((item) => {
            return (
              <div
                key={item.id} 
                className="flex items-center px-6 py-4 hover:bg-gray-50 transition"
              >
                <div className="w-20 mr-5 text-center text-gray-800">{item.id}</div> 
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
