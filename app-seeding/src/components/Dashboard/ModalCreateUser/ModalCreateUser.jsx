import ReactDOM from 'react-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createUserFn } from '@/api/userApi';

import Button from '@/components/UI/Button';

export default function ModalCreateUser({ isShowing, hide, element, token, refetch }) {
  const initialInfo = {
    token: token,
    name: '',
    phone: '',
    mobile: '',
    date_of_birth: '',
  };

  const [infoUser, setInfoUser] = useState(initialInfo);

  const queryCreateUser = useQuery({
    queryKey: ['userCreate'],
    queryFn: () => createUserFn(infoUser),
    enabled: false,
    onSuccess: () => refetch(),
  });

  const handleChange = (name) => (event) => {
    setInfoUser((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const handleSubmit = () => {
    queryCreateUser.refetch();
    setInfoUser(initialInfo);
    hide();
  };

  return isShowing && element === 'ModalCreateUser'
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
                <h3 className="modal__head">Thêm mới</h3>
                <div className="modal__around">
                  <div className="modal__body">
                    <div>
                      <label htmlFor="name" className="modal__label">
                        Họ và tên
                      </label>
                      <input type="text" id="name" className="modal__input" onChange={handleChange('name')} />
                    </div>
                    <div style={{ margin: '20px 0' }}>
                      <label htmlFor="phone1" className="modal__label">
                        Số điện thoại 1
                      </label>
                      <input type="text" id="phone1" className=" modal__input" onChange={handleChange('phone')} />
                    </div>
                    <div style={{ margin: '20px 0' }}>
                      <label htmlFor="phone2" className="modal__label">
                        Số điện thoại 2
                      </label>
                      <input type="text" id="phone2" className=" modal__input" onChange={handleChange('mobile')} />
                    </div>
                    <div style={{ margin: '20px 0' }}>
                      <label htmlFor="birth" className="modal__label">
                        Ngày sinh
                      </label>
                      <input
                        type="date"
                        id="birth"
                        className=" modal__input"
                        onChange={handleChange('date_of_birth')}
                      />
                    </div>
                    <div className="modal__submit">
                      <Button
                        event={() => {
                          handleSubmit();
                        }}
                      >
                        Thêm mới
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
