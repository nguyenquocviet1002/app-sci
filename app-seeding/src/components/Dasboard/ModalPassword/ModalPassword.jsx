import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { updatePassword } from '@/apis/User';

const ModalPassword = ({ isShowing, hide, element }) => {
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null);

  const initialPassword = {
    newPassword: '',
    confirmPassword: '',
  };

  const [passwordChange, setPasswordChange] = useState(initialPassword);
  const [validate, setValidate] = useState({ status: false, message: '' });

  const handleChange = (name) => (event) => {
    setPasswordChange((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const handleUpdate = async () => {
    if (!passwordChange.newPassword || !passwordChange.confirmPassword) {
      setValidate({ status: true, message: 'Mật khẩu không được để trống' });
    } else if (passwordChange.newPassword !== passwordChange.confirmPassword) {
      setValidate({ status: true, message: 'Mật khẩu không trùng khớp' });
    } else {
      let info = {
        token: token,
        password: passwordChange.newPassword,
      };
      await updatePassword(info)
        .then((res) => {
          alert(res.data.result.message.content);
          setPasswordChange(initialPassword);
          hide();
        })
        .catch((err) => console.log(err));
    }
  };

  return isShowing && element === 'ModalPassword'
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div>
            <div className="modal">
              <div className="modal__box">
                <div className="modal__content">
                  <button type="button" className="modal__close" onClick={hide}>
                    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                    </svg>
                  </button>
                  <div className="modal__around">
                    <h3 className="modal__head">Đổi mật khẩu</h3>
                    {validate.status && <span className="modal__error">{validate.message}</span>}
                    <div className="modal__body">
                      <div>
                        <label htmlFor="password-new" className="modal__label">
                          Mật khẩu mới
                        </label>
                        <input
                          type="text"
                          id="password-new"
                          className={`${validate.status ? 'border-red' : ''} modal__input`}
                          value={passwordChange.newPassword}
                          onChange={handleChange('newPassword')}
                          onFocus={() => setValidate({ status: false, message: '' })}
                        />
                      </div>
                      <div style={{ margin: '25px 0' }}>
                        <label htmlFor="password-confirm" className="modal__label">
                          Xác nhận mật khẩu
                        </label>
                        <input
                          type="text"
                          id="password-confirm"
                          className={`${validate.status ? 'border-red' : ''} modal__input `}
                          value={passwordChange.confirmPassword}
                          onChange={handleChange('confirmPassword')}
                          onFocus={() => setValidate({ status: false, message: '' })}
                        />
                      </div>
                      <button type="button" className="modal__submit" onClick={() => handleUpdate()}>
                        Đổi mật khẩu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal__bg" onClick={hide}></div>
          </div>
        </React.Fragment>,
        document.body,
      )
    : null;
};

export default ModalPassword;
