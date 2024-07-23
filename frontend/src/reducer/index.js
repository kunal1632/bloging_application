import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import blogReducer from "../slices/blogSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
});

export default rootReducer;
