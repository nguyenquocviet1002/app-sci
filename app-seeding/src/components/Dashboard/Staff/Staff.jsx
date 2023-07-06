import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { removeFirstItem } from '@/utils/removeFirstItem';
import { useGetAllUser, useUpdateActiveUser } from '@/services/userService';
import { formatMoney } from '@/utils/formatMoney';
import { customStyles } from '@/utils/styleCustomTable';
import { useModal } from '@/hooks/useModal';

import ModalCreateUser from '../ModalCreateUser';
import ModalChangePasswordUser from '../ModalChangePasswordUser';
import ModalTarget from '../ModalTarget';
import Button from '@/components/UI/Button';
import Loading from '@/components/UI/Loading';

import staffStyles from './Staff.module.scss';

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

  const { dataAllUser, isSuccessAllUser, isFetchingAllUser, refetchAllUser } = useGetAllUser(initialInfo);
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
      name: 'Kết quả',
      selector: (row) => formatMoney(row.kpi_now),
      grow: 0.6,
    },
    {
      name: 'Mục tiêu',
      selector: (row) => formatMoney(row.kpi_target),
      grow: 0.6,
    },
    {
      name: 'Hoàn thành',
      selector: (row) => {
        const kpiTarget = row.kpi_target === 0 ? row.kpi_now : row.kpi_target;
        const percentSet = ((row.kpi_now / kpiTarget) * 100).toFixed();
        return percentSet === 'NaN' ? '0%' : `${percentSet}%`;
      },
      grow: 0.6,
    },
    {
      name: 'Trạng thái',
      selector: (row) => (
        <select
          defaultValue={row.active_user}
          onChange={(e) => {
            setActiveUser(row.code_user, e.target.value);
          }}
          className={`${staffStyles['staff__status']} ${
            row.active_user === true ? staffStyles['staff__status--active'] : staffStyles['staff__status--unActive']
          }`}
        >
          <option value="true">Đang hoạt động</option>
          <option value="false">Vô hiệu hóa</option>
        </select>
      ),
    },
    {
      name: 'Hành động',
      cell: (row) => (
        <>
          <button
            className={staffStyles['staff__action']}
            onClick={() => {
              toggle('ModalChangePasswordUser');
              setPhoneLogin(row.phone);
            }}
            style={{
              pointerEvents: row.active_user === false ? 'none' : '',
              filter: row.active_user === false ? 'grayscale(1)' : '',
            }}
          >
            <img src={`${process.env.PUBLIC_URL}/images/pencil-solid.svg`} alt="" />
          </button>
          <button
            className={`${staffStyles['staff__action']} ${staffStyles['staff__action--red']}`}
            onClick={() => {
              toggle('ModalTarget');
              setInfoTarget({ name: row.name, user_seeding: row.code_user });
            }}
            style={{
              pointerEvents: row.active_user === false ? 'none' : '',
              filter: row.active_user === false ? 'grayscale(1)' : '',
            }}
          >
            <img src={`${process.env.PUBLIC_URL}/images/ellipsis-vertical-solid.svg`} alt="" />
          </button>
        </>
      ),
      grow: 0,
    },
  ];

  return (
    <div className={staffStyles['staff__main']}>
      <div className={staffStyles['staff__head']}>
        <div className={staffStyles['staff__cta']}>
          <div className={staffStyles['staff__title']}>Danh Sách Nhân Viên</div>
          <div className={staffStyles['staff__ctaLeft']}>
            <div className={staffStyles['staff__search']}>
              <input
                type="text"
                className={staffStyles['staff__filterSearch']}
                placeholder="Tìm kiếm theo mã nhân viên"
                onChange={(e) => (initialInfo.code_user = e.target.value)}
              />
              <button className={staffStyles['staff__submit']} onClick={() => refetchAllUser()}>
                <img src={`${process.env.PUBLIC_URL}/images/magnifying-glass-solid.svg`} alt="" />
              </button>
            </div>
            <div className={staffStyles['staff__ctaAdd']}>
              <Button event={() => toggle('ModalCreateUser')} icon="plus-solid.svg">
                Thêm mới
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={staffStyles['staff__table']}>
        <DataTable columns={columns} data={allUser} customStyles={customStyles} />
      </div>
      <ModalCreateUser isShowing={isShowing} hide={toggle} element={cpn} token={token} refetch={refetchAllUser} />
      <ModalChangePasswordUser
        isShowing={isShowing}
        hide={toggle}
        element={cpn}
        token={token}
        phoneLogin={phoneLogin}
      />
      <ModalTarget isShowing={isShowing} hide={toggle} element={cpn} token={token} infoTarget={infoTarget} />
      {isFetchingAllUser && <Loading />}
    </div>
  );
}
