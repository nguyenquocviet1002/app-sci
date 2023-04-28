import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '@/apis/User';
import ModalPassword from '../ModalPassword/ModalPassword';
import navbarStyles from './Navbar.module.scss';
import useModal from '@/hooks/useModal';

const Navbar = () => {
  const [user, setUser] = useState({});

  const { isShowing, cpn, toggle } = useModal();

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    getUser(token)
      .then(({ data }) => {
        let user = {
          rule: data.data.rule,
          username: data.data.username,
        };
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

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
              <p>{user.username}</p>
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
