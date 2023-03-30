import React, { useEffect, useState } from 'react';
import { getLead } from '../../../apis/Lead';

const Lead = () => {
  const [info, setInfo] = useState({
    token: '',
    brand_id: '',
    type: 'seeding',
    limit: 10,
    offset: 0,
    company_id: '',
    name_fb: '',
    phone: '',
    service: '',
    name: '',
    start_date: '',
    end_date: '',
    user_seeding: '',
  });

  const token = localStorage.getItem('token');
  setInfo({ ...info, token: token });

  useEffect(() => {
    getLead(info)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [info]);

  return (
    <>
      <>Lead</>
    </>
  );
};

export default Lead;
