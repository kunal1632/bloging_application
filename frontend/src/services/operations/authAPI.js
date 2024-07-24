import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const { SINGUP_API, LOGIN_API, CHANGEPASSWORD_API } = endpoints;

export function singup(data, navigate) {
  return async (dispatch) => {
    console.log(SINGUP_API);
    const toasId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SINGUP_API, data);
      console.log("SINGUP API RESPONSE........", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup successfully");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR.....", error);
      toast.error("Singup Failed, Please try again");
    }
    dispatch(setLoading(false));
    toast.dismiss(toasId);
  };
}

export function login(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, data);
      console.log("LOGIN API RESPONSE.....", response);

      if (!response?.data?.success) {
        console.log("inside");
        throw new Error(response.data.message);
      }
      toast.success("Login successful");
      dispatch(setToken(response.data.token));
      localStorage.setItem("token", JSON.stringify(response.data.token));

      navigate("/");
    } catch (error) {
      console.log("LOGIN API ERROR.....", error);
      toast.error("Login Failed, Please try again");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    localStorage.removeItem("token");
    toast.success("Logged Out");
    navigate("/login");
  };
}

export async function changePassword(data, token) {
  const toasId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", CHANGEPASSWORD_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CHANGE PASSWORD API RESPONSE........", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Password changed successfully");
  } catch (error) {
    console.log("CHANGE PASSWORD ERROR.....", error);
    toast.error("Something went wrong");
  }

  toast.dismiss(toasId);
}
