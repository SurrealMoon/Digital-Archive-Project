import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-emerald-50">
      <h1 className="text-3xl font-bold text-emerald-700">Başvurunuz Başarıyla Alındı!</h1>
      <p className="text-lg text-gray-700 mt-4">Başvurunuz için teşekkür ederiz. İlgili birimler en kısa sürede sizinle iletişime geçecektir.</p>
     
    </div>
  );
};

export default ThankYouPage;
