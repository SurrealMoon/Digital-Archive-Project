import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import HitasLogo from "../assets/HitasLogo.png";
import useAuthStore from "../store/useAuthStore";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e) e.preventDefault(); // Formun varsayılan davranışını engelle
    const success = await login(username, password);
    if (success) {
      alert("Giriş başarılı!");
      const role = localStorage.getItem("role");
      navigate(role === "admin" ? "/admin-page" : "/lawyer-page");
    } else {
      alert("Giriş başarısız: " + error);
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: `url('https://i.pinimg.com/736x/1b/e6/3c/1be63c90b9cca12a901516396e50a415.jpg')`,
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96 text-center">
        <img src={HitasLogo} alt="Logo" className="w-44 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-rose-700 mb-4">
          HİTAS Kullanıcı Girişi
        </h1>
        <h2 className="text-lg text-gray-600 font-mono mb-6">
          Hak İhlali Takip Sistemi
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Kullanıcı Adı */}
          <InputField
            placeholder="Kullanıcı Adı"
            type="text"
            value={username}
            onChange={setUsername}
            className="mb-4 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-rose-700"
          />

          {/* Şifre */}
          <InputField
            placeholder="Şifre"
            type="password"
            value={password}
            onChange={setPassword}
            className="mb-6 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-rose-700"
          />

          {/* Giriş Butonu */}
          <Button
            label="Sisteme Giriş"
            type="submit" // Submit tipi olarak ayarlandı
            className="w-full py-2 bg-rose-700 text-white rounded hover:bg-rose-800 focus:ring-2 focus:ring-rose-700"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
