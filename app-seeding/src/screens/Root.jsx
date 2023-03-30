import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ScreensLogin from './Login/Login';
import ScreenDashboard from './Dashboard/Dashboard';
import Lead from '../components/Dasboard/Lead/Lead';

const ScreensRoot = () => {
  const storage = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route index element={storage ? <ScreenDashboard /> : <ScreensLogin />} />
        <Route path="login" element={<ScreensLogin />} />
        <Route path="dashboard" element={<ScreenDashboard />}>
          <Route path="lead" element={<Lead />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default ScreensRoot;
