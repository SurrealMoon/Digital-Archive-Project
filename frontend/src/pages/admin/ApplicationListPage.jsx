import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApplicationStore from "../../store/useApplicationStore";
import { FcOpenedFolder } from "react-icons/fc";
import Button from "../../components/Button";
import ApplicationForm from "../../components/modals/ApplicationFormModal";

const ApplicationListPage = () => {
  const {
    applications,
    fetchApplications, // Tüm başvuruları getirme fonksiyonu
    isModalOpen,
    openModal,
    closeModal,
  } = useApplicationStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Sayfa yüklendiğinde başvuruları getirme
  useEffect(() => {
    fetchApplications(); // Başvuruları API'den çek
  }, [fetchApplications]);

  // Arama için filtreleme
  const filteredApplications = applications.filter((item) => {
    const lowerQuery = searchQuery.toLowerCase();
  
    return (
      (item.fullName && item.fullName.toLowerCase().includes(lowerQuery)) || // fullName kontrolü
      (item.eventCategory && item.eventCategory.toLowerCase().includes(lowerQuery)) || // eventCategory kontrolü
      (item.processedBy && item.processedBy.toLowerCase().includes(lowerQuery)) || // processedBy kontrolü
      (item.lawyerId && item.lawyerId.toLowerCase().includes(lowerQuery)) // lawyerId kontrolü
    );
  });
  
  

  return (
    <div className="rounded-xl flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      {/* Arama Kutusu */}
      <div className="mb-5 w-full max-w-4xl flex justify-between">
        <input
          type="text"
          placeholder="Ara: Ad-Soyad, Hak İhlal Türü vb."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-rose-800 focus:border-green-800 px-4 py-2 rounded-xl w-1/3 transition"
        />
        <Button
          label="Yeni Kayıt"
          className="bg-amber-400 text-white px-4 py-2 rounded hover:bg-rose-800 transition"
          onClick={openModal} // Modal açılır
        />
      </div>

      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden ">
        <div className="bg-rose-800 text-white text-sm uppercase font-semibold px-6 py-4 ">
          Başvuru Detayları
        </div>
        <div className="divide-y divide-gray-200">
          <div className="flex items-center bg-gray-100 px-6 py-3 text-gray-700 font-semibold text-sm">
            <div className=" mr-5 w-20 text-center">Başvuru No</div>
            <div className="mr-5 flex-1">Başvuran Ad-Soyad</div>
            <div className="flex-1">Hak İhlal Türü</div>
            <div className="flex-1 ml-2 ">Atanan Avukat</div>
            <div className="flex-1 ml-2">Başvuruyu Ele Alan</div>
            <div className="w-24 text-center">Düzenle</div>
          </div>

          {filteredApplications.map((item, index) => (
  <div key={item._id} className="flex items-center px-6 py-4 hover:bg-gray-50 transition">
    <div className="w-20 mr-5 text-center text-gray-800">{index + 1}</div>
    <div className="mr-5 flex-1 text-gray-800">{item.fullName}</div> {/* Ad Soyad */}
    <div className="mr-3 flex-1 text-gray-800">{item.eventCategory || "Belirtilmemiş"}</div> {/* Hak İhlal Türü */}
    <div className="flex-1 text-gray-800">{item.lawyerId || "Atanmadı"}</div> {/* Avukat */}
    <div className="flex-1 text-gray-800">{item.processedBy || "Belirtilmedi"}</div> {/* Başvuruyu Ele Alan */}
    <div className="w-24 flex items-center justify-center gap-2">
    <Button
  label={<FcOpenedFolder size={28} />}
  onClick={() =>
    navigate(`/admin-page/application-list/details/${item._id}`)
  } // update URL'sine yönlendirme yapılıyor
/>

    </div>
  </div>
))}

        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              X
            </button>
            <ApplicationForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationListPage;
