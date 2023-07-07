import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getTokenFn } from '@/api/auth';

import loginStyles from './Login.module.scss';

export default function Login() {
  const navigate = useNavigate();
  const initialLogin = {
    user: '',
    password: '',
  };

  const [infoUser, setInfoUser] = useState(initialLogin);
  const [validate, setValidate] = useState({ status: false, message: '' });

  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null);

  const handleChange = (name) => (event) => {
    setInfoUser((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const queryLogin = useQuery({
    queryKey: ['login', infoUser],
    queryFn: () => getTokenFn(infoUser),
    enabled: false,
    onSuccess: (data) => {
      if (data.data.message) {
        setValidate({ status: true, message: 'Số điện thoại hoặc mật khẩu không đúng' });
      } else if (data.data.active === false) {
        setValidate({ status: true, message: 'Tài khoản đã bị vô hiệu hóa' });
      } else {
        setToken(data.data.access_token);
        navigate('/dashboard/form');
      }
    },
  });

  const handleSubmit = () => {
    if (infoUser.user === '' || infoUser.password === '') {
      setValidate({ status: true, message: 'Số điện thoại và mật khẩu không được để trống' });
    } else {
      queryLogin.refetch();
    }
  };

  return (
    <div className={loginStyles['signin']}>
      <div className={loginStyles['signin__box']}>
        <div className={loginStyles['signin__left']}>
          <div className={loginStyles['signin__title']}>Quản trị Seeding</div>
          {validate.status ? <p className={loginStyles['signin__error']}>{validate.message}</p> : ''}
          <div className={loginStyles['signin__group']}>
            <label htmlFor="phone-number">Số điện thoại</label>
            <input
              type="text"
              id="phone-number"
              className={validate.status ? loginStyles['error'] : ''}
              value={infoUser.user}
              onChange={handleChange('user')}
              onFocus={() => setValidate({ status: false, message: '' })}
              onKeyDown={(e) => (e.key === 'Enter' ? handleSubmit() : '')}
            />
          </div>
          <div className={loginStyles['signin__group']}>
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              className={validate.status ? loginStyles['error'] : ''}
              id="password"
              value={infoUser.password}
              onChange={handleChange('password')}
              onFocus={() => setValidate({ status: false, message: '' })}
              onKeyDown={(e) => (e.key === 'Enter' ? handleSubmit() : '')}
            />
          </div>

          <button className={`button ${loginStyles['button--signin']}`} onClick={() => handleSubmit()}>
            Đăng nhập
          </button>
        </div>
        <div className={loginStyles['signin__right']}>
          <img className={loginStyles['signin__img']} src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="" />
        </div>
      </div>
    </div>
  );
}
