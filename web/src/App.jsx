// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApplicationFormPage from './pages/ApplicationFormPage';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Application Form route */}
        <Route path="/application-form" element={<ApplicationFormPage />} />
        {/* Thank You route */}
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;