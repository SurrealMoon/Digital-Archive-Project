import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminLayoutPage from "./layout/AdminLayout";
import ApplicationPage from "./pages/admin/ApplicationListPage";
import ApplicationDetailsPage from "./pages/admin/ApplicationDetailsPage";
import LawyerListPage from "./pages/admin/LawyerListPage";
import CaseTrackingPage from "./pages/admin/CaseTrackingListPage";
import CaseDetailsPage from "./pages/admin/CaseTrackingDetailsPage";
import MediaScanPage from "./pages/admin/HumanRightsViolationArchive/MediaScanPage";
import StkDataPage from "./pages/admin/HumanRightsViolationArchive/StkDataPage";
import BarCommissionsPage from "./pages/admin/HumanRightsViolationArchive/BarCommissionsPage";
import PublicInstitutionsPage from "./pages/admin/HumanRightsViolationArchive/PublicInstitutionsPage";

// ProtectedRoute bileşeni
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthStore from "./store/useAuthStore";

function App() {
  const setToken = useAuthStore((state) => state.setToken);

  // Sayfa yenilendiğinde localStorage'dan token'ı yükle
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, [setToken]);

  return (
    <Router>
      <Routes>
        {/* Ana sayfa - yönlendirme */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Ana giriş ekranı */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin layout ile iç içe rotalar */}
        <Route
          path="/admin-page"
          element={
            <ProtectedRoute>
              <AdminLayoutPage />
            </ProtectedRoute>
          }
        >
          {/* Admin sayfaları */}
          <Route path="application-list" element={<ApplicationPage />} />
          <Route path="application-list/details/:id" element={<ApplicationDetailsPage />} />
          <Route path="case-list" element={<CaseTrackingPage />} />
          <Route path="case-list/details/:id" element={<CaseDetailsPage />} />
          <Route path="lawyer-list" element={<LawyerListPage />} />

          {/* Hak İhlali İzleme'nin alt sayfaları */}
          <Route path="rights-violation-archive/media-scan" element={<MediaScanPage />} />
          <Route path="rights-violation-archive/stk-data" element={<StkDataPage />} />
          <Route path="rights-violation-archive/bar-commissions" element={<BarCommissionsPage />} />
          <Route path="rights-violation-archive/public-institutions" element={<PublicInstitutionsPage />} />
        </Route>

        {/* 404 Sayfa Bulunamadı */}
        <Route
          path="*"
          element={
            <div className="h-screen flex items-center justify-center text-2xl text-red-600">
              404 - Sayfa Bulunamadı
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
