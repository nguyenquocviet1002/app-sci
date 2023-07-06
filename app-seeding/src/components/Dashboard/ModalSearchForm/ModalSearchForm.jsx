import ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { useGetCompany, useGetForm } from '@/services/formService';

import Button from '@/components/UI/Button';

export default function ModalSearchForm({ isShowing, hide, element, token, show, rule }) {
  const initialInfo = {
    token: token,
    brand_id: '',
    type: 'seeding',
    limit: 0,
    offset: 0,
    company_id: '',
    name_fb: '',
    phone: '',
    service: '',
    name: '',
    start_date: '',
    end_date: '',
    user_seeding: '',
    company_name: '',
  };

  // state search
  const [info, setInfo] = useState(initialInfo);
  const [company, setCompany] = useState([]);
  const [companyFilter, setCompanyFilter] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [valueCompany, setValueCompany] = useState('');

  const { refetchForm } = useGetForm(info);

  const { dataCompany, isSuccessCompany } = useGetCompany(token);

  useEffect(() => {
    if (isSuccessCompany) {
      setCompany(dataCompany.data.data);
      setCompanyFilter(dataCompany.data.data);
    }
  }, [isSuccessCompany, dataCompany]);

  const handleChange = (name) => (event) => {
    setInfo((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const handleValue = (e) => {
    setValueCompany(e);
    const filter = e.toLowerCase().replace(/\s/g, '');
    const normalizeFilter = filter
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
    const arrNew = company.filter((item) => {
      const name = item.name.toLowerCase().replace(/\s/g, '');
      const normalizeName = name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
      return normalizeName.includes(normalizeFilter);
    });
    if (e.length === 0) {
      setCompanyFilter(company);
    } else {
      setCompanyFilter(arrNew);
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

  return isShowing && element === 'ModalSearchForm'
    ? ReactDOM.createPortal(
        <>
          <div>
            <div className="modal">
              <div className="modal__box modal__box--search" ref={ref}>
                <div className="modal__content">
                  <button
                    type="button"
                    className="modal__close"
                    onClick={() => {
                      hide();
                      setValueCompany('');
                      setCompanyFilter(company);
                    }}
                  >
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
                          <label htmlFor="name-fb" className="modal__label">
                            Tên FB
                          </label>
                          <input
                            type="text"
                            id="name-fb"
                            className="modal__input"
                            value={info.name_fb}
                            onChange={handleChange('name_fb')}
                          />
                        </div>
                        <div className="modal__formGroup">
                          <label htmlFor="service" className="modal__label">
                            Dịch vụ
                          </label>
                          <input
                            type="text"
                            id="service"
                            className="modal__input"
                            value={info.service}
                            onChange={handleChange('service')}
                          />
                        </div>
                      </div>
                      <div className="modal__formControl" style={{ marginTop: '15px' }}>
                        <div className="modal__formGroup">
                          <label htmlFor="company" className="modal__label">
                            Chi nhánh
                          </label>
                          <input
                            type="text"
                            id="company"
                            className="modal__input"
                            autoComplete="off"
                            value={valueCompany}
                            onChange={(e) => handleValue(e.target.value)}
                            onFocus={() => setIsShow(true)}
                            onBlur={() => {
                              setTimeout(() => {
                                setIsShow(false);
                              }, 500);
                            }}
                          />
                          <ul
                            className="modal__selectCompany"
                            style={isShow ? { display: 'block' } : { display: 'none' }}
                          >
                            {companyFilter.map((item, index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  setValueCompany(item.name);
                                  setInfo({ ...info, company_id: item.code, company_name: item.name });
                                }}
                              >
                                {item.name}
                              </li>
                            ))}
                          </ul>
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
                            refetchForm();
                            show(info);
                            hide();
                            setValueCompany('');
                            setCompanyFilter(company);
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
            </div>
            <div className="modal__bg"></div>
          </div>
        </>,
        document.body,
      )
    : null;
}
