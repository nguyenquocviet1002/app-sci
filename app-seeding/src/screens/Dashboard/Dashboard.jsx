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

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={dashboardStyles['main__layout']}>
      <Header event={handleLayout} isShow={isLayout} />
      <Sidebar isShow={isLayout} />
      <main className={`${dashboardStyles['main__body']} ${isLayout ? dashboardStyles['hide'] : ''}`}>
        <div className="container-full">
          <div className={dashboardStyles['main__content']}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
