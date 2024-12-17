import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null, // localStorage'dan token yükle
  refreshToken: localStorage.getItem("refreshToken") || null,
  role: localStorage.getItem("role") || null, // Kullanıcı rolünü de sakla
  error: null,

  // Login işlemi
  login: async (username, password) => {
    try {
      const response = await axiosInstance.post("/users/login", {
        username,
        password,
      });

      if (response && response.data) {
        const { accessToken, refreshToken, role } = response.data;

        // Tokenları state'e ve localStorage'a kaydet
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role", role);

        set({
          token: accessToken,
          refreshToken,
          role,
          error: null,
        });
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
      // Tokenları temizle
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
      set({ token: null, refreshToken: null, role: null, error: null });
    }
  },

  // Token'ı güncelle
  setToken: (newToken) => {
    localStorage.setItem("token", newToken);
    set({ token: newToken });
  },
}));

export default useAuthStore;
