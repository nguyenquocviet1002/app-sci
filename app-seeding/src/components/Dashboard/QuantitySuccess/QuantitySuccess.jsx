import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useGetBrand } from '@/services/reportService';
import { useGetAllUser, useGetUser } from '@/services/userService';
import { removeFirstItem } from '@/utils/removeFirstItem';
import { getCustomerSuccess, getSuccessBrandYear, getSuccessByBrand } from '@/utils/reportNumber';

import quantityFBStyles from '../QuantityFB/QuantityFB.module.scss';
import quantitySuccessStyles from './QuantitySuccess.module.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    y: {
      suggestedMax: 10,
    },
  },
};

export default function QuantitySuccess() {
  const [dataSuccessBrand, setDataSuccessBrand] = useState([]);
  const [dataSuccessService, setDataSuccessService] = useState([]);
  const [user, setUser] = useState({ label: 'Nhân viên', value: '' });
  const [isShow, setIsShow] = useState(false);
  const [isShow2, setIsShow2] = useState(false);
  const [inputDate, setInputDate] = useState({
    startDate: '',
    endDate: '',
  });
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState({ label: 'Thương hiệu', value: '' });

  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null);
  const { dataAllUser, isSuccessAllUser } = useGetAllUser({ token: token, code_user: '' });
  const { dataUser, isSuccessUser } = useGetUser(token);
  const { dataBrands, isSuccessBrand } = useGetBrand(token);

  useEffect(() => {
    if (isSuccessUser && dataUser.data.data.rule === 'user') {
      setUser({ label: dataUser.data.data.username, value: dataUser.data.data.code_seeding });
    }
  }, [isSuccessUser, dataUser]);

  const matchSuccessMonth = useMatch('/dashboard/quantity-success/month');
  const matchSuccessYear = useMatch('/dashboard/quantity-success/year');
  const matchSuccessAbout = useMatch('/dashboard/quantity-success/about');

  useEffect(() => {
    if (matchSuccessMonth) {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      getSuccessByBrand(firstDay, lastDay, token, user.value)
        .then((data) => setDataSuccessBrand(data))
        .catch((err) => console.log(err));
      getCustomerSuccess(searchValue, filter.value, firstDay, lastDay, token, user.value)
        .then((data) => setDataSuccessService(data.so_luong))
        .catch((err) => console.log(err));
    } else if (matchSuccessYear) {
      const date = new Date();
      const year = date.getFullYear();
      const firstDay = new Date(year, 0, 1);
      const lastDay = new Date(year, 11, 31);
      getSuccessBrandYear(firstDay, lastDay, token, user.value)
        .then((data) => setDataSuccessBrand(data))
        .catch((err) => console.log(err));
      getCustomerSuccess(searchValue, filter.value, firstDay, lastDay, token, user.value)
        .then((data) => setDataSuccessService(data.so_luong))
        .catch((err) => console.log(err));
    } else if (matchSuccessAbout) {
      getSuccessByBrand(inputDate.startDate, inputDate.endDate, token, user.value)
        .then((data) => setDataSuccessBrand(data))
        .catch((err) => console.log(err));
      getCustomerSuccess(searchValue, filter.value, inputDate.startDate, inputDate.endDate, token, user.value)
        .then((data) => setDataSuccessService(data.so_luong))
        .catch((err) => console.log(err));
    } else {
      const curr = new Date();
      const first = curr.getDate() - curr.getDay() + 1;
      const last = first + 6;
      const firstDay = new Date(curr.setDate(first));
      const lastDay = new Date(curr.setDate(last));
      getSuccessByBrand(firstDay, lastDay, token, user.value)
        .then((data) => setDataSuccessBrand(data))
        .catch((err) => console.log(err));
      getCustomerSuccess(searchValue, filter.value, firstDay, lastDay, token, user.value)
        .then((data) => setDataSuccessService(data.so_luong))
        .catch((err) => console.log(err));
    }
  }, [matchSuccessMonth, matchSuccessAbout, matchSuccessYear, token, user, searchValue, filter, inputDate]);

  const showDropdown = (id) => {
    if (id === 1) {
      setIsShow(!isShow);
    } else {
      setIsShow2(!isShow2);
    }
  };

  const setValue = (e, id) => {
    if (id === 1) {
      setUser({ label: e.target.textContent, value: e.target.id });
      showDropdown(id);
    } else {
      setFilter({ label: e.target.textContent, value: e.target.id });
      showDropdown(id);
    }
  };

  const handelRange = () => {
    getSuccessByBrand(inputDate.startDate, inputDate.endDate, token, user.value)
      .then((data) => setDataSuccessBrand(data))
      .catch((err) => console.log(err));
    getCustomerSuccess(searchValue, filter.value, inputDate.startDate, inputDate.endDate, token, user.value)
      .then((data) => setDataSuccessService(data.so_luong))
      .catch((err) => console.log(err));
  };

  const data = {
    labels: dataSuccessBrand.labels,
    datasets: [
      {
        label: 'Tất cả',
        data: dataSuccessBrand.all,
        backgroundColor: '#ff6384',
        borderColor: '#ff6384',
      },
      {
        label: 'Kangnam',
        data: dataSuccessBrand.kn,
        backgroundColor: '#ff9f40',
        borderColor: '#ff9f40',
        hidden: true,
      },
      {
        label: 'Đông Á',
        data: dataSuccessBrand.da,
        backgroundColor: '#4bc0c0',
        borderColor: '#4bc0c0',
        hidden: true,
      },
      {
        label: 'Hồng Hà',
        data: dataSuccessBrand.hh,
        backgroundColor: '#9966ff',
        borderColor: '#9966ff',
        hidden: true,
      },
      {
        label: 'Paris',
        data: dataSuccessBrand.pr,
        backgroundColor: '#36a2eb',
        borderColor: '#36a2eb',
        hidden: true,
      },
    ],
  };

  return (
    <>
      <div className={quantityFBStyles['quantityFB__head']}>
        <div className={quantityFBStyles['quantityFB__filter']}>
          <div className={quantityFBStyles['quantityFB__title']}>Số Lượng Khách Hàng Thành Công</div>
          <div className={quantityFBStyles['quantityFB__cta']}>
            <div className={quantityFBStyles['quantityFB__nav']}>
              <NavLink
                to="week"
                className={({ isActive }) =>
                  isActive
                    ? `${quantityFBStyles['quantityFB__navItem']} ${quantityFBStyles['active']}`
                    : quantityFBStyles['quantityFB__navItem']
                }
              >
                Tuần
              </NavLink>
              <NavLink
                to="month"
                className={({ isActive }) =>
                  isActive
                    ? `${quantityFBStyles['quantityFB__navItem']} ${quantityFBStyles['active']}`
                    : quantityFBStyles['quantityFB__navItem']
                }
              >
                Tháng
              </NavLink>
              <NavLink
                to="year"
                className={({ isActive }) =>
                  isActive
                    ? `${quantityFBStyles['quantityFB__navItem']} ${quantityFBStyles['active']}`
                    : quantityFBStyles['quantityFB__navItem']
                }
              >
                Năm
              </NavLink>
              <NavLink
                to="about"
                className={({ isActive }) =>
                  isActive
                    ? `${quantityFBStyles['quantityFB__navItem']} ${quantityFBStyles['active']}`
                    : quantityFBStyles['quantityFB__navItem']
                }
              >
                Khoảng ngày
              </NavLink>
            </div>
            {isSuccessUser && dataUser.data.data.rule === 'admin' && (
              <div className={quantityFBStyles['quantityFB__select']}>
                <button className={quantityFBStyles['quantityFB__selectBtn']} onClick={() => showDropdown(1)}>
                  {user.label}
                </button>
                {isShow ? (
                  <div className={quantityFBStyles['quantityFB__selectDropdown']}>
                    <div className={quantityFBStyles['quantityFB__selectItem']} id="" onClick={(e) => setValue(e, 1)}>
                      Tất cả
                    </div>
                    {isSuccessAllUser &&
                      removeFirstItem(dataAllUser).map((item, index) => (
                        <div
                          key={index}
                          id={item.code_user}
                          className={quantityFBStyles['quantityFB__selectItem']}
                          onClick={(e) => setValue(e, 1)}
                        >
                          {item.name}
                        </div>
                      ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
        {matchSuccessAbout && (
          <div className={quantityFBStyles['quantityFB__date']}>
            <div className={quantityFBStyles['quantityFB__dateGroup']}>
              <label className={quantityFBStyles['quantityFB__dateLabel']}>Ngày bắt đầu</label>
              <input
                type="date"
                className={quantityFBStyles['quantityFB__dateInput']}
                onChange={(e) => setInputDate({ ...inputDate, startDate: e.target.value })}
              />
            </div>
            <div className={quantityFBStyles['quantityFB__dateGroup']}>
              <label className={quantityFBStyles['quantityFB__dateLabel']}>Ngày kết thúc</label>
              <input
                type="date"
                className={quantityFBStyles['quantityFB__dateInput']}
                onChange={(e) => setInputDate({ ...inputDate, endDate: e.target.value })}
              />
            </div>
            <button className={quantityFBStyles['quantityFB__dateSubmit']} onClick={() => handelRange()}>
              Tìm
            </button>
          </div>
        )}
      </div>

      <div className={quantityFBStyles['quantityFB__body']}>
        <div className={quantityFBStyles['quantityFB__chart']}>
          <div className={`${quantityFBStyles['quantityFB__item']} ${quantityFBStyles['quantityFB__item--1']}`}>
            <Line options={options} data={data} />
          </div>
        </div>
        <div className={quantityFBStyles['quantityFB__table']}>
          <div className={quantityFBStyles['quantityFB__item']}>
            <div className={quantitySuccessStyles['quantitySS__filter']}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className={quantitySuccessStyles['quantitySS__filterSearch']}
                  placeholder="Tìm theo tên dịch vụ..."
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                />
                {searchValue && (
                  <span className={quantitySuccessStyles['quantitySS__reset']} onClick={() => setSearchValue('')}>
                    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                    </svg>
                  </span>
                )}
              </div>

              <div
                className={`${quantityFBStyles['quantityFB__select']} ${quantitySuccessStyles['quantitySS__select']}`}
              >
                <button
                  className={`${quantityFBStyles['quantityFB__selectBtn']} ${quantitySuccessStyles['quantitySS__selectBtn']}`}
                  onClick={() => showDropdown(2)}
                >
                  {filter.label}
                </button>
                {isShow2 ? (
                  <div className={quantityFBStyles['quantityFB__selectDropdown']}>
                    <div className={quantityFBStyles['quantityFB__selectItem']} id="" onClick={(e) => setValue(e, 2)}>
                      Tất cả
                    </div>
                    {isSuccessBrand &&
                      dataBrands.data.data.map((item, index) => (
                        <div
                          key={index}
                          id={item.code}
                          className={quantityFBStyles['quantityFB__selectItem']}
                          onClick={(e) => setValue(e, 2)}
                        >
                          {item.name}
                        </div>
                      ))}
                  </div>
                ) : null}
              </div>
            </div>
            <div style={{ height: '450px', overflow: 'overlay' }}>
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Dịch vụ</th>
                    <th>Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSuccessService.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.group_service}</td>
                      <td>{item.so_luong}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
