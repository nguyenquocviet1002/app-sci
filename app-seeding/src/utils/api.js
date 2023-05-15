import axios from 'axios';

const https = axios.create({
  baseURL: 'https://scigroup.com.vn/cp/seeding/api_v2/',
});

export const getTokenFn = async (info) => {
  return await https.get(`get-token?login=${info.user}&password=${info.password}`);
};

export const getUserFn = async (token) => {
  return await https.get(`get-name?token=${token}`)
};

export const updatePasswordFn = async (info) => {
  return await https.get(`update-password?token=${info.token}&password=${info.password}`);
};

export const getCompanyFn = async (token) => {
  return await https.get(`get-company?token=${token}`)
}

export const getLeadFn = async (info) => {
  return await https.get(`get-form?token=${info.token}&brand_id=${info.brand_id}&type=${info.type}&limit=${info.limit}&offset=${info.offset}&company_id=${info.company_id}&name_fb=${info.name_fb}&phone=${info.phone}&service=${info.service}&name=${info.name}&start_date=${info.start_date}&end_date=${info.end_date}&user_seeding=${info.user_seeding}`)
};

export const createLeadFn = async (info) => {
  return await https.get(`create-form?token=${info.token}&name=${info.name}&phone=${info.phone}&link_fb=${info.link_fb}&name_fb=${info.name_fb}&service=${info.service}&note=${info.note}&script=${info.script}&interactive_proof=${info.interactive_proof}&company_id=${info.company_id}&type=${info.type}`)
};

export const updateLeadFn = async (info) => {
  return await https.get(`update-form?token=${info.token}&code_form=${info.code_form}&name=${info.name}&phone=${info.phone}&link_fb=${info.link_fb}&name_fb=${info.name_fb}&service=${info.service}&note=${info.note}&script=${info.script}&interactive_proof=${info.interactive_proof}&company_id=${info.company_id}&type=${info.type}&seeding_user_id=${info.seeding_user_id}&ctv_user_id=${info.ctv_user_id}&brand=${info.brand}`)
}
