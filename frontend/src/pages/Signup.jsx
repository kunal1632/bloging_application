import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { singup } from "../services/operations/authAPI";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitSingup = async (data) => {
    dispatch(singup(data, navigate));
  };
  if (loading) {
    return (
      <div className="flex w-full h-[calc(100vh-4rem)] items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <>
      <div className="h-[calc(100vh-5rem)] w-full flex items-center justify-center">
        <div className="w-[35rem] flex flex-col items-center justify-center -mt-[100px] p-5">
          <p className="text-4xl font-bold dark:text-white text-center">
            Join Blogining Studio
          </p>

          <form
            onSubmit={handleSubmit(submitSingup)}
            className="flex flex-col mt-5 md:p-5 w-full gap-5"
          >
            {/* user name */}
            <div className="flex gap-5 flex-col md:flex-row ">
              {/* firstname */}
              <div className="flex flex-col gap-1 w-full">
                <label className="text-md dark:text-white" htmlFor="firstName">
                  First Name<sup className="text-red-500">*</sup>
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter Your First Name"
                  className="w-full px-3 py-2 rounded-xl border shadow-md bg-slate-100 dark:bg-slate-800 dark:text-white border-slate-300 dark:border-slate-600 shadow-slate-400 dark:shadow-slate-700"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <span className="ml-2 text-sm text-red-500">
                    First Name is required
                  </span>
                )}
              </div>
              {/* last name  */}
              <div className="flex flex-col gap-1 w-full">
                <label className="text-md dark:text-white" htmlFor="lastName">
                  Last Name<sup className="text-red-500">*</sup>
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter Your Last Name"
                  className="w-full px-3 py-2 rounded-xl border shadow-md bg-slate-100 dark:bg-slate-800 dark:text-white border-slate-300 dark:border-slate-600 shadow-slate-400 dark:shadow-slate-700"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <span className="ml-2 text-sm text-red-500">
                    Last Name is required
                  </span>
                )}
              </div>
            </div>

            {/* email id */}
            <div className="flex flex-col gap-1 w-full">
              <label className="text-md dark:text-white" htmlFor="email">
                Email Id<sup className="text-red-500">*</sup>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter Your Email Id"
                className="w-full px-3 py-2 rounded-xl border shadow-md bg-slate-100 dark:bg-slate-800 dark:text-white border-slate-300 dark:border-slate-600 shadow-slate-400 dark:shadow-slate-700"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="ml-2 text-sm text-red-500">
                  Email Id is required
                </span>
              )}
            </div>

            {/* passwords */}
            <div className="flex gap-5 flex-col md:flex-row">
              {/* password */}
              <div className="flex flex-col gap-1 w-full relative">
                <label className="text-md dark:text-white" htmlFor="password">
                  Password<sup className="text-red-500">*</sup>
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="w-full  px-3 py-2 rounded-xl border shadow-md bg-slate-100 dark:bg-slate-800 dark:text-white border-slate-300 dark:border-slate-600 shadow-slate-400 dark:shadow-slate-700 "
                  {...register("password", { required: true })}
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] cursor-pointer dark:text-white"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} />
                  ) : (
                    <AiOutlineEye fontSize={24} />
                  )}
                </span>
                {errors.password && (
                  <span className="ml-2 text-sm text-red-500">
                    Passowrd is required
                  </span>
                )}
              </div>
              {/* confirm password  */}
              <div className="flex flex-col gap-1 w-full relative">
                <label
                  className="text-md dark:text-white"
                  htmlFor="confirmPassword"
                >
                  Confirm Password<sup className="text-red-500">*</sup>
                </label>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="w-full  px-3 py-2 rounded-xl border shadow-md bg-slate-100 dark:bg-slate-800 dark:text-white border-slate-300 dark:border-slate-600 shadow-slate-400 dark:shadow-slate-700 "
                  {...register("confirmPassword", { required: true })}
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] cursor-pointer dark:text-white"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} />
                  ) : (
                    <AiOutlineEye fontSize={24} />
                  )}
                </span>
                {errors.confirmPassword && (
                  <span className="ml-2 text-sm text-red-500">
                    Confirm Your password
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary py-2 rounded-xl mt-2 font-semibold hover:opacity-85 transition-all duration-200 cursor-pointer"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
