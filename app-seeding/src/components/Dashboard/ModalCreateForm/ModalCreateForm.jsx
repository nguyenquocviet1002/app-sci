import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGetCompany } from '@/services/formService';
import { createFormFn } from '@/api/form';

import Button from '@/components/UI/Button';
import Loading from '@/components/UI/Loading';

export default function ModalCreateForm({ isShowing, hide, element, token, refetch }) {
  const initialInfo = {
    token: token,
    type: 'seeding',
    company_id: '',
    name_fb: '',
    link_fb: '',
    phone: '',
    service: '',
    name: '',
    note: '',
    script: '',
    interactive_proof: '',
  };
  // state search
  const [info, setInfo] = useState(initialInfo);
  const [company, setCompany] = useState([]);
  const [companyFilter, setCompanyFilter] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [valueCompany, setValueCompany] = useState('');

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
  const handleChangePhone = (name) => (event) => {
    setInfo((prev) => ({ ...prev, [name]: event.target.value.replace(/\s/g, '') }));
  };

  const queryCreateForm = useQuery({
    queryKey: ['createForm'],
    queryFn: () => createFormFn(info),
    enabled: false,
    onSuccess: () => refetch(),
  });

  const handleSubmit = () => {
    if (!info.name || !info.phone || !info.service || !info.company_id) {
      alert('Vui lòng nhập đầy đủ các trường bắt buộc!!!');
    } else {
      queryCreateForm.refetch();
      hide();
      setInfo(initialInfo);
      setValueCompany('');
      setCompanyFilter(company);
    }
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

  return (
    <>
      {queryCreateForm.isFetching && <Loading />}
      {isShowing && element === 'ModalCreateForm'
        ? ReactDOM.createPortal(
            <>
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
                      <svg
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                      </svg>
                    </button>
                    <h4 className="modal__head">Thêm mới</h4>
                    <div className="modal__line"></div>
                    <div className="modal__around">
                      <div className="modal__body">
                        <div className="modal__formControl">
                          <div className="modal__formGroup">
                            <label htmlFor="name" className="modal__label">
                              Họ tên <span style={{ color: 'red' }}>(*)</span>
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
                              Số điện thoại <span style={{ color: 'red' }}>(*)</span>
                            </label>
                            <input
                              type="text"
                              id="phone"
                              className="modal__input"
                              value={info.phone}
                              onChange={handleChangePhone('phone')}
                            />
                          </div>
                        </div>
                        <div className="modal__formControl" style={{ marginTop: '15px' }}>
                          <div className="modal__formGroup">
                            <label htmlFor="service" className="modal__label">
                              Dịch vụ <span style={{ color: 'red' }}>(*)</span>
                            </label>
                            <input
                              type="text"
                              id="service"
                              className="modal__input"
                              value={info.service}
                              onChange={handleChange('service')}
                            />
                          </div>
                          <div className="modal__formGroup">
                            <label htmlFor="company" className="modal__label">
                              Chi nhánh <span style={{ color: 'red' }}>(*)</span>
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
                            <label htmlFor="link-fb" className="modal__label">
                              Link FB
                            </label>
                            <input
                              type="text"
                              id="link-fb"
                              className="modal__input"
                              value={info.link_fb}
                              onChange={handleChange('link_fb')}
                            />
                          </div>
                        </div>
                        <div className="modal__formControl" style={{ marginTop: '15px' }}>
                          <div className="modal__formGroup">
                            <label htmlFor="script" className="modal__label">
                              Kịch bản
                            </label>
                            <input
                              type="text"
                              id="script"
                              className="modal__input"
                              value={info.script}
                              onChange={handleChange('script')}
                            />
                          </div>
                          <div className="modal__formGroup">
                            <label htmlFor="interactive-proof" className="modal__label">
                              Tương tác
                            </label>
                            <input
                              type="text"
                              id="interactive-proof"
                              className="modal__input"
                              value={info.interactive_proof}
                              onChange={handleChange('interactive_proof')}
                            />
                          </div>
                        </div>
                        <div className="modal__formControl" style={{ marginTop: '15px' }}>
                          <div className="modal__formGroup modal__formGroup--single">
                            <label htmlFor="note" className="modal__label">
                              Ghi chú
                            </label>
                            <textarea
                              id="note"
                              rows="4"
                              className="modal__input"
                              value={info.note}
                              onChange={handleChange('note')}
                            ></textarea>
                          </div>
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
              <div className="modal__bg"></div>
            </>,
            document.body,
          )
        : null}
    </>
  );
}
