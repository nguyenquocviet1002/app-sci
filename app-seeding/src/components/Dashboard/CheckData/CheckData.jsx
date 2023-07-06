import DataTable from 'react-data-table-component';
import { useMemo, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useGetCheckData } from '@/services/reportService';
import { customStyles, paginationComponentOptions } from '@/utils/styleCustomTable';
import { formatDate } from '@/utils/formatDate';
import { useModal } from '@/hooks/useModal';

import Loading from '@/components/UI/Loading';

import checkDataStyles from './CheckData.module.scss';
import ModalCheckData from '../ModalCheckData';

export default function CheckData() {
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null);
  const [inputDate, setInputDate] = useState('');
  const [valueSearch, setValueSearch] = useState('');
  const [dataModal, setDataModal] = useState({ type: '', data: [] });
  const { isShowing, cpn, toggle } = useModal();
  const initialCheck = useMemo(() => {
    return {
      token: token,
      start_date: formatDate(new Date(inputDate).setDate(new Date(inputDate).getDate() - 1)),
      end_date: formatDate(inputDate),
      phone: valueSearch,
      user_seeding: '',
    };
  }, [token, inputDate, valueSearch]);

  const { dataCheck, isSuccessCheck, isFetchingCheck, refetchCheck } = useGetCheckData(initialCheck);

  const columns = [
    {
      name: 'Mã booking',
      selector: (row) => row.bk_code,
    },
    {
      name: 'Tên khách hàng',
      selector: (row) => row.name,
    },
    {
      name: 'Số điện thoại',
      selector: (row) => row.phone_1,
    },
    {
      name: 'Nhân viên sale',
      selector: (row) => row.sale_create,
    },
    {
      name: 'Doanh số',
      selector: (row) =>
        row.doanh_so.length > 0 ? (
          <button
            className={checkDataStyles['check__read']}
            onClick={() => {
              setDataModal({ type: 'doanh_so', data: row.doanh_so });
              toggle('ModalCheckData');
            }}
          >
            Xem thêm
          </button>
        ) : (
          'Trống'
        ),
    },
    {
      name: 'Dịch vụ',
      selector: (row) =>
        row.dich_vu.length > 0 ? (
          <button
            className={checkDataStyles['check__read']}
            onClick={() => {
              setDataModal({ type: 'dich_vu', data: row.dich_vu });
              toggle('ModalCheckData');
            }}
          >
            Xem thêm
          </button>
        ) : (
          'Trống'
        ),
    },
  ];

  return (
    <>
      {isFetchingCheck && <Loading />}
      <div className={checkDataStyles['check__main']}>
        <div className={checkDataStyles['check__head']}>
          <div className={checkDataStyles['check__cta']}>
            <div className={checkDataStyles['check__title']}>Danh Sách Dữ Liệu Trùng</div>
            <div className={checkDataStyles['check__ctaLeft']}>
              <div className={checkDataStyles['check__search']}>
                <input
                  type="text"
                  className={checkDataStyles['check__filterSearch']}
                  placeholder="Tìm theo số điện thoại..."
                  onChange={(e) => setValueSearch(e.target.value)}
                  value={valueSearch}
                />
                <input
                  type="date"
                  className={checkDataStyles['check__filterSearch']}
                  onChange={(e) => setInputDate(e.target.value)}
                  value={inputDate}
                />
                <button className={checkDataStyles['check__submit']} onClick={refetchCheck}>
                  <img src={`${process.env.PUBLIC_URL}/images/magnifying-glass-solid.svg`} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {isSuccessCheck && (
          <div className={checkDataStyles['check__table']}>
            <DataTable
              columns={columns}
              data={dataCheck.data.data}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              customStyles={customStyles}
              highlightOnHover
            />
          </div>
        )}
      </div>
      <ModalCheckData isShowing={isShowing} hide={toggle} element={cpn} data={dataModal} />
    </>
  );
}
