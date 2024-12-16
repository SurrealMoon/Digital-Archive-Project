import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3002/api", // Backend URL
  withCredentials: true, // Cookie göndermeyi etkinleştir
});

// Request Interceptor: Token'ı her isteğe ekle
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token; // Zustand store'dan token al
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Token'ı header'a ekle
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: 401 hatasını yakala ve token yenile
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = useAuthStore.getState().refreshToken;

    // Eğer 401 hatası varsa ve daha önce denenmediyse
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshToken // Refresh token kontrolü
    ) {
      originalRequest._retry = true;

      try {
        // Refresh token ile yeni access token al
        const response = await axiosInstance.post("/admin/refresh-token", {});

        const newAccessToken = response.data.accessToken;

        // Store'u güncelle
        useAuthStore.getState().setToken(newAccessToken);

        // Yeni token'ı header'a ekleyerek isteği tekrar et
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token yenileme hatası:", refreshError);
        useAuthStore.getState().logout(); // Kullanıcıyı çıkış yap
        window.location.href = "/login"; // Giriş sayfasına yönlendir
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
