import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useAuthStore = create((set) => ({
  token: null,
  refreshToken: null,
  error: null,

  // Login işlemi
  login: async (username, password) => {
    try {
      const response = await axiosInstance.post("/admin/login", {
        username,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      // Tokenları state'e kaydet
      set({
        token: accessToken,
        refreshToken, // Refresh token'ı kaydet
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
      set({ token: null, refreshToken: null, error: null });
    }
  },

  // Token'ı güncelle
  setToken: (newToken) => set({ token: newToken }),
}));

export default useAuthStore;
