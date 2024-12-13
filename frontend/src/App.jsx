import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminLayoutPage from './layout/AdminLayout';
import ApplicationPage from './pages/admin/ApplicationListPage';
import ApplicationDetailsPage from './pages/admin/ApplicationDetailsPage'; 
import LawyerListPage from './pages/admin/LawyerListPage';
import CaseTrackingPage from './pages/admin/CaseTrackingListPage';
import MediaScanPage from './pages/admin/HumanRightsViolationArchive/MediaScanPage';
import StkDataPage from './pages/admin/HumanRightsViolationArchive/StkDataPage';
import BarCommissionsPage from './pages/admin/HumanRightsViolationArchive/BarCommissionsPage';
import PublicInstitutionsPage from './pages/admin/HumanRightsViolationArchive/PublicInstitutionsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ana giriş ekranı */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin layout ile iç içe rotalar */}
        <Route path="/admin-page" element={<AdminLayoutPage />}>
          <Route path="application-list" element={<ApplicationPage />} />
          <Route path="application-list/details/:id" element={<ApplicationDetailsPage />} /> 
          <Route path="case-list" element={<CaseTrackingPage/>} />
          <Route path="lawyer-list" element={<LawyerListPage />} />
                {/* Hak İhlali İzleme'nin alt sayfaları */}
          <Route path="rights-violation-archive/media-scan" element={<MediaScanPage />} />
          <Route path="rights-violation-archive/stk-data" element={<StkDataPage />} />
          <Route path="rights-violation-archive/bar-commissions" element={<BarCommissionsPage />} />
          <Route path="rights-violation-archive/public-institutions" element={<PublicInstitutionsPage />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
