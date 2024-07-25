const BASE_URL = process.env.REACT_APP_BASE_URL;

// auth endpoints
export const endpoints = {
  SINGUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  CHANGEPASSWORD_API: BASE_URL + "/auth/changepassword",
};

// user endpoints
export const profileEndpoints = {
  GET_USER_DATA_API: BASE_URL + "/profile/userdetials",
  DELETE_USER_API: BASE_URL + "/profile/deleteuser",
};

// user endpoints
export const blogEndpoints = {
  GET_ALL_BLOG_API: BASE_URL + "/blog/get-all-blog",
  GET_BLOG_BY_ID_API: BASE_URL + "/blog/get-blog",
  CREATE_BLOG_API: BASE_URL + "/blog/create-blog",
  UPDATE_BLOG_API: BASE_URL + "/blog/update-blog",
  DELETE_BLOG_API: BASE_URL + "/blog/delete-blog",
};
