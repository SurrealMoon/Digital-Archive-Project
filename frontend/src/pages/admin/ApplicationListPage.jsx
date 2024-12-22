import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApplicationStore from "../../store/useApplicationStore";
import { FcOpenedFolder } from "react-icons/fc";
import Button from "../../components/Button";
import ApplicationForm from "../../components/modals/ApplicationFormModal";

const ApplicationListPage = () => {
  const {
    applications,
    fetchApplications, // Fetch all applications
    isModalOpen,
    openModal,
    closeModal,
  } = useApplicationStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch applications on component mount
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Filtering applications based on the search query
  const filteredApplications = applications.filter((item) => {
    const lowerQuery = searchQuery.toLowerCase("tr");

    return (
      (item.fullName && item.fullName.toLowerCase("tr").includes(lowerQuery)) || // Filter by fullName
      (item.eventCategory &&
        item.eventCategory.toLowerCase("tr").includes(lowerQuery)) || // Filter by eventCategory
      (item.processedBy &&
        item.processedBy.toLowerCase("tr").includes(lowerQuery)) || // Filter by processedBy
      (item.lawyerId?.fullName &&
        item.lawyerId.fullName.toLowerCase("tr").includes(lowerQuery)) // Filter by lawyerId.fullName
    );
  });

  return (
    <div className="rounded-xl flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      {/* Search Input */}
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
          onClick={openModal} // Open modal
        />
      </div>

      {/* Applications List */}
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-rose-800 text-white text-sm uppercase font-semibold px-6 py-4">
          Başvuru Detayları
        </div>
        <div className="divide-y divide-gray-200">
          <div className="flex items-center bg-gray-100 px-6 py-3 text-gray-700 font-semibold text-sm">
            <div className="mr-5 w-20 text-center">Başvuru No</div>
            <div className="mr-5 flex-1">Başvuran Ad-Soyad</div>
            <div className="flex-1">Hak İhlal Türü</div>
            <div className="flex-1 ml-2">Atanan Avukat</div>
            <div className="flex-1 ml-2">Başvuruyu Ele Alan</div>
            <div className="w-24 text-center">Düzenle</div>
          </div>

          {filteredApplications.map((item, index) => (
            <div
              key={item._id}
              className="flex items-center px-6 py-4 hover:bg-gray-50 transition"
            >
              <div className="w-20 mr-5 text-center text-gray-800">
                {index + 1}
              </div>
              <div className="mr-5 flex-1 text-gray-800">{item.fullName}</div>
              <div className="mr-3 flex-1 text-gray-800">
                {item.eventCategory || "Belirtilmemiş"}
              </div>
              <div className="flex-1 text-gray-800">
                {item.lawyerId?.fullName || "Atanmadı"}
              </div>
              <div className="flex-1 text-gray-800">
                {item.processedBy || "Belirtilmedi"}
              </div>
              <div className="w-24 flex items-center justify-center gap-2">
                <Button
                  label={<FcOpenedFolder size={28} />}
                  onClick={() =>
                    navigate(
                      `/admin-page/application-list/details/${item._id}`
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Application Form */}
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
