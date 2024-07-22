import React, { useState } from "react";
import Footer from "../components/common/Footer";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../services/operations/authAPI";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const submitLogin = async (data) => {
    dispatch(login(data, navigate));
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
        <div className="w-[27rem] flex flex-col items-center justify-center -mt-[100px] p-5">
          <p className="text-5xl font-bold dark:text-white text-center">
            Welcome Back
          </p>
          <form
            onSubmit={handleSubmit(submitLogin)}
            className="flex flex-col mt-5 md:p-5 w-full gap-5"
          >
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

            <button
              type="submit"
              disabled={loading}
              className="bg-primary py-2 rounded-xl mt-2 font-semibold hover:opacity-85 transition-all duration-200 cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
