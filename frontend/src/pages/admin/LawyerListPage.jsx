import React from "react";
import { FaUserEdit } from "react-icons/fa"; 
import useLawyerStore from "../../store/useLawyerStore";
import Button from "../../components/Button";
import LawyerForm from "../../components/modals/AddLawyerFormModal";

const LawyerListPage = () => {
  const {
    lawyers,
    isModalOpen,
    openModal,
    closeModal,
    setEditingLawyer,
    editingLawyer,
  } = useLawyerStore();

  const handleEdit = (lawyer) => {
    setEditingLawyer(lawyer);
    openModal();
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <div className="mb-5 ml-auto">
        <Button
          label="Yeni Kayıt"
          className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-rose-800 transition"
          onClick={() => {
            setEditingLawyer(null); 
            openModal();
          }}
        />
      </div>

      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-rose-800 text-white text-sm uppercase font-semibold px-6 py-4">
          Avukat Detayları
        </div>

        <div className="divide-y divide-gray-200">
          <div className="flex items-center bg-gray-100 px-6 py-3 text-gray-700 font-semibold text-sm">
            <div className="mr-3 w-20 text-center">Kayıt No</div>
            <div className="flex-1">Ad-Soyad</div>
            <div className="flex-1 mr-6">T.C. Kimlik No</div>
            <div className="flex-1 mr-8">Baro Sicil No</div>
            <div className="flex-1 mr-5">E-mail</div>
            <div className="flex-1 ml-4">Telefon</div>
            <div className="w-16 text-center">Düzenle</div>
          </div>

          {lawyers.map((lawyer, index) => (
            <div
              key={index}
              className="flex items-center px-6 py-4 hover:bg-gray-50 transition"
            >
              <div className="w-20 text-center text-gray-800">{index + 1}</div>
              <div className=" ml-3 flex-1 text-gray-800">{lawyer.name}</div>
              <div className="flex-1 text-gray-800">{lawyer.idNumber}</div>
              <div className="flex-1 text-gray-800">{lawyer.barNumber}</div>
              <div className="flex-1 mr-2 text-gray-800">{lawyer.email}</div>
              <div className="flex-1 text-gray-800">{lawyer.phone}</div>
              <div className="w-16 text-center text-gray-800">
                <FaUserEdit size={24}
                  className="text-rose-800 hover:text-yellow-400 cursor-pointer ml-4"
                  onClick={() => handleEdit(lawyer)}
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
            <LawyerForm isEditing={!!editingLawyer} editingLawyer={editingLawyer} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerListPage;
