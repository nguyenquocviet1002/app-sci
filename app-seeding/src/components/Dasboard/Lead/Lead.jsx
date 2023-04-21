import { getLead } from '../../../apis/Lead';
import React, { useEffect, useState } from 'react';

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
        setDataLead(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <>Lead</>
    </>
  );
};

export default Lead;
