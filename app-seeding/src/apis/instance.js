import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://scigroup.com.vn/cp/seeding/api_v2/',
});

export default instance;
