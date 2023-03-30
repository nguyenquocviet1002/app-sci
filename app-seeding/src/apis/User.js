import instance from './instance';

export const getUser = (token) => {
    return instance.get(`get-name?token=${token}`)
};

export const updatePassword = (info) => {
    return instance.get(`update-password?token=${info.token}&password=${info.password}`)
}
