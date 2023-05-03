import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import modalSearchStyles from '../ModalSearch/ModalSearch.module.scss';
import { getCompany } from '@/apis/Lead';

const ModalCreate = ({ isShowing, hide, element, token, create }) => {
  const [company, setCompany] = useState([]);
  const [companyFilter, setCompanyFilter] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [valueCompany, setValueCompany] = useState('');
  // state search
  const [info, setInfo] = useState({
    token: token,
    type: 'seeding',
    company_id: '',
    link_fb: '',
    name_fb: '',
    phone: '',
    service: '',
    note: '',
    script: '',
    interactive_proof: '',
    name: '',
  });

  const handleGetCompany = async () => {
    const { data } = await getCompany(token);
    const dataNew = data.data;
    dataNew.shift();
    dataNew.pop();
    setCompany(dataNew);
    setCompanyFilter(dataNew);
    setIsShow(true);
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

  return isShowing && element === 'ModalCreate'
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal" id="modal-opacity-add" style={{ display: 'flex' }}>
            <div className="modal-bg"></div>
            <div className="modal-box animate-opacity">
              <div className="modal-header">
                <div className="modal-close" onClick={hide}>
                  ×
                </div>
                <div className="modal-title">Thêm thông tin</div>
              </div>
              <div className="modal-body">
                <div className={modalSearchStyles['modalForm']}>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      onChange={(e) => {
                        setInfo({ ...info, name: e.target.value });
                      }}
                    />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input
                      type="text"
                      placeholder="Số điện thoại"
                      onChange={(e) => {
                        setInfo({ ...info, phone: e.target.value });
                      }}
                    />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input
                      type="text"
                      placeholder="Tên FB"
                      onChange={(e) => {
                        setInfo({ ...info, name_fb: e.target.value });
                      }}
                    />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input
                      type="text"
                      placeholder="Link FB"
                      onChange={(e) => {
                        setInfo({ ...info, link_fb: e.target.value });
                      }}
                    />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input
                      type="text"
                      placeholder="Dịch vụ đăng ký"
                      onChange={(e) => {
                        setInfo({ ...info, service: e.target.value });
                      }}
                    />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input
                      type="text"
                      placeholder="Chi nhánh"
                      value={valueCompany}
                      onChange={(e) => handleValue(e.target.value)}
                      onFocus={() => handleGetCompany()}
                      onBlur={() => {
                        setTimeout(() => {
                          setIsShow(false);
                        }, 500);
                      }}
                    />
                    <ul
                      className={modalSearchStyles['select']}
                      style={isShow ? { display: 'block' } : { display: 'none' }}
                    >
                      {companyFilter.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setValueCompany(item.name);
                            setInfo({ ...info, company_id: item.code });
                          }}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input
                      type="text"
                      placeholder="Kịch bản"
                      onChange={(e) => {
                        setInfo({ ...info, script: e.target.value });
                      }}
                    />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input
                      type="text"
                      placeholder="Tương tác"
                      onChange={(e) => {
                        setInfo({ ...info, interactive_proof: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className={modalSearchStyles['modalForm']}>
                  <textarea
                    placeholder="Ghi chú"
                    onChange={(e) => {
                      setInfo({ ...info, note: e.target.value });
                    }}
                  ></textarea>
                </div>
                <div className={modalSearchStyles['modal__line']}></div>
                <div className={modalSearchStyles['modalFooter']}>
                  <button
                    className="button modalFooter__search"
                    onClick={() => {
                      create(info);
                      hide();
                    }}
                  >
                    Thêm mới
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

export default ModalCreate;
