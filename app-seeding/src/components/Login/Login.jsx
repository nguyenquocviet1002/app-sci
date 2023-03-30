import React, { useState } from 'react';
import loginStyles from './Login.module.scss';
import { login } from '../../apis/Login';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setValidate] = useState(false);

  const navigate = useNavigate();

  const getLogin = async (user, password) => {
    await login(user, password)
      .then(({ data }) => {
        if (!data.message) {
          setValidate(false);
          localStorage.setItem('token', data.access_token);
          navigate('/dashboard');
        } else {
          setValidate(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={loginStyles['signin']}>
      <div className={loginStyles['signin__box']}>
        <div className={loginStyles['signin__left']}>
          <div className={loginStyles['signin__title']}>Đăng nhập</div>
          <div className={loginStyles['signin__group']}>
            <label htmlFor="phone-number">Số điện thoại</label>
            <input
              type="text"
              id="phone-number"
              className={validate ? loginStyles['error'] : ''}
              value={user}
              onChange={(event) => setUser(event.target.value)}
            />
          </div>
          <div className={loginStyles['signin__group']}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={validate ? loginStyles['error'] : ''}
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button className={`button ${loginStyles['button--signin']}`} onClick={() => getLogin(user, password)}>
            Sign in
          </button>
        </div>
        <div className={loginStyles['signin__right']}>
          <img className={loginStyles['signin__img']} src="/images/image.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
