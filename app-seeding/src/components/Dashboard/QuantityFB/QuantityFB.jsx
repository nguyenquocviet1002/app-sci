import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useGetAllUser, useGetUser } from '@/services/userService';
import { removeFirstItem } from '@/utils/removeFirstItem';
import { getNumberBrand, getNumberByDate, getNumberByYear } from '@/utils/reportNumber';

import Loading from '@/components/UI/Loading';
import quantityFBStyles from './QuantityFB.module.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
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

export default function QuantityFB() {
  const [dataQuantity, setDataQuantity] = useState([]);
  const [dataBrand, setDataBrand] = useState([]);
  const [user, setUser] = useState({ label: 'Nhân viên', value: '' });
  const [isShow, setIsShow] = useState(false);
  const [inputDate, setInputDate] = useState({
    startDate: '',
    endDate: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null);
  const { dataAllUser, isSuccessAllUser } = useGetAllUser({
    token: token,
    code_user: '',
  });
  const { dataUser, isSuccessUser } = useGetUser(token);

  useEffect(() => {
    if (isSuccessUser && dataUser.data.data.rule === 'user') {
      setUser({ label: dataUser.data.data.username, value: dataUser.data.data.code_seeding });
    }
  }, [isSuccessUser, dataUser]);

  const matchFbMonth = useMatch('/dashboard/quantity-fb/month');
  const matchFbYear = useMatch('/dashboard/quantity-fb/year');
  const matchFbAbout = useMatch('/dashboard/quantity-fb/about');

  useEffect(() => {
    if (matchFbMonth) {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      getNumberBrand(firstDay, lastDay, token, user.value)
        .then((data) => setDataBrand(data))
        .catch((err) => console.log(err));
      getNumberByDate(firstDay, lastDay, token, user.value)
        .then((data) => setDataQuantity(data))
        .catch((err) => console.log(err));
    } else if (matchFbYear) {
      const date = new Date();
      const year = date.getFullYear();
      const firstDay = new Date(year, 0, 1);
      const lastDay = new Date(year, 11, 31);
      getNumberBrand(firstDay, lastDay, token, user.value)
        .then((data) => setDataBrand(data))
        .catch((err) => console.log(err));
      getNumberByYear(firstDay, lastDay, token, user.value)
        .then((data) => setDataQuantity(data))
        .catch((err) => console.log(err));
    } else if (matchFbAbout) {
      getNumberBrand(inputDate.startDate, inputDate.endDate, token, user.value)
        .then((data) => setDataBrand(data))
        .catch((err) => console.log(err));
      getNumberByDate(inputDate.startDate, inputDate.endDate, token, user.value)
        .then((data) => setDataQuantity(data))
        .catch((err) => console.log(err));
    } else {
      const today = new Date();
      function getFirstDayOfWeek(d) {
        const date = new Date(d);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
      }
      const firstDay = getFirstDayOfWeek(today);
      const lastDay = new Date(firstDay);
      lastDay.setDate(lastDay.getDate() + 6);
      getNumberBrand(firstDay, lastDay, token, user.value)
        .then((data) => setDataBrand(data))
        .catch((err) => console.log(err));
      getNumberByDate(firstDay, lastDay, token, user.value)
        .then((data) =>
          setDataQuantity({ ...data, labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'] }),
        )
        .catch((err) => console.log(err));
    }
  }, [matchFbMonth, matchFbYear, matchFbAbout, inputDate, token, user]);

  const showDropdown = () => {
    setIsShow(!isShow);
  };

  const setValue = (e) => {
    setUser({ label: e.target.textContent, value: e.target.id });
    showDropdown();
  };

  const handelRange = () => {
    getNumberBrand(inputDate.startDate, inputDate.endDate, token, user.value)
      .then((data) => setDataBrand(data))
      .catch((err) => console.log(err));
    getNumberByDate(inputDate.startDate, inputDate.endDate, token, user.value)
      .then((data) => setDataQuantity(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const data = {
    labels: dataQuantity.labels,
    datasets: [
      {
        label: 'Form',
        data: dataQuantity.form,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Booking',
        data: dataQuantity.booking,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className={quantityFBStyles['quantityFB__head']}>
        <div className={quantityFBStyles['quantityFB__filter']}>
          <div className={quantityFBStyles['quantityFB__title']}>Số Lượng Form/Booking</div>
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
                <button className={quantityFBStyles['quantityFB__selectBtn']} onClick={showDropdown}>
                  {user.label}
                </button>
                {isShow ? (
                  <div className={quantityFBStyles['quantityFB__selectDropdown']}>
                    <div className={quantityFBStyles['quantityFB__selectItem']} id="" onClick={(e) => setValue(e)}>
                      Tất cả
                    </div>
                    {isSuccessAllUser &&
                      removeFirstItem(dataAllUser).map((item, index) => (
                        <div
                          key={index}
                          id={item.code_user}
                          className={quantityFBStyles['quantityFB__selectItem']}
                          onClick={(e) => setValue(e)}
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
        {matchFbAbout && (
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
            <Bar options={options} data={data} />
          </div>
        </div>
        <div className={quantityFBStyles['quantityFB__table']}>
          <div className={quantityFBStyles['quantityFB__item']}>
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Thương hiệu</th>
                  <th>Form</th>
                  <th>Booking</th>
                </tr>
              </thead>
              <tbody>
                {dataBrand.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.form}</td>
                    <td>{item.booking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
