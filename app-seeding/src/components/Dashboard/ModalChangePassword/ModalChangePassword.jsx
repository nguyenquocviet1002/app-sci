import ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { updatePasswordFn } from '@/api/auth';

import Button from '@/components/UI/Button';

export default function ModalChangePassword({ isShowing, hide, element }) {
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
      await updatePasswordFn(info)
        .then((res) => {
          alert(res.data.result.message.content);
          setPasswordChange(initialPassword);
          hide();
        })
        .catch((err) => console.log(err));
    }
  };

  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        hide();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, hide]);

  return isShowing && element === 'ModalChangePassword'
    ? ReactDOM.createPortal(
        <>
          <div className="modal">
            <div className="modal__box" ref={ref}>
              <div className="modal__content">
                <button type="button" className="modal__close" onClick={hide}>
                  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                  </svg>
                </button>
                <h4 className="modal__head">Đổi mật khẩu</h4>
                <div className="modal__line"></div>
                <div className="modal__around">
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
                    <div style={{ margin: '20px 0' }}>
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
                    <div className="modal__submit">
                      <Button event={() => handleUpdate()}>Đổi mật khẩu</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal__bg"></div>
        </>,
        document.body,
      )
    : null;
}
