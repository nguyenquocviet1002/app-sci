import React from 'react';
import { useNavigate } from 'react-router-dom';
import useModal from '@/hooks/useModal';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import ModalPassword from '../ModalPassword/ModalPassword';
import navbarStyles from './Navbar.module.scss';
import { useGetUser } from '@/services';

const Navbar = () => {
  const { isShowing, cpn, toggle } = useModal();

  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null);
  const navigate = useNavigate();

  const { dataUser, isSuccessUser } = useGetUser(token);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <header className={navbarStyles['headerMain']}>
        <div className="container">
          <div className={navbarStyles['nav']}>
            <div className={navbarStyles['navUserName']}>
              <img src={`${process.env.PUBLIC_URL}/images/profile.png`} alt="" />
              {isSuccessUser && <p>{dataUser.data.data.username}</p>}
            </div>
            <div className={navbarStyles['navButton']}>
              <button
                className={`button ${navbarStyles['navButton__changePassword']} modal-btn btn`}
                data-modal="modal-opacity-changePass"
                onClick={() => toggle('ModalPassword')}
              >
                Đổi mật khẩu
              </button>
              <button className={`button ${navbarStyles['navButton__logout']}`} onClick={() => logout()}>
                Đăng xuất
                <span
                  className={navbarStyles['navIconLogout']}
                  style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/icon-logout.png)` }}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <ModalPassword isShowing={isShowing} hide={toggle} element={cpn} />
    </div>
  );
};

export default Navbar;
