import http from "./http";

export const getTokenFn = async (body) => {
    return await http.get(`/get-token?login=${body.user}&password=${body.password}`)
};

export const updatePasswordFn = async (body) => {
    return await http.get(`/update-password?token=${body.token}&password=${body.password}`)
};