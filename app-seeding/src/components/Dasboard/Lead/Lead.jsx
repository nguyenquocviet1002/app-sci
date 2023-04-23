import DataTable from 'react-data-table-component';
import { getLead } from '../../../apis/Lead';
import React, { useEffect, useState } from 'react';

import leadStyles from './Lead.module.scss';

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
    const form = `
      <div>Mã: ${dataOnly[0].code_form}</div>
      <div>Họ và tên: ${dataOnly[0].name}</div>
      <div>Số điện thoại: ${dataOnly[0].phone}</div>
      <div>Facebook: <a href="${dataOnly[0].link_fb}">${dataOnly[0].name_fb}</a></div>
      <div>Dịch vụ đăng ký: ${dataOnly[0].service}</div>
      <div>Chi nhánh: ${dataOnly[0].company_name}</div>
      <div>Kịch bản: ${dataOnly[0].script}</div>
      <div>Thời gian - chưa có: ${dataOnly[0].company_code}</div>
      <div>Ghi chú: ${dataOnly[0].note}</div>
    `;
    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforebegin', form);
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
      name: 'Ngày tạo - Chưa có',
      selector: (row) => row.script,
    },
    {
      name: 'Xem thêm',
      cell: (row) => <button onClick={() => showMore(row.id)}>Xem thêm</button>,
    },
  ];

  return (
    <div className={leadStyles['box__lead']}>
      <div className={leadStyles['btn__action']}>
        <button>Tìm kiếm</button>
        <button>Thêm mới</button>
      </div>
      <DataTable columns={columns} data={dataLead} pagination />
    </div>
  );
};

export default Lead;
