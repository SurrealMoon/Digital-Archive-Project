import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import axiosInstance from "../utils/axiosInstance";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, refreshToken, role, setToken, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyAccess = async () => {
      if (!token) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      try {
        // Token doğrulama
        const response = await axiosInstance.get("/users/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Kullanıcı rolü kontrolü
        if (!allowedRoles || allowedRoles.includes(response.data.user.role)) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        // Refresh token ile yeni access token almayı dene
        if (error.response?.status === 401 && refreshToken) {
          try {
            const refreshResponse = await axiosInstance.post("/users/refresh-token", {
              refreshToken,
            });
            const { accessToken } = refreshResponse.data;
            setToken(accessToken);
            setIsAuthorized(true);
          } catch {
            await logout();
            setIsAuthorized(false);
          }
        } else {
          setIsAuthorized(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyAccess();
  }, [token, refreshToken, allowedRoles, setToken, logout]);

  if (isLoading) return <div>Yükleniyor...</div>;

  if (!isAuthorized) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default ProtectedRoute;
