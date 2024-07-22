const BASE_URL = process.env.REACT_APP_BASE_URL;

// auth endpoints
export const endpoints = {
  SINGUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  CHANGEPASSWORD_API: BASE_URL + "/auth/changepassword",
};
