import DataTable from 'react-data-table-component';
import { getLead } from '@/apis/Lead';

import React, { useEffect, useState } from 'react';

import leadStyles from './Lead.module.scss';
import Modal from '../ModalSearch/ModalSearch';
import useModal from '@/hooks/useModal';
import ModalCreate from '../ModalCreate/ModalCreate';
import ModalUpdate from '../ModalUpdate/ModalUpdate';
import ModalMore from '../ModalMore/ModalMore';

const token = localStorage.getItem('token');

const info = {
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
  user_seeding: '',
};

const Lead = () => {
  const [dataLead, setDataLead] = useState([]);
  const [dataLeadItem, setDataLeadItem] = useState([]);

  const { isShowing, cpn, toggle } = useModal();
  useEffect(() => {
    getLead(info)
      .then(({ data }) => {
        data.data.shift();
        setDataLead(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showMore = async (id) => {
    const dataOnly = dataLead.filter((item) => item.id === id);
    console.log(dataOnly[0]);
    setDataLeadItem(dataOnly);
  };

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
        <div className={leadStyles['cta__action']}>
          <button
            className={leadStyles['showmore']}
            onClick={() => {
              showMore(row.id);
              toggle('ModalMore');
            }}
          >
            Xem thêm
          </button>
          <div
            onClick={() => toggle('ModalUpdate')}
            className={leadStyles['update']}
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/icon-pen.png)` }}
          ></div>
        </div>
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
    <div className={leadStyles['contentLead']}>
      <div className={leadStyles['contentLead__btn']}>
        <button
          className={`${leadStyles['contentLead__btn--search']} btn modal-btn`}
          data-modal="modal-opacity"
          onClick={() => toggle('Modal')}
        >
          <span>Tìm kiếm</span>
          <span
            className={leadStyles['contentLead__iconSearch']}
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/icon-search.png)` }}
          ></span>
        </button>
        <button
          className={`${leadStyles['contentLead__btn--add']} btn modal-btn`}
          data-modal="modal-opacity-add"
          onClick={() => toggle('ModalCreate')}
        >
          <span>Thêm mới</span>
          <span
            className={leadStyles['contentLead__iconAdd']}
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/icon-add.png)` }}
          ></span>
        </button>
      </div>
      <DataTable columns={columns} data={dataLead} pagination customStyles={customStyles} highlightOnHover />
      <Modal isShowing={isShowing} hide={toggle} element={cpn} />
      <ModalCreate isShowing={isShowing} hide={toggle} element={cpn} />
      <ModalUpdate isShowing={isShowing} hide={toggle} element={cpn} />
      <ModalMore isShowing={isShowing} hide={toggle} element={cpn} data={dataLeadItem} />
    </div>
  );
};

export default Lead;
