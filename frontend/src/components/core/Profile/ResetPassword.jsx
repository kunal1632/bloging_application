import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { changePassword } from "../../../services/operations/authAPI";
import { setLoading } from "../../../slices/authSlice";

const ResetPassword = () => {
  const { token, loading } = useSelector((state) => state.auth);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setshowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    try {
      const response = await changePassword(data, token);
    } catch (error) {
      console.log("Error while updating the password");
    }

    dispatch(setLoading(false));
  };
  return (
    <div className="flex flex-col md:flex-row justify-between border-[1px] border-slate-500 rounded-xl mt-10 bg-slate-300 dark:bg-slate-800 p-5 gap-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-5"
      >
        {/* old password */}
        <div className="flex flex-col gap-1 md:w-[calc(50%-10px)] relative">
          <label className="text-md dark:text-white" htmlFor="oldPassword">
            Old Password<sup className="text-red-500">*</sup>
          </label>
          <input
            id="oldPassword"
            type={showOldPass ? "text" : "password"}
            placeholder="Enter Your Current Password"
            className="w-full  px-3 py-2 rounded-xl border shadow-md bg-slate-100 dark:bg-slate-900 dark:text-white border-slate-300 dark:border-slate-600 shadow-slate-400 dark:shadow-slate-700 "
            {...register("oldPassword", { required: true })}
          />
          <span
            onClick={() => setShowOldPass((prev) => !prev)}
            className="absolute right-3 top-[38px] cursor-pointer dark:text-white"
          >
            {showOldPass ? (
              <AiOutlineEyeInvisible fontSize={24} />
            ) : (
              <AiOutlineEye fontSize={24} />
            )}
          </span>
          {errors.oldPassword && (
            <span className="ml-2 text-sm text-red-500">
              Old Passowrd is required
            </span>
          )}
        </div>
        {/* new password */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col gap-1 md:w-1/2 relative">
            <label className="text-md dark:text-white" htmlFor="newPassword">
              New Password<sup className="text-red-500">*</sup>
            </label>
            <input
              id="newPassword"
              type={showNewPass ? "text" : "password"}
              placeholder="Enter Your New Password"
              className="w-full  px-3 py-2 rounded-xl border shadow-md bg-slate-100 dark:bg-slate-900 dark:text-white border-slate-300 dark:border-slate-600 shadow-slate-400 dark:shadow-slate-700 "
              {...register("newPassword", { required: true })}
            />
            <span
              onClick={() => setshowNewPass((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer dark:text-white"
            >
              {showNewPass ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>
            {errors.newPassword && (
              <span className="ml-2 text-sm text-red-500">
                New Passowrd is required
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 md:w-1/2 relative">
            <label
              className="text-md dark:text-white"
              htmlFor="confirmNewPassword"
            >
              Confirm Password<sup className="text-red-500">*</sup>
            </label>
            <input
              id="confirmNewPassword"
              type={showConfirmPass ? "text" : "password"}
              placeholder="Enter Your Current Password"
              className="w-full  px-3 py-2 rounded-xl border shadow-md bg-slate-100 dark:bg-slate-900 dark:text-white border-slate-300 dark:border-slate-600 shadow-slate-400 dark:shadow-slate-700 "
              {...register("confirmNewPassword", { required: true })}
            />
            <span
              onClick={() => setShowConfirmPass((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer dark:text-white"
            >
              {showConfirmPass ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>
            {errors.confirmNewPassword && (
              <span className="ml-2 text-sm text-red-500">
                Confirm Passowrd is required
              </span>
            )}
          </div>
        </div>

        <div className="flex w-full justify-end mt-2">
          <button
            type="submit"
            className="bg-primary py-2 px-4 rounded-xl mt-2 font-semibold hover:opacity-85 transition-all duration-200 cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
