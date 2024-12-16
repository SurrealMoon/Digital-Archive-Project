import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  // Token varsa children (korumalı bileşeni) göster
  if (token) {
    return children;
  }

  // Token yoksa logout yap ve login sayfasına yönlendir
  logout();
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
