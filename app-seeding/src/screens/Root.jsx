import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ScreensLogin from './Login/Login';
import ScreenDashboard from './Dashboard/Dashboard';
import Lead from '../components/Dasboard/Lead/Lead';
import Booking from '../components/Dasboard/Booking/Booking';
import LeadBooking from '../components/Dasboard/LeadBooking/Booking';
import Expense from '../components/Dasboard/Expense/Expense';

const ScreensRoot = () => {
  const [storage, setStorage] = useState('');
  useEffect(() => {
    setStorage(localStorage.getItem('token'));
  }, []);

  return (
    <Router basename="/cp/app-seeding">
      <Routes>
        <Route index element={storage ? <Navigate to="/dashboard/lead" replace /> : <ScreensLogin />} />
        <Route path="login" element={<ScreensLogin />} />
        <Route path="dashboard" element={<ScreenDashboard />}>
          <Route path="lead" element={<Lead />} />
          <Route path="booking" element={<Booking />} />
          <Route path="lead-booking" element={<LeadBooking />} />
          <Route path="expense" element={<Expense />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default ScreensRoot;
