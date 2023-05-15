import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from '@tanstack/react-query';
import { updateLeadFn } from '@/utils/api';
import { useGetCompany, useGetLeads } from '@/services';

const ModalUpdate = ({ isShowing, hide, element, token, data }) => {
  const [info, setInfo] = useState(data[0]);
  const [company, setCompany] = useState([]);
  const [companyFilter, setCompanyFilter] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [valueCompany, setValueCompany] = useState('');

  const { dataCompany, isSuccessCompany } = useGetCompany(token);
  const { refetchLead } = useGetLeads({
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
  });

  useEffect(() => {
    if (data.length !== 0) {
      setValueCompany(data[0].company_name);
    }
  }, [data]);
  useEffect(() => {
    if (isSuccessCompany) {
      setCompany(dataCompany.data.data);
      setCompanyFilter(dataCompany.data.data);
    }
  }, [isSuccessCompany, dataCompany, data, valueCompany]);

  const handleChange = (name) => (event) => {
    setInfo((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const queryUpdateLead = useQuery({
    queryKey: ['updateLead'],
    queryFn: () => updateLeadFn(info),
    enabled: false,
    refetchOnWindowFocus: false,
    cacheTime: 0,
    staleTime: 0,
    onSuccess: () => {
      refetchLead();
    },
  });

  const handleSubmit = () => {
    // queryUpdateLead.refetch();
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

  return isShowing && element === 'ModalUpdate'
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div>
            <div className="modal">
              <div className="modal__box modal__box--search">
                <div className="modal__content">
                  <button type="button" className="modal__close" onClick={hide}>
                    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                    </svg>
                  </button>
                  <div className="modal__around">
                    <h3 className="modal__head">Thêm mới</h3>
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
                            defaultValue={data[0].name}
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
                            defaultValue={data[0].phone}
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
                            defaultValue={data[0].name_fb}
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
                            defaultValue={data[0].link_fb}
                            onChange={handleChange('link_fb')}
                          />
                        </div>
                      </div>
                      <div className="modal__formControl" style={{ marginTop: '15px' }}>
                        <div className="modal__formGroup">
                          <label htmlFor="service" className="modal__label">
                            Dịch vụ
                          </label>
                          <input
                            type="text"
                            id="service"
                            className="modal__input"
                            defaultValue={data[0].service}
                            onChange={handleChange('service')}
                          />
                        </div>
                        <div className="modal__formGroup">
                          <label htmlFor="company" className="modal__label">
                            Chi nhánh
                          </label>
                          <input
                            type="text"
                            id="company"
                            className="modal__input"
                            autoComplete="off"
                            defaultValue={valueCompany}
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
                          <label htmlFor="script" className="modal__label">
                            Kịch bản
                          </label>
                          <input
                            type="text"
                            id="script"
                            className="modal__input"
                            defaultValue={data[0].script}
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
                            defaultValue={data[0].interactive_proof}
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
                            defaultValue={data[0].note}
                            onChange={handleChange('note')}
                          ></textarea>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="modal__submit modal__submit--1"
                        onClick={() => {
                          handleSubmit();
                          // hide();
                          // setInfo(initialInfo);
                          // setValueCompany('');
                        }}
                        style={{ marginTop: '30px' }}
                      >
                        Thêm mới
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

export default ModalUpdate;