import React from 'react';
import ReactDOM from 'react-dom';
import modalSearchStyles from '../ModalSearch/ModalSearch.module.scss';

const ModalSearchBooking = ({ isShowing, hide, element }) =>
  isShowing && element === 'ModalSearchBooking'
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal" id="modal-opacity" style={{ display: 'flex' }}>
            <div className="modal-bg"></div>
            <div className="modal-box animate-opacity">
              <div className="modal-header">
                <div className="modal-close" onClick={hide}>
                  ×
                </div>
                <div className="modal-title">Tìm kiếm</div>
              </div>
              <div className="modal-body">
                <div className={modalSearchStyles['modalForm']}>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input type="text" name="name" placeholder="Họ tên" />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input type="text" name="phone" placeholder="Số điện thoại" />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input type="text" name="namefb" placeholder="Tên FB" />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input type="text" name="service" placeholder="Dịch vụ" />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <input type="text" name="branch" placeholder="Chi nhánh" />
                  </div>
                </div>
                <div className="modal__line"></div>
                <div className={modalSearchStyles['modalForm']}>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <label for="">Từ:</label>
                    <input type="date" placeholder="Từ" />
                  </div>
                  <div className={modalSearchStyles['modalForm__input']}>
                    <label for="">Đến:</label>
                    <input type="date" placeholder="Đến" />
                  </div>
                </div>
                <div className={modalSearchStyles['modal__line']}></div>
                <div className={modalSearchStyles['modalFooter']}>
                  <button className="button modalFooter__search">Tìm kiếm</button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body,
      )
    : null;

export default ModalSearchBooking;
