import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import { profileEndpoints } from "../apis";

const { GET_USER_DATA_API, DELETE_USER_API } = profileEndpoints;

export const getUserData = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_USER_DATA_API);
    console.log("GET_USER_DATA_API RESPONSE.......", response);
    if (!response?.data?.success) {
      throw new Error("Could not Fetch User Data");
    }
    result = response?.data?.userData;
  } catch (error) {
    console.log("GET_USER_DATA_API ERROR.......", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteUser = async (navigate) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("GET", DELETE_USER_API);
    console.log("DELETE_USER_API RESPONSE.......", response);
    if (!response?.data?.success) {
      throw new Error("Could not Fetch User Data");
    }
    navigate("/login");
  } catch (error) {
    console.log("DELETE_USER_API ERROR.......", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};
