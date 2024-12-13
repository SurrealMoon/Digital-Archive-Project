import React from "react";

const PublicInstitutionsPage = () => {
  // Örnek veri
  const listData = [
    { id: 1, period: "Ocak 2023", name: "Ahmet Yılmaz", category: "İnsan Hakları" },
    { id: 2, period: "Şubat 2023", name: "Elif Kaya", category: "Kadın Hakları" },
    { id: 3, period: "Mart 2023", name: "Mehmet Demir", category: "Çocuk Hakları" },
    { id: 4, period: "Nisan 2023", name: "Ayşe Arslan", category: "İfade Özgürlüğü" },
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      

      {/* Liste Wrapper */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Tablo Başlığı */}
        <div className="bg-rose-800 text-white text-sm uppercase font-semibold px-6 py-4">
         Kamu Kurumları
        </div>

        {/* Liste */}
        <div className="divide-y divide-gray-200">
          {/* Tablo Başlıkları */}
          <div className="flex items-center bg-gray-100 px-6 py-3 text-gray-700 font-semibold text-sm">
            <div className="flex-1">Tarama Dönemi</div>
            <div className="flex-1">Mağdur(lar) Ad-Soyad</div>
            <div className="flex-1">Olay Kategorisi</div>
          </div>

          {/* Tablo Satırları */}
          {listData.map((item) => (
            <div
              key={item.id}
              className="flex items-center px-6 py-4 hover:bg-gray-50 transition"
            >
              <div className="flex-1 text-gray-800">{item.period}</div>
              <div className="flex-1 text-gray-800">{item.name}</div>
              <div className="flex-1 text-gray-800">{item.category}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default  PublicInstitutionsPage;
