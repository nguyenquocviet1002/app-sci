import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export default function ModalMoreForm({ isShowing, hide, element, data, rule }) {
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

  return isShowing && element === 'ModalMoreForm'
    ? ReactDOM.createPortal(
        <>
          <div>
            <div className="modal">
              <div className="modal__box modal__box--search" ref={ref}>
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
                      <div className="modal__formControl">
                        <div className="modal__formGroup">
                          <label htmlFor="code" className="modal__label">
                            Mã
                          </label>
                          <input
                            type="text"
                            id="code"
                            className="modal__input"
                            defaultValue={data[0].code_form}
                            disabled
                          />
                        </div>
                        <div className="modal__formGroup">
                          <label htmlFor="name" className="modal__label">
                            Họ tên
                          </label>
                          <input type="text" id="name" className="modal__input" defaultValue={data[0].name} disabled />
                        </div>
                      </div>
                      <div className="modal__formControl" style={{ marginTop: '15px' }}>
                        <div className="modal__formGroup">
                          <label htmlFor="phone" className="modal__label">
                            Số điện thoại
                          </label>
                          <input
                            type="text"
                            id="phone"
                            className="modal__input"
                            defaultValue={data[0].phone}
                            disabled
                          />
                        </div>
                        <div className="modal__formGroup">
                          <label className="modal__label">Facebook</label>
                          <a className="modal__link" href={data[0].link_fb} target="_blank" rel="noreferrer">
                            {data[0].name_fb}
                          </a>
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
                            disabled
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
                            defaultValue={data[0].company_name}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="modal__formControl" style={{ marginTop: '15px' }}>
                        <div className="modal__formGroup">
                          <label htmlFor="script" className="modal__label">
                            Kịch bản
                          </label>
                          <input type="text" id="script" className="modal__input" defaultValue={data[0].script} />
                        </div>
                        <div className="modal__formGroup">
                          <label htmlFor="interactive-proof" className="modal__label">
                            Tương tác
                          </label>
                          <a className="modal__link" href={data[0].interactive_proof} target="_blank" rel="noreferrer">
                            {data[0].interactive_proof ? data[0].interactive_proof : 'Empty'}
                          </a>
                        </div>
                      </div>
                      <div className="modal__formControl" style={{ marginTop: '15px' }}>
                        <div className="modal__formGroup">
                          <label htmlFor="time" className="modal__label">
                            Thời gian
                          </label>
                          <input
                            type="text"
                            id="time"
                            className="modal__input"
                            defaultValue={new Date(data[0].create_date).toLocaleString('en-GB')}
                            disabled
                          />
                        </div>
                        {rule === 'admin' && (
                          <div className="modal__formGroup">
                            <label htmlFor="time" className="modal__label">
                              Ticket Caresoft
                            </label>
                            <a className="modal__link" href={data[0].link_url} target="_blank" rel="noreferrer">
                              {data[0].link_url ? data[0].link_url : 'Trống'}
                            </a>
                          </div>
                        )}
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
                            disabled
                            defaultValue={data[0].note}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal__bg" onClick={hide}></div>
          </div>
        </>,
        document.body,
      )
    : null;
}
