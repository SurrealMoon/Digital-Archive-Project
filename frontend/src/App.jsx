import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminLayoutPage from "./layout/AdminLayout";
import ApplicationPage from "./pages/admin/ApplicationListPage";
import ApplicationDetailsPage from "./pages/admin/ApplicationDetailsPage";
import LawyerListPage from "./pages/admin/LawyerListPage";
import CaseTrackingPage from "./pages/admin/CaseTrackingListPage";
import CaseDetailsPage from "./pages/admin/CaseTrackingDetailsPage";
import HumanRightsViolationArchivePage from "./pages/admin/RightsViolationArchivePage";

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
        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin ve Avukat rolleri için korumalı alan */}
        <Route
          path="/admin-page"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayoutPage />
            </ProtectedRoute>
          }
        >
          {/* Admin için rotalar */}
          <Route path="application-list" element={<ApplicationPage />} />
          <Route path="application-list/details/:id" element={<ApplicationDetailsPage />} />
          <Route path="case-list" element={<CaseTrackingPage />} />
          <Route path="lawyer-list" element={<LawyerListPage />} />
          <Route path="rights-violation-archive" element={<HumanRightsViolationArchivePage />} />
        </Route>

        {/* Avukat için rotalar */}
        <Route
          path="/lawyer-page"
          element={
            <ProtectedRoute allowedRoles={["lawyer"]}>
              <CaseDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized Page */}
        <Route
          path="/unauthorized"
          element={
            <div className="h-screen flex items-center justify-center text-2xl text-red-600">
              Yetkisiz Erişim
            </div>
          }
        />

        {/* 404 Page */}
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
