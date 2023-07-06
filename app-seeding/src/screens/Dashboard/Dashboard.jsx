import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import Header from '@/components/Dashboard/Header';
import Sidebar from '@/components/Dashboard/Sidebar';

import dashboardStyles from './Dashboard.module.scss';

export default function ScreenDashboard() {
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null);
  const [isLayout, setIsLayout] = useState(false);

  const handleLayout = () => {
    setIsLayout(!isLayout);
  };

  const closeLayout = () => {
    setIsLayout(false);
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={dashboardStyles['main__layout']}>
      <Header />
      <Sidebar isShow={isLayout} event={handleLayout} close={closeLayout} />
      <main className={`${dashboardStyles['main__body']}`}>
        <div className="container-full">
          <div className={dashboardStyles['main__content']}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
