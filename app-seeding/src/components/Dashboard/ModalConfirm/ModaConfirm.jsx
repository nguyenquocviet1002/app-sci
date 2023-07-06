import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import modalConfirmStyles from './ModalConfirm.module.scss';

export default function ModalConfirm({ isShowing, hide, element, onSubmit, children }) {
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

  return isShowing && element === 'ModalConfirm'
    ? ReactDOM.createPortal(
        <>
          <div tabIndex="-1" className={modalConfirmStyles['modalConfirm']} aria-modal="true" role="dialog">
            <div className={modalConfirmStyles['modalConfirm__box']} ref={ref}>
              <div className={modalConfirmStyles['modalConfirm__divBox']}>
                <button type="button" className={modalConfirmStyles['modalConfirm__close']} onClick={hide}>
                  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div className={modalConfirmStyles['modalConfirm__body']}>
                  <svg
                    aria-hidden="true"
                    className={modalConfirmStyles['modalConfirm__icon']}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 className={modalConfirmStyles['modalConfirm__text']}>{children}</h3>
                  <button
                    type="button"
                    className={modalConfirmStyles['modalConfirm__yes']}
                    onClick={() => {
                      onSubmit();
                      hide();
                    }}
                  >
                    Có
                  </button>
                  <button type="button" className={modalConfirmStyles['modalConfirm__cancel']} onClick={hide}>
                    Không
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={modalConfirmStyles['modalConfirm__backdrop']}></div>
        </>,
        document.body,
      )
    : null;
}
