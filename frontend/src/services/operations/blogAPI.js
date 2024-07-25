import { apiConnector } from "../apiconnector";
import { blogEndpoints } from "../apis";
import { toast } from "react-hot-toast";

const {
  GET_ALL_BLOG_API,
  GET_BLOG_BY_ID_API,
  CREATE_BLOG_API,
  UPDATE_BLOG_API,
  DELETE_BLOG_API,
} = blogEndpoints;

export const getAllBlogs = async (token) => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_BLOG_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET_ALL_BLOG RESPONSE.......", response);
    if (!response?.data?.success) {
      throw new Error("Could not Fetch All Blog");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_ALL_BLOG_API ERROR.......", error);
    toast.error(error.message);
  }
  return result;
};

export const getBlogById = async (blogId, token) => {
  let result;
  try {
    const response = await apiConnector(
      "POST",
      GET_BLOG_BY_ID_API,
      { blogId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_BLOG_BY_ID_API RESPONSE.......", response);
    if (!response?.data?.success) {
      throw new Error("Could not Fetch All Blog");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_BLOG_BY_ID_API ERROR.......", error);
    toast.error(error.message);
  }
  return result;
};

export const createBlog = async (data, token) => {
  let result = [];
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", CREATE_BLOG_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("CREATE BLOG API RESPONSE.......", response);
    if (!response.data.success) {
      throw new Error("Could not create a blog");
    }
    toast.success("Blog has been posted");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE BLOG API ERROR......", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateBlog = async (data, token) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_BLOG_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE BLOG API RESPONSE.......", response);
    if (!response.data.success) {
      throw new Error("Could not update the blog");
    }
    toast.success("Updated blog successfully");
    console.log("response", response);
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE BLOG API ERROR......", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteBlog = async (blogId, navigate, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_BLOG_API,
      { blogId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("DELETE BLOG API RESPONSE.......", response);
    if (!response.data.success) {
      throw new Error("Could not delete the blog");
    }
    toast.success("BLog deleted successfully");
    navigate("/my-blogs");
  } catch (error) {
    console.log("DELETE BLOG API ERROR......", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};
