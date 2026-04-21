import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import SavedReports from './pages/SavedReports';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/report/:id" element={<ReportPage />} />
    <Route path="/saved" element={<SavedReports />} />
  </Routes>
);

export default AppRoutes;
