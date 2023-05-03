import React from 'react';
import bookingStyles from './Booking.module.scss';
import ModalSearchBooking from '../ModalSearchBooking/ModalSearchBooking';
import useModal from '@/hooks/useModal';

const Booking = () => {
  const { isShowing, cpn, toggle } = useModal();
  return (
    <>
      <div class={bookingStyles['contentBooking']}>
        <div class={bookingStyles['contentBooking__btn']}>
          <button
            class={`${bookingStyles['contentBooking__btn--search']} modal-btn btn`}
            onClick={() => toggle('ModalSearchBooking')}
          >
            Tìm kiếm
            <span
              className={bookingStyles['contentBooking__iconSearch']}
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/icon-search.png)` }}
            ></span>
          </button>
        </div>
        <div class="contentBooking__table">
          <div class="table-responsive"></div>
        </div>
      </div>
      <ModalSearchBooking isShowing={isShowing} hide={toggle} element={cpn} />
    </>
  );
};

export default Booking;
