import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ScreensLogin from './Login/Login';
import ScreenDashboard from './Dashboard/Dashboard';
import Lead from '../components/Dasboard/Lead/Lead';
import Booking from '../components/Dasboard/Booking/Booking';
import LeadBooking from '../components/Dasboard/LeadBooking/Booking';
import Expense from '../components/Dasboard/Expense/Expense';

const ScreensRoot = () => {
  const storage = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route index element={storage ? <ScreenDashboard /> : <ScreensLogin />} />
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
