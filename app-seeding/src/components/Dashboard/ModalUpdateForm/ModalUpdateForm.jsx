import ReactDOM from 'react-dom';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGetCompany } from '@/services/formService';
import { updateFormFn } from '@/api/form';

import Loading from '@/components/UI/Loading';
import Button from '@/components/UI/Button';

export default function ModalUpdateForm({ isShowing, hide, element, token, data, refetch }) {
  const initialInfo = useMemo(() => {
    if (!data[0]) {
      return {
        token: token,
        code_form: '',
        name: '',
        phone: '',
        link_fb: '',
        name_fb: '',
        service: '',
        note: '',
        script: '',
        interactive_proof: '',
        company_id: '',
        company_name: '',
        type: '',
        seeding_user_id: '',
        ctv_user_id: '',
        brand: '',
      };
    } else {
      return {
        token: token,
        code_form: data[0].code_form,
        name: data[0].name,
        phone: data[0].phone,
        link_fb: data[0].link_fb,
        name_fb: data[0].name_fb,
        service: data[0].service,
        note: data[0].note,
        script: data[0].script,
        interactive_proof: data[0].interactive_proof,
        company_id: data[0].company_code,
        company_name: data[0].company_name,
        type: data[0].type,
        seeding_user_id: data[0].seeding_user_id ? data[0].seeding_user_id : '',
        ctv_user_id: data[0].ctv_user_id ? data[0].ctv_user_id : false,
        brand: data[0].brand,
      };
    }
  }, [token, data]);

  const [info, setInfo] = useState(initialInfo);
  const [company, setCompany] = useState([]);
  const [companyFilter, setCompanyFilter] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [valueCompany, setValueCompany] = useState(initialInfo.company_name);

  const { dataCompany, isSuccessCompany } = useGetCompany(token);

  useEffect(() => {
    setInfo(initialInfo);
    setValueCompany(initialInfo.company_name);
  }, [initialInfo]);

  useEffect(() => {
    if (isSuccessCompany) {
      setCompany(dataCompany.data.data);
      setCompanyFilter(dataCompany.data.data);
    }
  }, [isSuccessCompany, dataCompany]);

  const handleChange = (name) => (event) => {
    setInfo((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const queryUpdateForm = useQuery({
    queryKey: ['updateForm'],
    queryFn: () => updateFormFn(info),
    enabled: false,
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = () => {
    queryUpdateForm.refetch();
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
      {queryUpdateForm.isFetching && <Loading />}
      {isShowing && element === 'ModalUpdateForm'
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
                    <h4 className="modal__head">Sửa thông tin</h4>
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
                              defaultValue={info.name}
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
                              defaultValue={info.phone}
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
                              defaultValue={info.name_fb}
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
                              defaultValue={info.link_fb}
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
                              defaultValue={info.service}
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
                            <label htmlFor="script" className="modal__label">
                              Kịch bản
                            </label>
                            <input
                              type="text"
                              id="script"
                              className="modal__input"
                              defaultValue={info.script}
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
                              defaultValue={info.interactive_proof}
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
                              defaultValue={info.note}
                              onChange={handleChange('note')}
                            ></textarea>
                          </div>
                        </div>
                        <div className="modal__submit">
                          <Button
                            event={() => {
                              handleSubmit();
                              hide();
                              setValueCompany('');
                              setCompanyFilter(company);
                            }}
                          >
                            Lưu thay đổi
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
