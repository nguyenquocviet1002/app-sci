import DataTable from 'react-data-table-component';
import { useState, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useModal } from '@/hooks/useModal';
import { removeFirstVsLastItem } from '@/utils/removeFirstVsLastItem';
import { customStyles } from '@/utils/styleCustomTable';
import { useGetBooking } from '@/services/bookingService';
import { useGetUser } from '@/services/userService';

import ModalSearchBooking from '../ModalSearchBooking';
import ModalMoreBooking from '../ModalMoreBooking';

import Loading from '@/components/UI/Loading';
import Button from '@/components/UI/Button';

import bookingStyles from './Booking.module.scss';

export default function Booking() {
  const [dataLeadItem, setDataLeadItem] = useState([]);
  const [filterSearch, setFilterSearch] = useState(false);
  const [infoFilter, setInfoFilter] = useState([]);
  const [type, setType] = useState({ label: 'Booking', value: 'opportunity' });
  const [isShow, setIsShow] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null);
  const { isShowing, cpn, toggle } = useModal();

  const info = useMemo(() => {
    return {
      token: token,
      type: type.value,
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
  }, [token, type]);

  const { dataBooking, isLoadingBooking, isFetchingBooking, isSuccessBooking, refetchBooking } = useGetBooking(info);
  const { dataUser, isSuccessUser } = useGetUser(token);

  const showFilter = (info) => {
    setFilterSearch(true);
    setInfoFilter(info);
  };

  const removeFilter = () => {
    refetchBooking();
    setFilterSearch(false);
    setInfoFilter([]);
  };

  const showMore = async (id) => {
    const dataOnly = dataBooking.data.data.filter((item) => item.id === id);
    setDataLeadItem(dataOnly);
  };

  const showDropdown = () => {
    setIsShow(!isShow);
  };

  const setValue = (e) => {
    setType({ label: e.target.textContent, value: e.target.id });
    showDropdown();
    setTimeout(() => refetchBooking(), 0);
  };

  const columns = [
    {
      name: 'NV Sale',
      selector: (row) => row.sale_create,
      sortable: true,
    },
    {
      name: 'Họ và tên',
      selector: (row) => row.contact_name,
      sortable: true,
    },
    {
      name: 'Điện thoại',
      selector: (row) => row.phone_1,
    },
    {
      name: 'Ngày hẹn lịch',
      selector: (row) => new Date(row.booking_date).toLocaleDateString('en-GB'),
    },
    {
      name: 'Hiệu lực đến',
      selector: (row) => new Date(row.day_expire).toLocaleDateString('en-GB'),
    },
    {
      name: 'Trạng thái hiệu lực',
      selector: (row) => (row.effect === '' ? 'Trống' : row.effect),
      grow: 0.6,
    },
    {
      name: 'Trạng thái',
      selector: (row) => (row.stage_id === '' ? 'Trống' : row.stage_id),
    },
    {
      name: 'Nhân viên',
      selector: (row) => row.name_user_seeding,
      sortable: true,
      omit: isSuccessUser && dataUser.data.data.rule === 'user' ? true : false,
    },
    {
      name: 'Xem thêm',
      cell: (row) => (
        <button
          className={bookingStyles['booking__read']}
          onClick={() => {
            showMore(row.id);
            toggle('ModalMoreBooking');
          }}
        >
          Xem thêm
        </button>
      ),
      right: true,
    },
  ];

  return (
    <div className={bookingStyles['booking__main']}>
      <div className={bookingStyles['booking__head']}>
        <div className={bookingStyles['booking__cta']}>
          <div className={bookingStyles['booking__title']}>Danh Sách {type.label}</div>
          <div className={bookingStyles['booking__ctaLeft']}>
            {filterSearch ? (
              <div className={bookingStyles['booking__removeFilter']}>
                <Button event={() => removeFilter()} color="red">
                  Xóa bộ lọc
                </Button>
              </div>
            ) : null}
            <div className={bookingStyles['booking__ctaSearch']}>
              <Button event={() => toggle('ModalSearchBooking')} icon="magnifying-glass-solid.svg">
                Tìm kiếm
              </Button>
            </div>
            <div className={bookingStyles['booking__select']}>
              <button className={bookingStyles['booking__selectBtn']} onClick={showDropdown}>
                {type.label}
              </button>
              {isShow ? (
                <div className={bookingStyles['booking__selectDropdown']}>
                  <div className={bookingStyles['booking__selectItem']} id="opportunity" onClick={(e) => setValue(e)}>
                    Booking
                  </div>
                  <div className={bookingStyles['booking__selectItem']} id="lead" onClick={(e) => setValue(e)}>
                    Lead
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {filterSearch ? (
          <div className={bookingStyles['booking__filter']}>
            <p>Kết quả tìm kiếm cho: </p>
            <div>
              {infoFilter.name !== '' ? (
                <div className={bookingStyles['booking__filterItem']}>Họ tên: {infoFilter.name}</div>
              ) : null}
              {infoFilter.phone !== '' ? (
                <div className={bookingStyles['booking__filterItem']}>Số điện thoại: {infoFilter.phone}</div>
              ) : null}
              {infoFilter.code !== '' ? (
                <div className={bookingStyles['booking__filterItem']}>Mã booking: {infoFilter.code}</div>
              ) : null}
              {infoFilter.user_seeding !== '' ? (
                <div className={bookingStyles['booking__filterItem']}>Nhân viên: {infoFilter.user_seeding}</div>
              ) : null}
              {infoFilter.start_date !== '' ? (
                <div className={bookingStyles['booking__filterItem']}>Ngày bắt đầu: {infoFilter.start_date}</div>
              ) : null}
              {infoFilter.end_date !== '' ? (
                <div className={bookingStyles['booking__filterItem']}>Ngày kết thúc: {infoFilter.end_date}</div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
      {isSuccessBooking && (
        <div className={bookingStyles['booking__table']}>
          <DataTable
            columns={columns}
            data={removeFirstVsLastItem(dataBooking)}
            pagination
            customStyles={customStyles}
            highlightOnHover
          />
        </div>
      )}
      {isSuccessUser && (
        <ModalSearchBooking
          isShowing={isShowing}
          hide={toggle}
          element={cpn}
          token={token}
          show={showFilter}
          type={type.value}
          rule={dataUser.data.data.rule}
        />
      )}
      <ModalMoreBooking isShowing={isShowing} hide={toggle} element={cpn} data={dataLeadItem} />
      {(isLoadingBooking || isFetchingBooking) && <Loading />}
    </div>
  );
}
