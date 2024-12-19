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
        {/* Ana giriş ekranı */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin ve Avukat rolleri için Protected Route */}
        <Route
          path="/admin-page"
          element={
            <ProtectedRoute>
              <AdminLayoutPage />
            </ProtectedRoute>
          }
        >
          {/* Admin için rotalar */}
          <Route
            path="application-list"
            element={
              <ProtectedRoute requiredRole="admin">
                <ApplicationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="application-list/details/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <ApplicationDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="case-list"
            element={
              <ProtectedRoute requiredRole="admin">
                <CaseTrackingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="lawyer-list"
            element={
              <ProtectedRoute requiredRole="admin">
                <LawyerListPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="rights-violation-archive"
            element={
              <ProtectedRoute requiredRole="admin">
                <HumanRightsViolationArchivePage />
              </ProtectedRoute>
            }
          />

          {/* Avukat için rotalar */}

          <Route
            path="case-list"
            element={
              <ProtectedRoute requiredRole="lawyer">
                <CaseDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="case-list/details/:id"
            element={
              <ProtectedRoute requiredRole="lawyer">
                <CaseDetailsPage />
              </ProtectedRoute>
            }
          />
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