import { Link, NavLink } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MENU_ADMIN, MENU_USER } from '@/utils/MENU';
import { useGetUser } from '@/services/userService';

import sidebarStyles from './Sidebar.module.scss';

export default function Sidebar({ isShow }) {
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null);
  const { dataUser, isSuccessUser } = useGetUser(token);

  return (
    <aside className={`${sidebarStyles['sidebar']} ${isShow ? sidebarStyles['show'] : ''}`}>
      <div className={sidebarStyles['sidebar__logo']}>
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="" />
        </Link>
      </div>
      <ul className={sidebarStyles['sidebar__nav']}>
        {isSuccessUser && dataUser.data.data.rule === 'admin'
          ? MENU_ADMIN.map((item, index) => (
              <li key={index} className={sidebarStyles['sidebar__navItem']}>
                <NavLink to={item.link} className={({ isActive }) => (isActive ? sidebarStyles['active'] : '')}>
                  {item.title}
                </NavLink>
              </li>
            ))
          : MENU_USER.map((item, index) => (
              <li key={index} className={sidebarStyles['sidebar__navItem']}>
                <NavLink to={item.link} className={({ isActive }) => (isActive ? sidebarStyles['active'] : '')}>
                  {item.title}
                </NavLink>
              </li>
            ))}
      </ul>
    </aside>
  );
}
