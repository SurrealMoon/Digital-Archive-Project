import axios from "axios";

// Axios yapılandırmasını burada tutabilirsiniz
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,  // Backend URL'ini buradan alıyoruz
  withCredentials: true, // Cookies göndermeyi etkinleştir
});

export default axiosInstance;
