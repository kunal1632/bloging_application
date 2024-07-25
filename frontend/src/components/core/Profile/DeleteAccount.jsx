import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FiTrash2 } from "react-icons/fi";
import { deleteUser } from "../../../services/operations/profileAPI";
import { logout } from "../../../services/operations/authAPI";

const DeleteAccount = () => {
  const { token } = useSelector((state) => state.auth);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDeleteAccount() {
    setIsDeleting(true);
    try {
      dispatch(deleteUser(token, navigate));
      dispatch(logout(navigate));
    } catch (error) {
      console.log("Error while deleting user");
    }
  }
  return (
    <>
      <div className="my-10 flex flex-col md:flex-row gap-5 rounded-md border-[1px] border-red-300 dark:border-red-900 bg-red-200 dark:bg-red-950 p-8 px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-red-700">
          <FiTrash2 className="text-3xl text-red-200" />
        </div>
        <div className="flex flex-col space-y-2 w-full">
          <h2 className="text-lg font-semibold text-slate-200">
            Delete Account
          </h2>
          <div className=" text-pink-25">
            <p className="dark:text-slate-300">
              Would you like to delete account?
            </p>
            <p className="dark:text-slate-300">
              All your Blogs that you have posted will get deleted. And there
              will be no way to recover them
            </p>
          </div>
          <button
            disabled={isDeleting}
            className="w-fit cursor-pointer italic text-red-800 dark:text-red-300"
            onClick={handleDeleteAccount}
          >
            {isDeleting ? "Deleting..." : "I want to delete my account"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
