import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../services/operations/profileAPI";
import { formattedDate } from "../utils/formatDate";
import ResetPassword from "../components/core/Profile/ResetPassword";
import { setLoading } from "../slices/authSlice";
import DeleteAccount from "../components/core/Profile/DeleteAccount";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { token, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      try {
        const res = await getUserData(token);
        setUserData(res);
      } catch (error) {
        console.log("Error while fetching user data");
      }
      dispatch(setLoading(false));
    })();
  }, [token]);

  if (loading) {
    return (
      <div className="flex w-full h-[calc(100vh-4rem)] items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="w-11/12 md:w-2/3 mx-auto">
      <div className="mt-10">
        <h1 className="dark:text-white font-semibold text-2xl md:text-4xl">
          Your Profile
        </h1>
        <p className="text-sm text-slate-500">View your or make some changes</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between border-[1px] border-slate-500 rounded-xl mt-10 bg-slate-300 dark:bg-slate-800 p-5 gap-5">
        <div className="flex flex-col gap-5 ">
          <div>
            <p className="text-xs text-slate-500">Name</p>
            <p className="dark:text-white font-semibold">
              {userData?.firstName} {userData?.lastName}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Joined From</p>
            <p className="dark:text-white font-semibold">
              {formattedDate(userData?.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 ">
          <div>
            <p className="text-xs text-slate-500">Email</p>
            <p className="dark:text-white font-semibold">{userData?.email}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Number of Blogs</p>
            <p className="dark:text-white font-semibold">
              {userData?.blogs.length}
            </p>
          </div>
        </div>
      </div>

      <ResetPassword />

      <DeleteAccount />
    </div>
  );
};

export default Profile;
