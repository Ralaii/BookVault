import api from "../utilities/api"

export const loginService = (user) => api.post('api/auth/login', user);
export const registerService = (user) => api.post('api/auth/register', user);