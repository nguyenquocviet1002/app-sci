import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { updatePassword } from '@/apis/User';
import styleModalPassword from './ModalPassword.module.scss';

const ModalPassword = ({ isShowing, hide, element }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [require, setRequire] = useState(false);

  const update = async () => {
    const token = localStorage.getItem('token');
    if (newPassword !== confirmPassword || !newPassword || !confirmPassword) {
      setRequire(true);
    } else {
      let info = {
        token: token,
        password: newPassword,
      };
      await updatePassword(info)
        .then((res) => {
          alert(res.data.result.message.content);
          setNewPassword('');
          setConfirmPassword('');
        })
        .catch((err) => console.log(err));
    }
  };

  return isShowing && element === 'ModalPassword'
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal" id="modal-opacity-changePass" style={{ display: 'flex' }}>
            <div className="modal-bg"></div>
            <div className="modal-box animate-opacity">
              <div className="modal-header">
                <div className="modal-close" onClick={hide}>
                  ×
                </div>
                <div className="modal-title">Đổi mật khẩu</div>
              </div>
              <div className="modal-body">
                <div className="modalFormPass">
                  <div className={styleModalPassword['modalFormPass__input']}>
                    <input
                      type="password"
                      name="passwordNew"
                      className={require ? styleModalPassword['border-red'] : ''}
                      placeholder="Nhập mật khẩu mới..."
                      value={newPassword}
                      onChange={(event) => {
                        setNewPassword(event.target.value);
                        setRequire(false);
                      }}
                    />
                  </div>
                  <div className={styleModalPassword['modalFormPass__input']}>
                    <input
                      type="password"
                      name="passwordNewRetype"
                      className={require ? styleModalPassword['border-red'] : ''}
                      placeholder="Nhập lại mật khẩu mới..."
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        setRequire(false);
                      }}
                    />
                  </div>
                </div>
                <div className={styleModalPassword['modal__line']}></div>
                <div className={styleModalPassword['modalFooter']}>
                  <button className="button modalFooter__search" onClick={() => update()}>
                    Đổi mật khẩu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body,
      )
    : null;
};

export default ModalPassword;
