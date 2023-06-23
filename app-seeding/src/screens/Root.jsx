import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import ScreenLogin from './Login';
import ScreenDashboard from './Dashboard';
import Form from '@/components/Dashboard/Form';
import Booking from '@/components/Dashboard/Booking';
import Quantity from '@/components/Dashboard/Quantity';
import Expense from '@/components/Dashboard/Expense';
import Staff from '@/components/Dashboard/Staff';

const ScreensRoot = () => {
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null);

  return (
    <Router basename="/cp/app-seeding">
      <Routes>
        <Route index element={token ? <Navigate to="/dashboard/form" replace /> : <Navigate to="/login" replace />} />
        <Route path="login" element={<ScreenLogin />} />
        <Route path="dashboard" element={<ScreenDashboard />}>
          <Route path="form" element={<Form />} />
          <Route path="lead-booking" element={<Booking />} />
          <Route path="quantity/*" element={<Quantity />} />
          <Route path="expense" element={<Expense />} />
          <Route path="staff" element={<Staff />} />
        </Route>
        <Route path="*" element={<>404</>} />
      </Routes>
    </Router>
  );
};

export default ScreensRoot;
