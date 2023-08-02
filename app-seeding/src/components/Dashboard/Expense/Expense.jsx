import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useGetAllUser, useGetUser } from '@/services/userService';
import { useGetBrand } from '@/services/reportService';
import { removeFirstItem } from '@/utils/removeFirstItem';
import { getCustomerSuccess, getRevenue, getRevenueByYear } from '@/utils/reportNumber';
import { formatMoney } from '@/utils/formatMoney';

import Loading from '@/components/UI/Loading';
import quantityFBStyles from '../QuantityFB/QuantityFB.module.scss';
import quantitySuccessStyles from '../QuantitySuccess/QuantitySuccess.module.scss';
import expenseStyles from './Expense.module.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

export default function Expense() {
  const [dataTarget, setDataTarget] = useState([]);
  const [dataPercent, setDataPercent] = useState([]);
  const [dataPrice, setDataPrice] = useState([]);
  const [dataPriceBrand, setDataPriceBrand] = useState([]);
  const [user, setUser] = useState({ label: 'Nhân viên', value: '' });
  const [isShow, setIsShow] = useState(false);
  const [isShow2, setIsShow2] = useState(false);
  const [inputDate, setInputDate] = useState({
    startDate: '',
    endDate: '',
  });
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState({ label: 'Thương hiệu', value: '' });
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null);
  const { dataAllUser, isSuccessAllUser } = useGetAllUser({ token: token, code_user: '' });
  const { dataUser, isSuccessUser } = useGetUser(token);
  const { dataBrands, isSuccessBrand } = useGetBrand(token);

  useEffect(() => {
    if (isSuccessUser) {
      if (dataUser.data.data.rule === 'user') {
        setUser({ label: dataUser.data.data.username, value: dataUser.data.data.code_seeding });
      }
    }
  }, [isSuccessUser, dataUser]);

  useEffect(() => {
    if (isSuccessUser && isSuccessAllUser) {
      const dataUserTarget = removeFirstItem(dataAllUser).filter((item) => {
        return item.code_user === (user.value === '' ? 'US0000015' : user.value);
      });

      if (dataUserTarget.length !== 0) {
        const targetSet = [
          dataUserTarget[0].kpi_now,
          dataUserTarget[0].kpi_target - dataUserTarget[0].kpi_now < 0
            ? 0
            : dataUserTarget[0].kpi_target - dataUserTarget[0].kpi_now,
        ];
        const kpiTarget = dataUserTarget[0].kpi_target === 0 ? dataUserTarget[0].kpi_now : dataUserTarget[0].kpi_target;
        const percentSet = ((dataUserTarget[0].kpi_now / kpiTarget) * 100).toFixed();
        setDataTarget(targetSet);
        setDataPercent(percentSet);
      } else {
        setDataTarget([1, 0]);
      }
    }
  }, [isSuccessUser, isSuccessAllUser, dataUser, dataAllUser, user]);

  const matchExMonth = useMatch('/dashboard/expense/month');
  const matchExYear = useMatch('/dashboard/expense/year');
  const matchExAbout = useMatch('/dashboard/expense/about');

  useEffect(() => {
    if (matchExMonth) {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      getCustomerSuccess(searchValue, filter.value, firstDay, lastDay, token, user.value)
        .then((data) => setDataPrice(data.tong_tien))
        .catch((err) => console.log(err));
      getRevenue(firstDay, lastDay, token, user.value)
        .then((data) => setDataPriceBrand(data))
        .catch((err) => console.log(err));
    } else if (matchExYear) {
      const date = new Date();
      const year = date.getFullYear();
      const firstDay = new Date(year, 0, 1);
      const lastDay = new Date(year, 11, 31);
      getCustomerSuccess(searchValue, filter.value, firstDay, lastDay, token, user.value)
        .then((data) => setDataPrice(data.tong_tien))
        .catch((err) => console.log(err));
      getRevenueByYear(firstDay, lastDay, token, user.value)
        .then((data) => setDataPriceBrand(data))
        .catch((err) => console.log(err));
    } else if (matchExAbout) {
      getCustomerSuccess(searchValue, filter.value, inputDate.startDate, inputDate.endDate, token, user.value)
        .then((data) => setDataPrice(data.tong_tien))
        .catch((err) => console.log(err));
      getRevenue(inputDate.startDate, inputDate.endDate, token, user.value)
        .then((data) => setDataPriceBrand(data))
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
      if (dataUser) {
        getCustomerSuccess(searchValue, filter.value, firstDay, lastDay, token, user.value)
          .then((data) => setDataPrice(data.tong_tien))
          .catch((err) => console.log(err));
        getRevenue(firstDay, lastDay, token, user.value)
          .then((data) =>
            setDataPriceBrand({ ...data, labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'] }),
          )
          .catch((err) => console.log(err));
      }
    }
  }, [matchExMonth, matchExAbout, matchExYear, token, user, searchValue, filter, inputDate, dataUser]);

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
    getCustomerSuccess(searchValue, filter.value, inputDate.startDate, inputDate.endDate, token, user.value)
      .then((data) => setDataPrice(data.tong_tien))
      .catch((err) => console.log(err));
    getRevenue(inputDate.startDate, inputDate.endDate, token, user.value)
      .then((data) => setDataPriceBrand(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const dataTargetDoughnut = {
    labels: ['Doanh số đã đạt', 'Doanh số chưa đạt'],
    datasets: [
      {
        label: 'Doanh số',
        data: dataTarget,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const dataBrand = {
    labels: dataPriceBrand.labels,
    datasets: [
      {
        label: 'Tất cả',
        data: dataPriceBrand.all,
        backgroundColor: '#ff6384',
      },
      {
        label: 'Kangnam',
        data: dataPriceBrand.kn,
        backgroundColor: '#ff9f40',
      },
      {
        label: 'Đông Á',
        data: dataPriceBrand.da,
        backgroundColor: '#4bc0c0',
      },
      {
        label: 'Hồng Hà',
        data: dataPriceBrand.hh,
        backgroundColor: '#9966ff',
      },
      {
        label: 'Paris',
        data: dataPriceBrand.pr,
        backgroundColor: '#36a2eb',
      },
    ],
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className={quantityFBStyles['quantityFB__head']}>
        <div className={quantityFBStyles['quantityFB__filter']}>
          <div className={quantityFBStyles['quantityFB__title']}>Báo Cáo Chi Phí</div>
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
        {matchExAbout && (
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

      <div>
        <div className={quantityFBStyles['quantityFB__body']}>
          <div className={expenseStyles['expense__chart']}>
            <div className={quantityFBStyles['quantityFB__item']}>
              <div className={expenseStyles['expense__title']}>Mục Tiêu</div>
              <div className={expenseStyles['expense__container']}>
                <Doughnut
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                  data={dataTargetDoughnut}
                />
                <div className={expenseStyles['expense__percent']}>
                  {dataPercent === 'NaN' ? '0%' : `${dataPercent}%`}
                </div>
              </div>
            </div>
          </div>
          <div className={`${quantityFBStyles['quantityFB__table']} ${expenseStyles['expense__table']}`}>
            <div className={quantityFBStyles['quantityFB__item']}>
              <div className={expenseStyles['expense__title']}>Doanh Thu Theo Dịch Vụ</div>
              <div className={quantitySuccessStyles['quantitySS__filter']}>
                <div style={{ position: 'relative', flex: 'auto' }}>
                  <input
                    type="text"
                    className={quantitySuccessStyles['quantitySS__filterSearch']}
                    placeholder="Tìm theo tên dịch vụ..."
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                  />
                  {searchValue && (
                    <span className={quantitySuccessStyles['quantitySS__reset']} onClick={() => setSearchValue('')}>
                      <svg
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
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
              <div className={expenseStyles['expense__tableBox']}>
                <table>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Dịch vụ</th>
                      <th>Số lượng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPrice.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.group_service}</td>
                        <td>{formatMoney(item.tong_tien)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={`${quantityFBStyles['quantityFB__item']}`}>
            <div className={expenseStyles['expense__title']}>Doanh Thu Theo Thương Hiệu</div>
            <div className={quantityFBStyles['quantityFB__item--1']}>
              <Bar options={options} data={dataBrand} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
