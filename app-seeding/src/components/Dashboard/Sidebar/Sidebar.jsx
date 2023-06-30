import { useEffect, useState } from 'react';
import { Link, NavLink, useMatch, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useGetUser } from '@/services/userService';
import { useModal } from '@/hooks/useModal';
import { MENU_ADMIN, MENU_USER } from '@/utils/MENU';

import sidebarStyles from './Sidebar.module.scss';
import ModalConfirm from '../ModalConfirm';

export default function Sidebar({ isShow }) {
  const [redirect, setRedirect] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null);
  const { dataUser, isSuccessUser } = useGetUser(token);
  const { isShowing, cpn, toggle } = useModal();
  const navigate = useNavigate();
  const matchActive = useMatch('/dashboard/check-data');
  useEffect(() => {
    setRedirect(false);
    if (redirect) {
      navigate('/dashboard/check-data');
    }
  }, [redirect, navigate]);
  const handelClick = () => {
    setRedirect(true);
  };

  return (
    <>
      <aside className={`${sidebarStyles['sidebar']} ${isShow ? sidebarStyles['show'] : ''}`}>
        <div className={sidebarStyles['sidebar__logo']}>
          <Link to="/">
            <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="" />
          </Link>
        </div>
        <ul className={sidebarStyles['sidebar__nav']}>
          {isSuccessUser && dataUser.data.data.rule === 'admin'
            ? MENU_ADMIN.map((item, index) =>
                item.link === 'check-data' ? (
                  <li key={index} className={sidebarStyles['sidebar__navItem']}>
                    <button
                      className={matchActive ? sidebarStyles['active'] : ''}
                      onClick={() => toggle('ModalConfirm')}
                    >
                      {item.title}
                    </button>
                  </li>
                ) : (
                  <li key={index} className={sidebarStyles['sidebar__navItem']}>
                    <NavLink to={item.link} className={({ isActive }) => (isActive ? sidebarStyles['active'] : '')}>
                      {item.title}
                    </NavLink>
                  </li>
                ),
              )
            : MENU_USER.map((item, index) =>
                item.link === 'check-data' ? (
                  <li key={index} className={sidebarStyles['sidebar__navItem']}>
                    <button
                      className={matchActive ? sidebarStyles['active'] : ''}
                      onClick={() => toggle('ModalConfirm')}
                    >
                      {item.title}
                    </button>
                  </li>
                ) : (
                  <li key={index} className={sidebarStyles['sidebar__navItem']}>
                    <NavLink to={item.link} className={({ isActive }) => (isActive ? sidebarStyles['active'] : '')}>
                      {item.title}
                    </NavLink>
                  </li>
                ),
              )}
        </ul>
      </aside>
      <ModalConfirm isShowing={isShowing} hide={toggle} element={cpn} onSubmit={handelClick}>
        Bạn có muốn đi tới trang kiểm tra dữ liệu
      </ModalConfirm>
    </>
  );
}
