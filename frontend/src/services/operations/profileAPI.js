import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { logout } from "./authAPI";

const { GET_USER_DATA_API, DELETE_USER_API } = profileEndpoints;

export const getUserData = async (token) => {
  let result;
  try {
    const response = await apiConnector("GET", GET_USER_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET_USER_DATA_API RESPONSE.......", response);
    if (!response?.data?.success) {
      throw new Error("Could not Fetch User Data");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_USER_DATA_API ERROR.......", error);
    toast.error(error.message);
  }

  return result;
};

export const deleteUser = (token, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("DELETE", DELETE_USER_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("DELETE_USER_API RESPONSE.......", response);
      if (!response?.data?.success) {
        throw new Error("Could not Fetch User Data");
      }

      dispatch(logout(navigate));
    } catch (error) {
      console.log("DELETE_USER_API ERROR.......", error);
    }
    toast.dismiss(toastId);
  };
};
