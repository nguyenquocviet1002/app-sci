import { Navigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import Login from '@/components/Login';

export default function ScreenLogin() {
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null);
  if (token) {
    return <Navigate to="/dashboard/form" />;
  }

  return <Login />;
}
