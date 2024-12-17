import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null, // localStorage'dan token yükle
  refreshToken: localStorage.getItem("refreshToken") || null,
  error: null,

  // Login işlemi
  login: async (username, password) => {
    try {
      const response = await axiosInstance.post("/admin/login", {
        username,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      // Tokenları state'e ve localStorage'a kaydet
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      set({
        token: accessToken,
        refreshToken,
        error: null,
      });
      return true;
    } catch (error) {
      set({ error: "Geçersiz kullanıcı adı veya şifre." });
      return false;
    }
  },

  // Logout işlemi
  logout: async () => {
    try {
      await axiosInstance.post("/admin/logout", {});
    } catch (err) {
      console.error("Logout hatası:", err);
    } finally {
      // Tokenları temizle
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      set({ token: null, refreshToken: null, error: null });
    }
  },

  // Token'ı güncelle
  setToken: (newToken) => {
    localStorage.setItem("token", newToken);
    set({ token: newToken });
  },
}));

export default useAuthStore;
