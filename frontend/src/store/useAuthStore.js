import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  role: localStorage.getItem("role") || null,
  error: null,

  // Login işlemi
  login: async (username, password) => {
    try {
      const response = await axiosInstance.post("/users/login", { username, password });
      if (response?.data) {
        const { accessToken, refreshToken, role } = response.data;

        // Tokenları localStorage'a ve state'e kaydet
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role", role);

        set({ token: accessToken, refreshToken, role, error: null });
        return true;
      }
    } catch (error) {
      console.error("Login hatası:", error);
      set({ error: "Geçersiz kullanıcı adı veya şifre." });
      return false;
    }
  },

  // Logout işlemi
  logout: async () => {
    try {
      await axiosInstance.post("/users/logout");
    } catch (err) {
      console.error("Logout hatası:", err);
    } finally {
      // Tüm token ve bilgileri temizle
      localStorage.clear();
      set({ token: null, refreshToken: null, role: null, error: null });
    }
  },

  // Token doğrulama
  verifyToken: async () => {
    try {
      const response = await axiosInstance.get("/users/verify", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const { role } = response.data;

      // Kullanıcı rolünü güncelle
      set({ role });
      return true;
    } catch (error) {
      console.error("Token doğrulama hatası:", error);
      set({ token: null, refreshToken: null, role: null });
      localStorage.clear();
      return false;
    }
  },

  // Token'ı güncelle
  setToken: (newToken) => {
    localStorage.setItem("token", newToken);
    set({ token: newToken });
  },
}));

export default useAuthStore;
