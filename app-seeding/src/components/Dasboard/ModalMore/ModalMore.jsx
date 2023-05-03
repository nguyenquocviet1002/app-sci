import React from 'react';
import ReactDOM from 'react-dom';
import modalSearchStyles from '../ModalSearch/ModalSearch.module.scss';

const ModalMore = ({ isShowing, hide, element, data }) =>
  isShowing && element === 'ModalMore'
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal" id="modal-opacity-edit" style={{ display: 'flex' }}>
            <div className="modal-bg"></div>
            <div className="modal-box animate-opacity">
              <div className="modal-header">
                <div className="modal-close" onClick={hide}>
                  ×
                </div>
                <div className="modal-title">Chi tiết</div>
              </div>
              <div className="modal-body">
                <div className={modalSearchStyles['modalForm--2']}>
                  <div
                    className={modalSearchStyles['modalForm__input']}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <label>Mã</label>
                    <input type="text" defaultValue={data[0].code_form} disabled />
                  </div>
                  <div
                    className={modalSearchStyles['modalForm__input']}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <label>Họ và tên</label>
                    <input type="text" defaultValue={data[0].name} disabled />
                  </div>
                  <div
                    className={modalSearchStyles['modalForm__input']}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <label>Số điện thoại</label>
                    <input type="text" defaultValue={data[0].phone} disabled />
                  </div>
                  <div
                    className={modalSearchStyles['modalForm__input']}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <label>Facebook</label>
                    <a href={data[0].link_fb}>{data[0].name_fb}</a>
                  </div>
                  <div
                    className={modalSearchStyles['modalForm__input']}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <label>Dịch vụ đăng ký</label>
                    <input type="text" defaultValue={data[0].service} disabled />
                  </div>
                  <div
                    className={modalSearchStyles['modalForm__input']}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <label>Chi nhánh</label>
                    <input type="text" defaultValue={data[0].company_name} disabled />
                  </div>
                  <div
                    className={modalSearchStyles['modalForm__input']}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <label>Kịch bản</label>
                    <input type="text" defaultValue={data[0].script} disabled />
                  </div>
                  <div
                    className={modalSearchStyles['modalForm__input']}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <label>Tương tác</label>
                    <input type="text" defaultValue={data[0].interactive_proof} disabled />
                  </div>
                  <div
                    className={modalSearchStyles['modalForm__input']}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <label>Thời gian</label>
                    <input type="text" defaultValue={data[0].create_date} disabled />
                  </div>
                  <div
                    className={modalSearchStyles['modalForm__input']}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <label>Ghi chú</label>
                    <input type="text" defaultValue={data[0].note} disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body,
      )
    : null;

export default ModalMore;
