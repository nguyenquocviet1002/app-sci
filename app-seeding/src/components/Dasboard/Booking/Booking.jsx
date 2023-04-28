import React from 'react';
import bookingStyles from './Booking.module.scss';

const Booking = () => {
  return (
    <div class={bookingStyles['contentBooking']}>
      <div class={bookingStyles['contentBooking__btn']}>
        <button class={`${bookingStyles['contentBooking__btn--search']} modal-btn btn`} data-modal="modal-opacity">
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
  );
};

export default Booking;
