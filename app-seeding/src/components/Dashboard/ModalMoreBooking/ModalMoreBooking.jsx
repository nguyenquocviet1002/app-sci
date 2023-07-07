import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export default function ModalMoreBooking({ isShowing, hide, element, data }) {
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

  return isShowing && element === 'ModalMoreBooking'
    ? ReactDOM.createPortal(
        <>
          <div>
            <div className="modal">
              <div className="modal__box modal__box--more" ref={ref}>
                <div className="modal__content">
                  <button type="button" className="modal__close" onClick={hide}>
                    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                    </svg>
                  </button>
                  <h4 className="modal__head">Thông tin</h4>
                  <div className="modal__line"></div>
                  <div className="modal__around">
                    <div className="modal__body">
                      <div className="modal__info--bot">
                        <div className="modal__aside">
                          <div className="modal__infoName">
                            <div className="modal__infoIcon">
                              <img
                                width="150"
                                height="150"
                                src={`${process.env.PUBLIC_URL}/images/icon-info.png`}
                                alt=""
                              />
                            </div>
                            <span>Thông tin cá nhân</span>
                          </div>
                          <div className="modal__infoContent">
                            <div className="modal__infoContentItem">
                              <div className="modal__infoLabel">Họ tên:</div>
                              <div className="modal__infoValue">{data[0].contact_name}</div>
                            </div>
                            <div className="modal__infoContentItem">
                              <div className="modal__infoLabel">Điện thoại 1:</div>
                              <div className="modal__infoValue">{data[0].phone_1}</div>
                            </div>
                            {data[0].phone_2 && (
                              <div className="modal__infoContentItem">
                                <div className="modal__infoLabel">Điện thoại 2:</div>
                                <div className="modal__infoValue">{data[0].phone_2}</div>
                              </div>
                            )}
                            {data[0].city && (
                              <div className="modal__infoContentItem">
                                <div className="modal__infoLabel">Tỉnh/TP:</div>
                                <div className="modal__infoValue">{data[0].city}</div>
                              </div>
                            )}
                            <div className="modal__infoContentItem">
                              <div className="modal__infoLabel">Ngày hẹn lịch:</div>
                              <div className="modal__infoValue">
                                {new Date(data[0].booking_date).toLocaleDateString('en-GB')}
                              </div>
                            </div>
                            <div className="modal__infoContentItem">
                              <div className="modal__infoLabel">Hiệu lực đến ngày:</div>
                              <div className="modal__infoValue">
                                {new Date(data[0].day_expire).toLocaleDateString('en-GB')}
                              </div>
                            </div>
                            <div className="modal__infoContentItem">
                              <div className="modal__infoLabel">Trạng thái hiệu lực:</div>
                              <div className="modal__infoValue">{data[0].effect}</div>
                            </div>
                          </div>
                        </div>
                        <div className="modal__aside">
                          <div className="modal__infoName">
                            <div className="modal__infoIcon">
                              <img
                                width="150"
                                height="150"
                                src={`${process.env.PUBLIC_URL}/images/icon-bookmark.png`}
                                alt=""
                              />
                            </div>
                            <span>Booking</span>
                          </div>
                          <div className="modal__infoContent">
                            <div className="modal__infoContentItem">
                              <div className="modal__infoLabel">Mã booking:</div>
                              <div className="modal__infoValue">{data[0].code_booking}</div>
                            </div>
                            <div className="modal__infoContentItem">
                              <div className="modal__infoLabel">Dịch vụ:</div>
                              <div className="modal__infoValue">
                                {data[0].line_ids.length !== 0 ? data[0].line_ids.join(', ') : 'Trống'}
                              </div>
                            </div>
                            <div className="modal__infoContentItem">
                              <div className="modal__infoLabel">Trạng thái:</div>
                              <div className="modal__infoValue">{data[0].stage_id}</div>
                            </div>
                            <div className="modal__infoContentItem">
                              <div className="modal__infoLabel">Đơn giá:</div>
                              <div className="modal__infoValue">
                                {data[0].dongia
                                  ? data[0].dongia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                  : '0 VND'}
                              </div>
                            </div>
                            <div className="modal__infoContentItem">
                              <div className="modal__infoLabel">Tiền trước giảm:</div>
                              <div className="modal__infoValue">
                                {data[0].tien_truoc_giam
                                  ? data[0].tien_truoc_giam.toLocaleString('it-IT', {
                                      style: 'currency',
                                      currency: 'VND',
                                    })
                                  : '0 VND'}
                              </div>
                            </div>
                            <div className="modal__infoContentItem">
                              <div className="modal__infoLabel">Tiền phải thu:</div>
                              <div className="modal__infoValue">
                                {data[0].tien_phai_thu
                                  ? data[0].tien_phai_thu.toLocaleString('it-IT', {
                                      style: 'currency',
                                      currency: 'VND',
                                    })
                                  : '0 VND'}
                              </div>
                            </div>
                            <div className="modal__infoContentItem">
                              <div className="modal__infoLabel">Tiền đã thu:</div>
                              <div className="modal__infoValue">
                                {data[0].tien_da_thu
                                  ? data[0].tien_da_thu.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                  : '0 VND'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal__info--main">
                        <div className="modal__infoName">
                          <div className="modal__infoIcon">
                            <img
                              width="150"
                              height="150"
                              src={`${process.env.PUBLIC_URL}/images/icon-company.png`}
                              alt=""
                            />
                          </div>
                          <span>Thương hiệu</span>
                        </div>
                        <div className="modal__infoContent">
                          <div className="modal__infoContentItem">
                            <div className="modal__infoLabel modal__infoLabel--1">Thương hiệu:</div>
                            <div className="modal__infoValue">{data[0].brand}</div>
                          </div>
                          <div className="modal__infoContentItem">
                            <div className="modal__infoLabel modal__infoLabel--1">Chi nhánh:</div>
                            <div className="modal__infoValue">{data[0].company}</div>
                          </div>
                          <div className="modal__infoContentItem">
                            <div className="modal__infoLabel modal__infoLabel--1">Ghi chú:</div>
                            <div className="modal__infoValue">{data[0].note ? data[0].note : 'Trống'}</div>
                          </div>
                        </div>
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
