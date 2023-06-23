import { useEffect, useMemo, useState } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import {
  getCustomerSuccess,
  getNumberBrand,
  getNumberByDate,
  getNumberByYear,
  getSuccessBrandYear,
  getSuccessByBrand,
} from '@/utils/reportNumber';
import { useGetForm } from '@/services/formService';
import { useGetBooking } from '@/services/bookingService';
import { useGetAllUser } from '@/services/userService';
import { removeFirstItem } from '@/utils/removeFirstItem';

import LFWeek from '../LFWeek';
import SuccessWeek from '../SuccessWeek';
import Loading from '@/components/UI/Loading';

import quantityStyles from './Quantity.module.scss';
import { useGetBrand } from '@/services/reportService';

export default function Quantity() {
  const [user, setUser] = useState('');
  const [userSuccess, setUserSuccess] = useState('');
  const [dataWeek, setDataWeek] = useState([]);
  const [successWeek, setSuccessWeek] = useState([]);
  const [successChartWeek, setSuccessChartWeek] = useState([]);
  const [dataBrand, setDataBrand] = useState([]);
  const [inputDate, setInputDate] = useState({
    startDate: '',
    endDate: '',
  });
  const [changeSearch, setChangeSearch] = useState('');
  const [filter, setFilter] = useState('');

  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null);
  const initialForm = useMemo(() => {
    return {
      token: token,
      brand_id: '',
      type: 'seeding',
      limit: 0,
      offset: 0,
      company_id: '',
      name_fb: '',
      phone: '',
      service: '',
      name: '',
      start_date: '',
      end_date: '',
      user_seeding: user,
    };
  }, [token, user]);

  const initialBooking = useMemo(() => {
    return {
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
      user_seeding: user,
    };
  }, [token, user]);

  const { dataForm, isSuccessForm, isFetchingForm, refetchForm } = useGetForm(initialForm);
  const { dataBooking, isSuccessBooking, isFetchingBooking, refetchBooking } = useGetBooking(initialBooking);
  const { dataBrands, isSuccessBrand, isFetchingBrand } = useGetBrand(token);

  const { dataAllUser, isSuccessAllUser } = useGetAllUser({
    token: token,
    code_user: '',
  });

  const matchFbMonth = useMatch('/dashboard/quantity/fb-month');
  const matchFbYear = useMatch('/dashboard/quantity/fb-year');
  const matchFbAbout = useMatch('/dashboard/quantity/fb-about');

  const matchSuccessMonth = useMatch('/dashboard/quantity/success-month');
  const matchSuccessYear = useMatch('/dashboard/quantity/success-year');
  const matchSuccessAbout = useMatch('/dashboard/quantity/success-about');

  useEffect(() => {
    if (matchFbMonth) {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      if (isSuccessBooking && isSuccessForm) {
        const dataNew = getNumberByDate(firstDay, lastDay, dataForm, dataBooking);
        setDataWeek(dataNew);
        getNumberBrand(firstDay, lastDay, token, user)
          .then((data) => {
            setDataBrand(data);
          })
          .catch((err) => {
            console.log(err);
            setDataBrand([]);
          });
      }
    } else if (matchFbYear) {
      const date = new Date();
      const year = date.getFullYear();
      const firstDay = new Date(year, 0, 1);
      const lastDay = new Date(year, 11, 31);

      if (isSuccessBooking && isSuccessForm) {
        const dataNew = getNumberByYear(firstDay, lastDay, dataForm, dataBooking);
        setDataWeek(dataNew);
        getNumberBrand(firstDay, lastDay, token, user)
          .then((data) => {
            setDataBrand(data);
          })
          .catch((err) => {
            console.log(err);
            setDataBrand([]);
          });
      }
    } else {
      const curr = new Date(); // get current date
      const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
      const last = first + 6; // last day is the first day + 6
      const firstDay = new Date(curr.setDate(first));
      const lastDay = new Date(curr.setDate(last));
      if (isSuccessBooking && isSuccessForm) {
        const dataNew = getNumberByDate(firstDay, lastDay, dataForm, dataBooking);
        setDataWeek(dataNew);
        getNumberBrand(firstDay, lastDay, token, user)
          .then((data) => {
            setDataBrand(data);
          })
          .catch((err) => {
            console.log(err);
            setDataBrand([]);
          });
      }
    }
  }, [dataBooking, dataForm, isSuccessBooking, isSuccessForm, matchFbMonth, matchFbAbout, matchFbYear, token, user]);

  useEffect(() => {
    if (matchSuccessMonth) {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      getCustomerSuccess(changeSearch, filter, firstDay, lastDay, token, userSuccess)
        .then((data) => setSuccessWeek(data))
        .catch((err) => console.log(err));
      getSuccessByBrand(firstDay, lastDay, token, userSuccess)
        .then((data) => setSuccessChartWeek(data))
        .catch((err) => console.log(err));
    } else if (matchSuccessYear) {
      const date = new Date();
      const year = date.getFullYear();
      const firstDay = new Date(year, 0, 1);
      const lastDay = new Date(year, 11, 31);
      getCustomerSuccess(changeSearch, filter, firstDay, lastDay, token, userSuccess)
        .then((data) => setSuccessWeek(data))
        .catch((err) => console.log(err));
      getSuccessBrandYear(firstDay, lastDay, token, userSuccess)
        .then((data) => setSuccessChartWeek(data))
        .catch((err) => console.log(err));
    } else {
      const curr = new Date(); // get current date
      const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
      const last = first + 6; // last day is the first day + 6
      const firstDay = new Date(curr.setDate(first));
      const lastDay = new Date(curr.setDate(last));
      getCustomerSuccess(changeSearch, filter, firstDay, lastDay, token, userSuccess)
        .then((data) => setSuccessWeek(data))
        .catch((err) => console.log(err));
      getSuccessByBrand(firstDay, lastDay, token, userSuccess)
        .then((data) => setSuccessChartWeek(data))
        .catch((err) => console.log(err));
    }
  }, [
    dataBooking,
    dataForm,
    isSuccessBooking,
    isSuccessForm,
    matchSuccessMonth,
    matchSuccessAbout,
    matchSuccessYear,
    token,
    user,
    changeSearch,
    filter,
    userSuccess,
  ]);

  const handleRange = () => {
    if (isSuccessBooking && isSuccessForm) {
      getCustomerSuccess(changeSearch, filter, inputDate.startDate, inputDate.endDate, token, userSuccess)
        .then((data) => setSuccessWeek(data))
        .catch((err) => console.log(err));
      getSuccessByBrand(inputDate.startDate, inputDate.endDate, token)
        .then((data) => setSuccessChartWeek(data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {isFetchingForm && isFetchingBooking && isFetchingBrand && <Loading />}
      <div className={quantityStyles['quantity__screen']}>
        <div className={quantityStyles['quantity__title']}>SỐ LƯỢNG FORM/BOOKING:</div>
        <div className={quantityStyles['menuLead']}>
          <NavLink
            to="fb-week"
            className={({ isActive }) =>
              isActive
                ? `${quantityStyles['menuLead__tabs']} ${quantityStyles['active']}`
                : quantityStyles['menuLead__tabs']
            }
          >
            Tuần
          </NavLink>
          <NavLink
            to="fb-month"
            className={({ isActive }) =>
              isActive
                ? `${quantityStyles['menuLead__tabs']} ${quantityStyles['active']}`
                : quantityStyles['menuLead__tabs']
            }
          >
            Tháng
          </NavLink>
          <NavLink
            to="fb-year"
            className={({ isActive }) =>
              isActive
                ? `${quantityStyles['menuLead__tabs']} ${quantityStyles['active']}`
                : quantityStyles['menuLead__tabs']
            }
          >
            Năm
          </NavLink>
          <NavLink
            to="fb-about"
            className={({ isActive }) =>
              isActive
                ? `${quantityStyles['menuLead__tabs']} ${quantityStyles['active']}`
                : quantityStyles['menuLead__tabs']
            }
          >
            Khoảng ngày
          </NavLink>
        </div>
        <select
          onChange={(e) => {
            setUser(e.target.value);
            setTimeout(() => {
              refetchForm();
              refetchBooking();
            }, 0);
          }}
        >
          <option value="">Nhân viên</option>
          {isSuccessAllUser &&
            removeFirstItem(dataAllUser).map((item, index) => (
              <option key={index} value={item.code_user}>
                {item.name}
              </option>
            ))}
        </select>
        {matchFbAbout && (
          <>
            <input type="date" onChange={(e) => setInputDate({ ...inputDate, startDate: e.target.value })} />
            <input type="date" onChange={(e) => setInputDate({ ...inputDate, endDate: e.target.value })} />
            <button onClick={() => handleRange()}>Submit</button>
          </>
        )}
        <LFWeek dataChart={dataWeek} dataTable={dataBrand} />
        <div className={quantityStyles['quantity__title']}>SỐ LƯỢNG KHÁCH HÀNG THÀNH CÔNG:</div>
        <div className={quantityStyles['menuLead']}>
          <NavLink
            to="success-week"
            className={({ isActive }) =>
              isActive
                ? `${quantityStyles['menuLead__tabs']} ${quantityStyles['active']}`
                : quantityStyles['menuLead__tabs']
            }
          >
            Tuần
          </NavLink>
          <NavLink
            to="success-month"
            className={({ isActive }) =>
              isActive
                ? `${quantityStyles['menuLead__tabs']} ${quantityStyles['active']}`
                : quantityStyles['menuLead__tabs']
            }
          >
            Tháng
          </NavLink>
          <NavLink
            to="success-year"
            className={({ isActive }) =>
              isActive
                ? `${quantityStyles['menuLead__tabs']} ${quantityStyles['active']}`
                : quantityStyles['menuLead__tabs']
            }
          >
            Năm
          </NavLink>
          <NavLink
            to="success-about"
            className={({ isActive }) =>
              isActive
                ? `${quantityStyles['menuLead__tabs']} ${quantityStyles['active']}`
                : quantityStyles['menuLead__tabs']
            }
          >
            Khoảng ngày
          </NavLink>
        </div>
        <select
          onChange={(e) => {
            setUserSuccess(e.target.value);
          }}
        >
          <option value="">Nhân viên</option>
          {isSuccessAllUser &&
            removeFirstItem(dataAllUser).map((item, index) => (
              <option key={index} value={item.code_user}>
                {item.name}
              </option>
            ))}
        </select>
        {matchSuccessAbout && (
          <>
            <input type="date" onChange={(e) => setInputDate({ ...inputDate, startDate: e.target.value })} />
            <input type="date" onChange={(e) => setInputDate({ ...inputDate, endDate: e.target.value })} />
            <button onClick={() => handleRange()}>Submit</button>
          </>
        )}
        <input type="text" placeholder="search" onChange={(e) => setChangeSearch(e.target.value)} />
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="">Thương hiệu</option>
          {isSuccessBrand &&
            dataBrands.data.data.map((item, index) => (
              <option key={index} value={item.code}>
                {item.name}
              </option>
            ))}
        </select>
        <SuccessWeek dataChart={successChartWeek} dataTable={successWeek} />
      </div>
    </>
  );
}
