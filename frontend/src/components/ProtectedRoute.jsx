import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  // Token yoksa logout yap ve login sayfasına yönlendir
  if (!token) {
    logout();
    return <Navigate to="/login" replace />;
  }

  // Token varsa sayfayı göster
  return children;
};

export default ProtectedRoute;
