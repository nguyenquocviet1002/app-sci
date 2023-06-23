import http from "./http";

export const getUserFn = async (token) => {
    return await http.get(`/get-name?token=${token}`)
};

export const getAllUserFn = (body) => {
    return http.get(`/get-user?token=${body.token}&code_user=${body.code_user}`)
}

export const createUserFn = (body) => {
    return http.get(`/create-user?token=${body.token}&name=${body.name}&phone=${body.phone}&mobile=${body.mobile}&date_of_birth=${body.date_of_birth}`)
}

export const updateActiveUserFn = (body) => {
    return http.get(`/update-active-user?token=${body.token}&code_user=${body.code_user}&active=${body.active}`)
}

export const updatePasswordUserFn = (body) => {
    return http.get(`/update-password-member?token=${body.token}&login=${body.login}&password=${body.password}`)
}