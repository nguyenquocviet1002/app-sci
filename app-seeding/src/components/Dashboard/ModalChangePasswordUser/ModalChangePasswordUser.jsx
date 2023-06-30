import ReactDOM from 'react-dom';
import { useState } from 'react';
import { useUpdatePasswordUser } from '@/services/userService';
import Button from '@/components/UI/Button';

export default function ModalChangePasswordUser({ isShowing, hide, element, token, phoneLogin }) {
  const initialInfo = {
    token: token,
    login: phoneLogin,
    password: '',
    confirmPassword: '',
  };

  const [infoUser, setInfoUser] = useState(initialInfo);

  const { refetchUpdatePasswordUser } = useUpdatePasswordUser(infoUser);

  const handleChange = (name) => (event) => {
    setInfoUser((prev) => ({ ...prev, [name]: event.target.value, login: phoneLogin }));
  };

  const handleSubmit = () => {
    if (!infoUser.password || !infoUser.confirmPassword) {
      alert('Vui lòng nhập đầy đủ thông tin!');
    } else if (infoUser.password !== infoUser.confirmPassword) {
      alert('Mật khẩu không trùng khớp!');
    } else {
      refetchUpdatePasswordUser();
      setInfoUser(initialInfo);
      hide();
    }
  };

  return isShowing && element === 'ModalChangePasswordUser'
    ? ReactDOM.createPortal(
        <>
          <div className="modal">
            <div className="modal__box">
              <div className="modal__content">
                <button type="button" className="modal__close" onClick={hide}>
                  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                  </svg>
                </button>
                <h4 className="modal__head">Đổi mật khẩu</h4>
                <div className="modal__line"></div>
                <div className="modal__around">
                  <div className="modal__body">
                    <div>
                      <label htmlFor="password" className="modal__label">
                        Mật khẩu mới
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="modal__input"
                        onChange={handleChange('password')}
                      />
                    </div>
                    <div style={{ margin: '20px 0' }}>
                      <label htmlFor="confirm-password" className="modal__label">
                        Nhập lại mật khẩu mới
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        className=" modal__input"
                        onChange={handleChange('confirmPassword')}
                      />
                    </div>
                    <div className="modal__submit">
                      <Button
                        event={() => {
                          handleSubmit();
                        }}
                      >
                        Cập nhật
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal__bg" onClick={hide}></div>
        </>,
        document.body,
      )
    : null;
}
