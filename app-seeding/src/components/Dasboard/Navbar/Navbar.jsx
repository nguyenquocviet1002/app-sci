import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../apis/User';
import ModalPassword from '../ModalPassword/ModalPassword';
import navbarStyles from './Navbar.module.scss';

const Navbar = () => {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);

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

  const showOff = () => {
    setShow(false);
  };

  return (
    <div>
      <header className={navbarStyles['headerMain']}>
        <div className="container">
          <div className={navbarStyles['nav']}>
            <div className={navbarStyles['navUserName']}>
              <img src="./images/profile.png" alt="" />
              <p>{user.username}</p>
            </div>
            <div className={navbarStyles['navButton']}>
              <button
                className="button navButton__changePassword modal-btn btn"
                data-modal="modal-opacity-changePass"
                onClick={() => setShow(true)}
              >
                Đổi mật khẩu
              </button>
              <button className="button navButton__logout" onClick={() => logout()}>
                Đăng xuất <i className="icon-logout"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
      <ModalPassword show={show} showOff={showOff} />
    </div>
  );
};

export default Navbar;
