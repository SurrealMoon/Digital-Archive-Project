import React, { useState } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import Button from "../../components/Button";

const HumanRightsViolationArchivePage = () => {
  // Örnek veri
  const listData = [
    { 
      id: 1, 
      applicantId: "2023-001",
      name: "Ahmet Yılmaz", 
      archiveClass: "Medya Taraması", 
      violationType: "İnsan Hakları", 
      period: "Ocak 2023" 
    },
    { 
      id: 2, 
      applicantId: "2023-002",
      name: "Elif Kaya", 
      archiveClass: "STK Verileri", 
      violationType: "Kadın Hakları", 
      period: "Şubat 2023" 
    },
    { 
      id: 3, 
      applicantId: "2023-003",
      name: "Mehmet Demir", 
      archiveClass: "Baro Komisyonları", 
      violationType: "Çocuk Hakları", 
      period: "Mart 2023" 
    },
    { 
      id: 4, 
      applicantId: "2023-004",
      name: "Ayşe Arslan", 
      archiveClass: "Kamu Kurumları", 
      violationType: "İfade Özgürlüğü", 
      period: "Nisan 2023" 
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = listData.filter((item) => {
    const lowerQuery = searchQuery.toLocaleLowerCase('tr');
  
    return (
      (item.name && item.name.toLocaleLowerCase('tr').includes(lowerQuery)) ||
      (item.archiveClass && item.archiveClass.toLocaleLowerCase('tr').includes(lowerQuery)) ||
      (item.violationType && item.violationType.toLocaleLowerCase('tr').includes(lowerQuery))
    );
  });
  

  const handleButtonClick = (id) => {
    alert(`Satır ${id} için işlem yapılıyor!`);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      {/* Arama Çubuğu */}
      <div className="flex mt-3 mb-6 w-full max-w-4xl justify-start">
        <input
          type="text"
          placeholder="Ara: Ad-Soyad, Arşiv Sınıfı, İhlal Türü"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-rose-800 focus:border-green-800 px-4 py-2 rounded-xl w-1/3 transition"
        />
      </div>

      {/* Liste Wrapper */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Tablo Başlığı */}
        <div className="bg-rose-800 text-white text-sm uppercase font-semibold px-6 py-4">
          HAK İHLALLERİ ARŞİV DETAY
        </div>

        {/* Liste */}
        <div className="divide-y divide-gray-200">
          {/* Tablo Başlıkları */}
          <div className="flex items-center bg-gray-100 px-6 py-3 text-gray-700 font-semibold text-sm">
            <div className="flex-1">Başvuru No</div>
            <div className="flex-1">Başvuran Ad-Soyad</div>
            <div className="flex-1">Arşiv Sınıfı</div>
            <div className="flex-1">İhlal Türü</div>
            <div className="flex-1">Tarama Dönemi</div>
            <div className="w-24 text-center">Detay</div>
          </div>

          {/* Tablo Satırları */}
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="flex items-center px-6 py-4 hover:bg-gray-50 transition"
            >
              <div className="flex-1 text-gray-800">{item.applicantId}</div>
              <div className="flex-1 text-gray-800">{item.name}</div>
              <div className="flex-1 text-gray-800">{item.archiveClass}</div>
              <div className="flex-1 text-gray-800">{item.violationType}</div>
              <div className="flex-1 text-gray-800">{item.period}</div>
              <div className="w-24 flex items-center justify-center gap-2">
                {/* İkon */}
                <Button
                  label={<FcOpenedFolder size={28} />}
                  onClick={() => handleButtonClick(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HumanRightsViolationArchivePage;
