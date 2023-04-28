import React from 'react';
import dashboardStyles from './Dashboard.module.scss';
import Navbar from '@/components/Dasboard/Navbar/Navbar';
import Tabs from '@/components/Dasboard/Tabs/Tabs';
import { Outlet } from 'react-router-dom';

const ScreenDashboard = () => {
  return (
    <div className={dashboardStyles['box__body']}>
      <Navbar />
      <div className="container">
        <Tabs />
        <Outlet />
      </div>
    </div>
  );
};

export default ScreenDashboard;
