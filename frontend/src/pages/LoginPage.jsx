import React from 'react';
import Button from '../components/Button'; 
import InputField from '../components/InputField'; 
import HitasLogo from '../assets/HitasLogo.png';

const LoginPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url('https://i.pinimg.com/736x/1b/e6/3c/1be63c90b9cca12a901516396e50a415.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '400px',
          textAlign: 'center',
        }}
      >
        <img
          src={HitasLogo}
          alt="Logo"
          style={{
            width: '180px',
            marginBottom: '10px',
            display: 'block', 
            marginLeft: 'auto', 
            marginRight: 'auto', 
          }}
        />
      <h1 
  style={{ 
    fontSize: '30px', 
    fontWeight: 'bold', 
    marginBottom: '30px', 
    color: '#be123c', 
  }}
>
  HİTAS Kullanıcı Girişi
</h1>

<h1
style={{ 
    fontSize: '20px', // Başlığı daha büyük yapmak için
    marginBottom: '30px', 
    color: '#8587A3', 
    fontFamily:'monospace'
  }}>
    Hak İhlali Takip Sistemi 
</h1>
        <InputField
          placeholder="T.C. Kimlik No"
          type="text"
          style={{ marginBottom: '15px' }}
        />
        <InputField
          placeholder="Şifre"
          type="password"
          style={{ marginBottom: '20px' }}
        />
        <Button
          label="Sisteme Giriş"
          className="bg-rose-700 text-white hover:bg-blue-700"
          onClick={() => alert('Giriş yapıldı!')}
        />
       
      </div>
    </div>
  );
};

export default LoginPage;
