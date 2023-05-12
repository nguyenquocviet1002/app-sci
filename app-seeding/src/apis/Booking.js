import instance from './instance';

export const getBooking = (info) => {
    return instance.get(`get-booking?token=${info.token}&type=${info.type}&check=${info.check}&limit=${info.limit}&offset=${info.offset}&start_date=${info.start_date}&end_date=${info.end_date}&name=${info.name}&phone=${info.phone}&code=${info.code}&user_seeding=${info.user_seeding}`)
};
