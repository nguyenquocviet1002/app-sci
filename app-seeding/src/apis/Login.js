import instance from './instance';

export const login = (user, password) => {
  return instance.get(`get-token?login=${user}&password=${password}`)
};
