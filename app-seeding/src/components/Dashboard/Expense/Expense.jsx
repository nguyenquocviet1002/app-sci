import { useEffect, useMemo, useState } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getCustomerSuccess, getNumberBrand, getRevenue } from '@/utils/reportNumber';
import { useGetForm } from '@/services/formService';
import { useGetBooking } from '@/services/bookingService';
import { useGetAllUser, useGetUser } from '@/services/userService';
import { removeFirstItem } from '@/utils/removeFirstItem';

import Loading from '@/components/UI/Loading';

import expenseStyles from './Expense.module.scss';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { formatMoney } from '@/utils/formatMoney';
import { useGetBrand } from '@/services/reportService';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

export default function Expense() {
  const [user, setUser] = useState('');
  const [inputDate, setInputDate] = useState({
    startDate: '',
    endDate: '',
  });
  const [changeSearch, setChangeSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [dataPrice, setDataPrice] = useState([]);
  const [dataPriceBrand, setDataPriceBrand] = useState([]);
  const [dataPriceBrandLable, setDataPriceBrandLable] = useState([]);
  const [codeUser, setCodeUser] = useState('');

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
  const { dataUser, isSuccessUser } = useGetUser(token);
  const { dataAllUser, isSuccessAllUser } = useGetAllUser({ token: token, code_user: '' });

  useEffect(() => {
    if (isSuccessUser) {
      dataUser.data.data.code_seeding === false
        ? setCodeUser('US0000015')
        : setCodeUser(dataUser.data.data.code_seeding);
    }
  }, [dataUser, isSuccessUser, token, codeUser]);

  const matchFbMonth = useMatch('/dashboard/quantity/fb-month');
  const matchFbYear = useMatch('/dashboard/quantity/fb-year');
  const matchFbAbout = useMatch('/dashboard/quantity/fb-about');

  useEffect(() => {
    if (matchFbMonth) {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      if (isSuccessBooking && isSuccessForm) {
        getNumberBrand(firstDay, lastDay, token, user)
          .then((data) => {})
          .catch((err) => {
            console.log(err);
          });
      }
    } else if (matchFbYear) {
      const date = new Date();
      const year = date.getFullYear();
      const firstDay = new Date(year, 0, 1);
      const lastDay = new Date(year, 11, 31);

      if (isSuccessBooking && isSuccessForm) {
        getNumberBrand(firstDay, lastDay, token, user)
          .then((data) => {})
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      const curr = new Date(); // get current date
      const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
      const last = first + 6; // last day is the first day + 6
      const firstDay = new Date(curr.setDate(first));
      const lastDay = new Date(curr.setDate(last));
      getCustomerSuccess(changeSearch, filter, firstDay, lastDay, token, user)
        .then((data) => {
          setDataPrice(data);
        })
        .catch((err) => {
          console.log(err);
        });
      getRevenue(firstDay, lastDay, user, token)
        .then((data) => {
          setDataPriceBrand(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [
    dataBooking,
    dataForm,
    isSuccessBooking,
    isSuccessForm,
    matchFbMonth,
    matchFbAbout,
    matchFbYear,
    token,
    user,
    changeSearch,
    filter,
  ]);

  useEffect(() => {
    if (dataPriceBrand.length !== 0) {
      const dataBrand = {
        labels: dataPriceBrand.data.date,
        datasets: [
          {
            label: 'All',
            data: dataPriceBrand.data.all,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'KN',
            data: dataPriceBrand.data.kn,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'DA',
            data: dataPriceBrand.data.da,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'HH',
            data: dataPriceBrand.data.hh,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'PR',
            data: dataPriceBrand.data.pr,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
      setDataPriceBrandLable(dataBrand);
    }
  }, [dataPriceBrand]);

  return (
    <>
      {isFetchingForm && isFetchingBooking && isFetchingBrand && <Loading />}
      <div className={expenseStyles['quantity__screen']}>
        <div className={expenseStyles['menuLead']}>
          <NavLink
            to="fb-week"
            className={({ isActive }) =>
              isActive
                ? `${expenseStyles['menuLead__tabs']} ${expenseStyles['active']}`
                : expenseStyles['menuLead__tabs']
            }
          >
            Tuần
          </NavLink>
          <NavLink
            to="fb-month"
            className={({ isActive }) =>
              isActive
                ? `${expenseStyles['menuLead__tabs']} ${expenseStyles['active']}`
                : expenseStyles['menuLead__tabs']
            }
          >
            Tháng
          </NavLink>
          <NavLink
            to="fb-year"
            className={({ isActive }) =>
              isActive
                ? `${expenseStyles['menuLead__tabs']} ${expenseStyles['active']}`
                : expenseStyles['menuLead__tabs']
            }
          >
            Năm
          </NavLink>
          <NavLink
            to="fb-about"
            className={({ isActive }) =>
              isActive
                ? `${expenseStyles['menuLead__tabs']} ${expenseStyles['active']}`
                : expenseStyles['menuLead__tabs']
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
            <button>Submit</button>
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
        <table>
          <thead>
            <tr>
              <td>STT</td>
              <td>Dịch vụ</td>
              <td>Doanh thu</td>
            </tr>
          </thead>
          <tbody>
            {dataPrice.length !== 0 &&
              dataPrice.tong_tien.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.group_service}</td>
                  <td>{formatMoney(item.tong_tien)}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {dataPriceBrandLable.length !== 0 && <Bar options={options} data={dataPriceBrandLable} />}
      </div>
    </>
  );
}
