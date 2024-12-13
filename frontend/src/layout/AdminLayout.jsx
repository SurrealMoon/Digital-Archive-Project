import React from 'react';
import { Outlet } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { TbCalendarSearch } from "react-icons/tb";
import { TbReportSearch } from "react-icons/tb";
import { GiArchiveResearch } from "react-icons/gi";
import { BsPersonFillAdd } from "react-icons/bs";

const MainSidebar = () => {
  return (
    <div className="bg-amber-50 w-1/6 sm:w-64 h-screen p-4 border-r">
      <div className="text-3xl font-bold mb-10" style={{ color: '#47A7A2' }}>
        <img src="/src/assets/HitasLogo.png" alt="Logo" className='mr-6'/>
      </div>
      <ul>
        <li className="mb-4">
          <Link to="/admin-page/application-list" className="text-gray-700 font-semibold hover:text-rose-800 flex items-center">
            <TbReportSearch className="mr-2 size-5" />
            Başvuru Takip
          </Link>
        </li>

        <li className="mb-4">
          <Link to="/admin-page/case-list" className="text-gray-700 font-semibold hover:text-rose-800 flex items-center">
            <TbCalendarSearch className="mr-2 size-5" />
            Dava Takip
          </Link>
        </li>

        {/* Hak İhlali İzleme Arşiv Dropdown */}
        <li className="relative group">
          <Link to="/admin-page/rights-violation-archive" className="text-gray-700 font-semibold hover:text-rose-800 flex items-center">
            <GiArchiveResearch className="mr-2 size-5" />
            Hak İhlali İzleme Arşiv
          </Link>
          {/* Dropdown Menu */}
          <ul className="absolute left-full top-0 hidden group-hover:block bg-white border rounded shadow-lg mt-1">
            <li className="p-2 hover:bg-gray-100">
              <Link to="/admin-page/rights-violation-archive/media-scan" className="text-gray-700 hover:text-rose-800">
                Medya Taraması
              </Link>
            </li>
            <li className="p-2 hover:bg-gray-100">
              <Link to="/admin-page/rights-violation-archive/stk-data" className="text-gray-700 hover:text-rose-800">
                STK Verileri
              </Link>
            </li>
            <li className="p-2 hover:bg-gray-100">
              <Link to="/admin-page/rights-violation-archive/bar-commissions" className="text-gray-700 hover:text-rose-800">
                Baro Komisyonları
              </Link>
            </li>
            <li className="p-2 hover:bg-gray-100">
              <Link to="/admin-page/rights-violation-archive/public-institutions" className="text-gray-700 hover:text-rose-800">
                Kamu Kurumları
              </Link>
            </li>
          </ul>
        </li>
        <li className="mt-3">
          <Link to="/admin-page/lawyer-list" className="text-gray-700 font-semibold hover:text-rose-800 flex items-center">
            <BsPersonFillAdd className="mr-1 size-5" />
             Avukat Listesi
          </Link>
        </li>
      </ul>
    </div>
  );
};

const AppHeader = () => {
  return (
    <div
      className="border-b p-3 mt-4 shadow rounded-lg bg-rose-800"
      style={{  marginLeft: '10px', marginRight: '10px' }}
    >
      <h1 className="text-xl font-bold text-center " style={{ color: '#EEFAF9' }}>
        Hak İhlali Takip Sistemi (HİTAS)
      </h1>
    </div>
  );
};

const AdminLayoutPage = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <MainSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 mt-2 ">
        {/* Header Component */}
        <AppHeader />

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto bg-gray-50">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="bg-gray-50 text-center py-3 text-sm text-gray-500">
          
        </div>
      </div>
    </div>
  );
};

export default AdminLayoutPage;