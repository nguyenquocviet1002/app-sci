import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import modalSearchStyles from '../ModalSearch/ModalSearch.module.scss';
import { getCompany } from '@/apis/Lead';

const ModalUpdate = ({ isShowing, hide, element, token, update, data }) => {
  let dataDefault;
  if (data.length === 0) {
    dataDefault = [
      {
        brand: '',
        code_form: '',
        company_code: '',
        company_name: '',
        create_date: '',
        ctv_user_id: '',
        ctv_user_name: '',
        interactive_proof: '',
        link_fb: '',
        name: '',
        name_fb: '',
        note: '',
        phone: '',
        script: '',
        seeding_user_id: '',
        seeding_user_name: '',
        service: '',
        type: '',
      },
    ];
  } else {
    dataDefault = data;
  }
  console.log(dataDefault);
  const [company, setCompany] = useState([]);
  const [companyFilter, setCompanyFilter] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [valueCompany, setValueCompany] = useState(dataDefault[0].company_name);
  console.log(valueCompany);
  // state search
  const [info, setInfo] = useState({
    token: token,
    name: dataDefault[0].name,
    phone: dataDefault[0].phone,
    link_fb: dataDefault[0].link_fb,
    name_fb: dataDefault[0].name_fb,
    service: dataDefault[0].service,
    note: dataDefault[0].note,
    script: dataDefault[0].script,
    interactive_proof: dataDefault[0].interactive_proof,
    company_id: dataDefault[0].company_code,
    type: dataDefault[0].type,
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
  return isShowing && element === 'ModalUpdate'
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal" id="modal-opacity-edit" style={{ display: 'flex' }}>
            <div className="modal-bg"></div>
            <div className="modal-box animate-opacity">
              <div className="modal-header">
                <div className="modal-close" onClick={hide}>
                  ×
                </div>
                <div className="modal-title">Sửa thông tin</div>
              </div>
              <div className="modal-body">
                <div className={modalSearchStyles['modalForm']}>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      defaultValue={data[0].name}
                      onChange={(e) => {
                        setInfo({ ...info, name: e.target.value });
                      }}
                    />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input
                      type="text"
                      placeholder="Số điện thoại"
                      defaultValue={data[0].phone}
                      onChange={(e) => {
                        setInfo({ ...info, phone: e.target.value });
                      }}
                    />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input
                      type="text"
                      defaultValue={data[0].name_fb}
                      onChange={(e) => {
                        setInfo({ ...info, name_fb: e.target.value });
                      }}
                    />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input
                      type="text"
                      placeholder="Link FB"
                      defaultValue={data[0].link_fb}
                      onChange={(e) => {
                        setInfo({ ...info, link_fb: e.target.value });
                      }}
                    />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input
                      type="text"
                      placeholder="Dịch vụ đăng ký"
                      defaultValue={data[0].service}
                      onChange={(e) => {
                        setInfo({ ...info, service: e.target.value });
                      }}
                    />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input
                      type="text"
                      placeholder="Chi nhánh"
                      defaultValue={valueCompany}
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
                      name="script"
                      defaultValue={data[0].script}
                      onChange={(e) => {
                        setInfo({ ...info, script: e.target.value });
                      }}
                    />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input
                      type="text"
                      name="interact"
                      defaultValue={data[0].interactive_proof}
                      onChange={(e) => {
                        setInfo({ ...info, interactive_proof: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className={modalSearchStyles['modalForm']}>
                  <textarea
                    placeholder="Ghi chú"
                    defaultValue={data[0].note}
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
                      update(info);
                    }}
                  >
                    Lưu thay đổi
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

export default ModalUpdate;
