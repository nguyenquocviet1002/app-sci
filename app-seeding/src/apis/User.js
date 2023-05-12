import instance from './instance';

export const updatePassword = (info) => {
    return instance.get(`update-password?token=${info.token}&password=${info.password}`)
}
