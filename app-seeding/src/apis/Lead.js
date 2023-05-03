import instance from './instance';

export const getLead = (info) => {
    return instance.get(`get-form?token=${info.token}&brand_id=${info.brand_id}&type=${info.type}&limit=${info.limit}&offset=${info.offset}&company_id=${info.company_id}&name_fb=${info.name_fb}&phone=${info.phone}&service=${info.service}&name=${info.name}&start_date=${info.start_date}&end_date=${info.end_date}&user_seeding=${info.user_seeding}`)
};

export const createForm = (info) => {
    return instance.get(`create-form?token=${info.token}&name=${info.name}&phone=${info.phone}&link_fb=${info.link_fb}&name_fb=${info.name_fb}&service=${info.service}&note=${info.note}&script=${info.script}&interactive_proof=${info.interactive_proof}&company_id=${info.company_id}&type=${info.type}`)
}

export const updateForm = (info) => {
    return instance.get(`update-form?token=${info.token}&code_form=${info.code_form}&name=${info.name}&phone=${info.phone}&link_fb=${info.link_fb}&name_fb=${info.name_fb}&service=${info.service}&note=${info.note}&script=${info.script}&interactive_proof=${info.interactive_proof}&company_id=${info.company_id}&type=${info.type}&seeding_user_id=${info.seeding_user_id}&ctv_user_id=${info.ctv_user_id}&brand=${info.brand}`)
}

export const getCompany = (token) => {
    return instance.get(`get-company?token=${token}`)
}
