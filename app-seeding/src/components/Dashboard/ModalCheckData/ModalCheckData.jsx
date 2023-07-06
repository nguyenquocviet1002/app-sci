import { formatMoney } from '@/utils/formatMoney';
import ReactDOM from 'react-dom';

export default function ModalCheckData({ isShowing, hide, element, data }) {
  let total = 0;
  if (data.type === 'doanh_so') {
    data.data.map((item) => (total += Number(item.tien)));
  }

  return isShowing && element === 'ModalCheckData'
    ? ReactDOM.createPortal(
        <>
          <div className="modal">
            <div className="modal__box modal__box--search">
              <div className="modal__content">
                <button type="button" className="modal__close" onClick={hide}>
                  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                  </svg>
                </button>
                <h4 className="modal__head">{data.type === 'doanh_so' ? 'Doanh số' : 'Dịch vụ'}</h4>
                <div className="modal__line"></div>
                <div className="modal__around">
                  <div className="modal__body">
                    {data.type === 'doanh_so'
                      ? data.data.map((item, index) => (
                          <div className="modal__targetGroup" key={index}>
                            <div className="modal__targetControl">{String(item.dich_vu)}</div>
                            <div className="modal__targetControl">
                              {new Date(item.ngay_thanh_toan).toLocaleDateString('en-GB')}
                            </div>
                            <div className="modal__targetControl">{formatMoney(item.tien)}</div>
                          </div>
                        ))
                      : data.data.map((item, index) => (
                          <div className="modal__targetGroup" key={index}>
                            {item}
                          </div>
                        ))}
                    {data.type === 'doanh_so' ? <div>Tổng: {formatMoney(total)}</div> : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal__bg"></div>
        </>,
        document.body,
      )
    : null;
}
