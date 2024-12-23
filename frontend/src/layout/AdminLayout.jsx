import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { TbCalendarSearch, TbReportSearch } from "react-icons/tb";
import { GiArchiveResearch } from "react-icons/gi";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import HitasLogo from "../assets/HitasLogo.png";



const MainSidebar = ({ isOpen, toggleMenu, role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    useAuthStore.getState().logout(); // Mevcut çıkış fonksiyonunu çağır
    navigate("/login"); // Kullanıcıyı /login sayfasına yönlendir
  };
  return (
    <div
      className={`bg-amber-50 h-screen p-4 border-r flex flex-col justify-between transition-all duration-300 ${isOpen ? "w-60" : "w-20"
        }`}
    >
      {/* Logo Section */}
      <div className="relative mb-8">
        <div className="absolute top-0 left-0">
          <button
            onClick={toggleMenu}
            className="text-rose-800 text-l focus:outline-none"
          >
            {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
          </button>
        </div>
        <div className="flex justify-center">
          <img
            src={HitasLogo}
            alt="Logo"
            className="w-45" // Increase logo size
          />
        </div>
      </div>

      {/* Menu Items */}
      <ul className={`space-y-4 ${isOpen ? "text-left" : "text-center"}`}>
        <li>
          <Link
            to="/admin-page/application-list"
            className="text-gray-700 font-semibold hover:text-rose-800 flex items-center"
          >
            <TbReportSearch className="size-6 mr-2" />
            {isOpen && <span>Başvuru Takip</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/admin-page/case-list"
            className="text-gray-700 font-semibold hover:text-rose-800 flex items-center"
          >
            <TbCalendarSearch className="size-6 mr-2" />
            {isOpen && <span>Dava Takip</span>}
          </Link>
        </li>
        {role === "admin" && (
          <>
            <li>
              <Link
                to="/admin-page/rights-violation-archive"
                className="text-gray-700 font-semibold hover:text-rose-800 flex items-center"
              >
                <GiArchiveResearch className="size-6 mr-2" />
                {isOpen && <span>Hak İhlali İzleme Arşiv</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/admin-page/lawyer-list"
                className="text-gray-700 font-semibold hover:text-rose-800 flex items-center"
              >
                <BsPersonFillAdd className="size-6 mr-2" />
                {isOpen && <span>Avukat Listesi</span>}
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="block bg-rose-800 text-white font-semibold text-center py-2 rounded hover:bg-rose-600 w-full"
        >
          {isOpen ? "Çıkış Yap" : <FaTimes className="mx-auto" />}
        </button>

      </div>
    </div>
  );
};

const AppHeader = () => {
  return (
    <div
      className="border-b p-3 mt-6 shadow rounded-lg bg-rose-800"
      style={{ marginLeft: "10px", marginRight: "10px" }}
    >
      <h1 className="text-xl font-bold text-center" style={{ color: "#EEFAF9" }}>
        Hak İhlali Takip Sistemi (HİTAS)
      </h1>
    </div>
  );
};

const AdminLayoutPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const role = useAuthStore((state) => state.role);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <MainSidebar isOpen={isSidebarOpen} toggleMenu={toggleSidebar} role={role} />

      {/* Main Content Area */}
      <div className={`flex flex-col flex-1 ${isSidebarOpen ? "ml-0" : "ml-4"}`}>
        {/* Header Component */}
        <AppHeader />

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayoutPage;