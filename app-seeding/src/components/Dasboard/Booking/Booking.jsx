import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import bookingStyles from './Booking.module.scss';
import ModalSearchBooking from '../ModalSearchBooking/ModalSearchBooking';
import useModal from '@/hooks/useModal';
import { getBooking } from '@/apis/Booking';

const token = localStorage.getItem('token')

const info = {
  token: token,
  type: 'opportunity',
  check: 'seeding',
  limit: '',
  offset: '',
  start_date: '',
  end_date: '',
  name: '',
  phone: '',
  code: '',
  user_seeding: '',
};

const Booking = () => {
  const { isShowing, cpn, toggle } = useModal();
  const [dataBooking, setDataBooking] = useState([]);

  useEffect(() => {
    getBooking(info)
      .then(({ data }) => {
        data.data.shift();
        data.data.pop();
        setDataBooking(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      name: 'Họ và tên',
      selector: (row) => row.name,
    },
    {
      name: 'Điện thoại',
      selector: (row) => row.phone,
    },
    {
      name: 'Dịch vụ đăng ký',
      selector: (row) => row.service,
    },
    {
      name: 'Chi nhánh',
      selector: (row) => row.company_name,
    },
    {
      name: 'Nhân viên',
      selector: (row) => row.seeding_user_name,
    },
    {
      name: 'Ngày tạo',
      selector: (row) => row.create_date,
    },
    {
      name: 'Xem thêm',
      cell: (row) => (
        <button
          // className={leadStyles['showmore']}
          onClick={() => {
            // showMore(row.id);
            toggle('ModalMore');
          }}
        >
          Xem thêm
        </button>
      ),
    },
  ];

  const customStyles = {
    subHeader: {
      style: {
        display: 'block',
        padding: '20px 20px 10px',
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
        fontSize: '16px',
        fontWeight: '600',
        backgroundColor: '#f9fafb',
      },
    },
    rows: {
      style: {
        minHeight: '60px',
        fontSize: '15px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    },
  };

  return (
    <>
      <div className={bookingStyles['contentBooking']}>
        <div className={bookingStyles['contentBooking__btn']}>
          <button
            className={`${bookingStyles['contentBooking__btn--search']} modal-btn btn`}
            onClick={() => toggle('ModalSearchBooking')}
          >
            Tìm kiếm
            <span
              className={bookingStyles['contentBooking__iconSearch']}
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/icon-search.png)` }}
            ></span>
          </button>
        </div>
        <div className="contentBooking__table">
          <div className="table-responsive"></div>
        </div>
      </div>
      <DataTable columns={columns} data={dataBooking} pagination customStyles={customStyles} highlightOnHover />
      <ModalSearchBooking isShowing={isShowing} hide={toggle} element={cpn} />
    </>
  );
};

export default Booking;
