import instance from './instance';

export const getLead = (info) => {
    return instance.get(`https://scigroup.com.vn/cp/seeding/api_v2/get-form?token=${info.token}&brand_id=${info.brand_id}&type=${info.type}&limit=${info.limit}&offset=${info.offset}&company_id=${info.company_id}&name_fb=${info.name_fb}&phone=${info.phone}&service=${info.service}&name=${info.name}&start_date=${info.start_date}&end_date=${info.end_date}&user_seeding=${info.user_seeding}`)
};
