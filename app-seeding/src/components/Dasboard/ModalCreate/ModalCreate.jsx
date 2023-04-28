import React from 'react';
import ReactDOM from 'react-dom';
import modalSearchStyles from '../ModalSearch/ModalSearch.module.scss';

const ModalCreate = ({ isShowing, hide, element }) =>
  isShowing && element === 'ModalCreate'
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
                    <input type="text" name="name" placeholder="Họ và tên" />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input type="text" name="phone" placeholder="Số điện thoại" />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input type="text" name="namefb" placeholder="Tên FB" />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input type="text" name="namefb" placeholder="Link FB" />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input type="text" name="service" placeholder="Dịch vụ đăng ký" />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input type="text" name="branch" placeholder="Chi nhánh" />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input type="text" name="script" placeholder="Kịch bản" />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input type="text" name="interact" placeholder="Tương tác" />
                  </div>
                </div>
                <div className={modalSearchStyles['modalForm']}>
                  <textarea name="note" id="" placeholder="Ghi chú"></textarea>
                </div>
                <div className={modalSearchStyles['modal__line']}></div>
                <div className={modalSearchStyles['modalFooter']}>
                  <button className="button modalFooter__search">Thêm mới</button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body,
      )
    : null;

export default ModalCreate;
