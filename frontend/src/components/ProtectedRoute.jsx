import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  const verifyUser = useAuthStore((state) => state.verifyUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        await verifyUser();
      } catch (error) {
        console.error("Kullanıcı doğrulama hatası:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, [token, verifyUser]);

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
