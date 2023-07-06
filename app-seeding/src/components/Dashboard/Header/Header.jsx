import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/hooks/useModal';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useGetUser } from '@/services/userService';

import ModalChangePassword from '../ModalChangePassword';

import headerStyles from './Header.module.scss';

export default function Header() {
  const [isToggle, setIsToggle] = useState(false);
  const { isShowing, cpn, toggle } = useModal();

  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null);
  const navigate = useNavigate();

  const { dataUser, isSuccessUser } = useGetUser(token);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsToggle(!isToggle);
  };

  return (
    <>
      <header className={`${headerStyles['header']}`}>
        <div className="container-full" style={{ height: '100%' }}>
          <div className={headerStyles['header__content']}>
            <div className={headerStyles['header__left']}></div>
            <div className={headerStyles['header__right']}>
              <div className={headerStyles['header__cta']}>
                <button
                  className={headerStyles['header__changePassword']}
                  onClick={() => toggle('ModalChangePassword')}
                >
                  <span style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/key-solid.svg)` }}></span>
                  Đổi mật khẩu
                </button>
                <button className={headerStyles['header__logout']} onClick={() => logout()}>
                  <span
                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/right-from-bracket-solid.svg)` }}
                  ></span>
                  Đăng xuất
                </button>
              </div>
              <div className={headerStyles['header__info']}>
                {isSuccessUser && <p className={headerStyles['header__infoName']}>{dataUser.data.data.username}</p>}
                <div className={headerStyles['header__infoAvatar']} onClick={() => toggleDropdown()}>
                  <img src={`${process.env.PUBLIC_URL}/images/profile.png`} alt="" />
                </div>
                <div className={`${headerStyles['header__dropdown']} ${isToggle ? headerStyles['toggle'] : ''}`}>
                  <div className={headerStyles['header__dropdownCard']}>
                    {isSuccessUser && (
                      <div className={headerStyles['header__dropdownHead']}>{dataUser.data.data.username}</div>
                    )}
                    <div className={headerStyles['header__dropdownBody']}>
                      <div
                        className={headerStyles['header__dropdownLink']}
                        onClick={() => toggle('ModalChangePassword')}
                      >
                        <img src={`${process.env.PUBLIC_URL}/images/key-solid.svg`} alt="" />
                        <span>Đổi mật khẩu</span>
                      </div>
                      <div className={headerStyles['header__dropdownLink']} onClick={() => logout()}>
                        <img src={`${process.env.PUBLIC_URL}/images/right-from-bracket-solid.svg`} alt="" />
                        <span>Đăng xuất</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <ModalChangePassword isShowing={isShowing} hide={toggle} element={cpn} />
    </>
  );
}
