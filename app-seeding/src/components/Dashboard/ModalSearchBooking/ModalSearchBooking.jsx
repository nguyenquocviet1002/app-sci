import ReactDOM from 'react-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useGetBooking } from '@/services/bookingService';

import Button from '@/components/UI/Button';

export default function ModalSearchBooking({ isShowing, hide, element, token, show, type, rule }) {
  const initialInfo = useMemo(() => {
    return {
      token: token,
      type: type,
      check: 'seeding',
      limit: '',
      offset: '',
      start_date: '',
      end_date: '',
      name: '',
      phone: '',
      code: '',
      user_seeding: '',
    };
  }, [token, type]);

  // state search
  const [info, setInfo] = useState(initialInfo);

  useEffect(() => {
    setInfo(initialInfo);
  }, [initialInfo]);

  const { refetchBooking } = useGetBooking(info);

  const handleChange = (name) => (event) => {
    setInfo((prev) => ({ ...prev, [name]: event.target.value }));
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

  return isShowing && element === 'ModalSearchBooking'
    ? ReactDOM.createPortal(
        <>
          <div>
            <div className="modal">
              <div className="modal__box modal__box--search" ref={ref}>
                <div className="modal__content">
                  <button type="button" className="modal__close" onClick={hide}>
                    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                    </svg>
                  </button>
                  <h4 className="modal__head">Tìm kiếm</h4>
                  <div className="modal__line"></div>
                  <div className="modal__around">
                    <div className="modal__body">
                      <div className="modal__formControl">
                        <div className="modal__formGroup">
                          <label htmlFor="name" className="modal__label">
                            Họ tên
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="modal__input"
                            value={info.name}
                            onChange={handleChange('name')}
                          />
                        </div>
                        <div className="modal__formGroup">
                          <label htmlFor="phone" className="modal__label">
                            Số điện thoại
                          </label>
                          <input
                            type="text"
                            id="phone"
                            className="modal__input"
                            value={info.phone}
                            onChange={handleChange('phone')}
                          />
                        </div>
                      </div>
                      <div className="modal__formControl" style={{ marginTop: '15px' }}>
                        <div className="modal__formGroup">
                          <label htmlFor="code" className="modal__label">
                            Mã booking
                          </label>
                          <input
                            type="text"
                            id="code"
                            className="modal__input"
                            value={info.code}
                            onChange={handleChange('code')}
                          />
                        </div>
                        {rule === 'user' ? null : (
                          <div className="modal__formGroup">
                            <label htmlFor="user-seeding" className="modal__label">
                              Nhân viên
                            </label>
                            <input
                              type="text"
                              id="user-seeding"
                              className="modal__input"
                              value={info.user_seeding}
                              onChange={handleChange('user_seeding')}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="modal__formControl" style={{ marginTop: '15px' }}>
                      <div className="modal__formGroup">
                        <label htmlFor="info-date-from" className="modal__label">
                          Từ
                        </label>
                        <input
                          type="date"
                          id="info-date-from"
                          className="modal__input"
                          value={info.start_date}
                          onChange={handleChange('start_date')}
                        />
                      </div>
                      <div className="modal__formGroup">
                        <label htmlFor="info-date-to" className="modal__label">
                          Đến
                        </label>
                        <input
                          type="date"
                          id="info-date-to"
                          className="modal__input"
                          value={info.end_date}
                          onChange={handleChange('end_date')}
                        />
                      </div>
                    </div>
                    <div className="modal__submit">
                      <Button
                        event={() => {
                          refetchBooking();
                          show(info);
                          hide();
                          setInfo(initialInfo);
                        }}
                      >
                        Tìm kiếm
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal__bg"></div>
          </div>
        </>,
        document.body,
      )
    : null;
}
