import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { removeFirstItem } from '@/utils/removeFirstItem';
import { useGetAllUser, useUpdateActiveUser } from '@/services/userService';
import { formatMoney } from '@/utils/formatMoney';
import { customStyles } from '@/utils/styleCustomTable';

import ModalCreateUser from '../ModalCreateUser';
import { useModal } from '@/hooks/useModal';
import ModalChangePasswordUser from '../ModalChangePasswordUser';
import ModalTarget from '../ModalTarget';

import staffStyles from './Staff.module.scss';
import Button from '@/components/UI/Button';

export default function Staff() {
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null);
  const { isShowing, cpn, toggle } = useModal();

  const initialInfo = {
    token: token,
    code_user: '',
  };

  const [allUser, setAllUser] = useState([]);
  const [isActive, setIsActive] = useState({});
  const [phoneLogin, setPhoneLogin] = useState('');
  const [infoTarget, setInfoTarget] = useState({
    name: '',
    user_seeding: '',
  });

  const { dataAllUser, isSuccessAllUser, refetchAllUser } = useGetAllUser(initialInfo);
  const { refetchUpdateActiveUser } = useUpdateActiveUser(isActive);

  useEffect(() => {
    if (isSuccessAllUser) {
      const newItem = removeFirstItem(dataAllUser);
      setAllUser(newItem);
    }
  }, [dataAllUser, isSuccessAllUser]);

  const setActiveUser = (codeUser, active) => {
    setIsActive({
      token: token,
      code_user: codeUser,
      active: active,
    });
    setTimeout(() => {
      refetchUpdateActiveUser();
    }, 1000);
  };

  const columns = [
    {
      name: 'Mã nhân viên',
      selector: (row) => row.code_user,
      grow: 0.6,
      maxWidth: '150px',
    },
    {
      name: 'Họ và tên',
      selector: (row) => row.name,
    },
    {
      name: 'Số điện thoại',
      selector: (row) => row.phone,
      grow: 0.6,
      maxWidth: '150px',
    },
    {
      name: 'Tiến trình',
      selector: (row) => formatMoney(row.kpi_now),
      grow: 0.6,
    },
    {
      name: 'Mục tiêu',
      selector: (row) => formatMoney(row.kpi_target),
      grow: 0.6,
    },
    {
      name: 'Trạng thái',
      selector: (row) => (
        <select
          className={staffStyles['staff__selectAction']}
          defaultValue={row.active_user}
          onChange={(e) => {
            setActiveUser(row.code_user, e.target.value);
          }}
        >
          <option value="true">Đang hoạt động</option>
          <option value="false">Vô hiệu hóa</option>
        </select>
      ),
    },
    {
      name: 'Hành động',
      cell: (row) => (
        <div className={staffStyles['cta__action']}>
          <div
            onClick={() => {
              toggle('ModalChangePasswordUser');
              setPhoneLogin(row.phone);
            }}
            className={staffStyles['update']}
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/icon-pen.png)` }}
          ></div>
          <div
            onClick={() => {
              toggle('ModalTarget');
              setInfoTarget({ name: row.name, user_seeding: row.code_user });
            }}
            className={`${staffStyles['update']} ${staffStyles['update--2']}`}
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/icon-three-dots.png)` }}
          ></div>
        </div>
      ),
      grow: 0,
    },
  ];

  return (
    <div className={staffStyles['staff__content']}>
      <div className={staffStyles['staff__cta']}>
        <div className={staffStyles['staff__search']}>
          <div className={staffStyles['staff__iconSearch']}>
            <svg
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            className={staffStyles['staff__inputSearch']}
            placeholder="Tìm kiếm theo mã nhân viên"
            onChange={(e) => (initialInfo.code_user = e.target.value)}
          />
          <button type="submit" className={staffStyles['staff__buttonSubmit']} onClick={() => refetchAllUser()}>
            Search
          </button>
        </div>
        <Button event={() => toggle('ModalCreateUser')} icon="add">
          Thêm mới
        </Button>
      </div>
      <DataTable columns={columns} data={allUser} customStyles={customStyles} />
      <ModalCreateUser isShowing={isShowing} hide={toggle} element={cpn} token={token} refetch={refetchAllUser} />
      <ModalChangePasswordUser
        isShowing={isShowing}
        hide={toggle}
        element={cpn}
        token={token}
        phoneLogin={phoneLogin}
      />
      <ModalTarget isShowing={isShowing} hide={toggle} element={cpn} token={token} infoTarget={infoTarget} />
    </div>
  );
}
