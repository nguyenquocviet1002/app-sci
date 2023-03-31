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

  return (
    <>
      <>Lead</>
    </>
  );
};

export default Lead;
