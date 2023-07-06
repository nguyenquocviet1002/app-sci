import { useEffect, useState } from 'react';
import { Link, NavLink, useMatch, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useGetUser } from '@/services/userService';
import { useModal } from '@/hooks/useModal';
import { MENU_ADMIN, MENU_USER } from '@/utils/MENU';

import ModalConfirm from '../ModalConfirm';

import sidebarStyles from './Sidebar.module.scss';

export default function Sidebar({ isShow, event, close }) {
  const [redirect, setRedirect] = useState(false);
  const [isHover, setIsHover] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });
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
  const handleMouseEnter = (key) => {
    setIsHover((prev) => ({ ...prev, [key]: true }));
  };
  const handleMouseLeave = (key) => {
    setIsHover((prev) => ({ ...prev, [key]: false }));
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
                      onClick={() => {
                        close();
                        toggle('ModalConfirm');
                      }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                    >
                      <div
                        className={sidebarStyles['sidebar__icon']}
                        style={{
                          backgroundImage: `url(${
                            isHover[index] || matchActive
                              ? `${process.env.PUBLIC_URL}/images/${item.iconHover}`
                              : `${process.env.PUBLIC_URL}/images/${item.icon}`
                          })`,
                        }}
                      ></div>
                      {item.title}
                    </button>
                  </li>
                ) : (
                  <li key={index} className={sidebarStyles['sidebar__navItem']}>
                    <NavLink
                      to={item.link}
                      className={({ isActive }) => (isActive ? sidebarStyles['active'] : '')}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                      onClick={close}
                    >
                      {({ isActive }) => (
                        <>
                          <div
                            className={sidebarStyles['sidebar__icon']}
                            style={{
                              backgroundImage: `url(${
                                isHover[index] || isActive
                                  ? `${process.env.PUBLIC_URL}/images/${item.iconHover}`
                                  : `${process.env.PUBLIC_URL}/images/${item.icon}`
                              })`,
                            }}
                          ></div>
                          {item.title}
                        </>
                      )}
                    </NavLink>
                  </li>
                ),
              )
            : MENU_USER.map((item, index) =>
                item.link === 'check-data' ? (
                  <li key={index} className={sidebarStyles['sidebar__navItem']}>
                    <button
                      className={matchActive ? sidebarStyles['active'] : ''}
                      onClick={() => {
                        close();
                        toggle('ModalConfirm');
                      }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                    >
                      <div
                        className={sidebarStyles['sidebar__icon']}
                        style={{
                          backgroundImage: `url(${
                            isHover[index] || matchActive
                              ? `${process.env.PUBLIC_URL}/images/${item.iconHover}`
                              : `${process.env.PUBLIC_URL}/images/${item.icon}`
                          })`,
                        }}
                      ></div>
                      {item.title}
                    </button>
                  </li>
                ) : (
                  <li key={index} className={sidebarStyles['sidebar__navItem']}>
                    <NavLink
                      to={item.link}
                      className={({ isActive }) => (isActive ? sidebarStyles['active'] : '')}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                      onClick={close}
                    >
                      {({ isActive }) => (
                        <>
                          <div
                            className={sidebarStyles['sidebar__icon']}
                            style={{
                              backgroundImage: `url(${
                                isHover[index] || isActive
                                  ? `${process.env.PUBLIC_URL}/images/${item.iconHover}`
                                  : `${process.env.PUBLIC_URL}/images/${item.icon}`
                              })`,
                            }}
                          ></div>
                          {item.title}
                        </>
                      )}
                    </NavLink>
                  </li>
                ),
              )}
        </ul>
        <div
          className={sidebarStyles['sidebar__iconMenu']}
          style={{
            backgroundImage: `${
              !isShow
                ? `url(${process.env.PUBLIC_URL}/images/bars-solid.svg`
                : `url(${process.env.PUBLIC_URL}/images/xmark-solid.svg`
            })`,
          }}
          onClick={event}
        ></div>
      </aside>
      {isShow ? <div className={sidebarStyles['sidebar__bg']} onClick={event}></div> : null}

      <ModalConfirm isShowing={isShowing} hide={toggle} element={cpn} onSubmit={handelClick}>
        Bạn có muốn đi tới trang kiểm tra dữ liệu
      </ModalConfirm>
    </>
  );
}
