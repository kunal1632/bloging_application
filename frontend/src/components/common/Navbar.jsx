import React, { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link, matchPath, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.svg";
import { IoMenu, IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";

const navLinks = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Create Blog", path: "/create-post" },
  { id: 3, name: "My Blogs", path: "/my-blogs" },
  { id: 4, name: "Profile", path: "/profile" },
];

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    dispatch(logout(navigate));
  };
  return (
    <header className="sticky top-0 z-[20] mx-auto flex w-full px-5 items-center justify-between border-b-[1px] border-gray-500 p-2 md:flex-nowrap flex-wrap dark:bg-slate-950">
      <Link to="/">
        <img
          src={logo}
          width={45}
          alt="logo"
          className="dark:bg-white rounded-full"
        />
      </Link>

      {/* nav bar links */}
      <div className="hidden md:flex ml-40  w-full ">
        <div className="flex gap-5 w-full items-center justify-center">
          {navLinks.map((item) => (
            <NavLink to={item.path} key={item.id}>
              <p
                className={`${
                  matchRoute(item?.path)
                    ? "text-primary font-semibold"
                    : " dark:text-white"
                } cursor-pointer hover:scale-105 transition-transform duration-200 `}
              >
                {item.name}
              </p>
            </NavLink>
          ))}
        </div>

        {/* buttons for logout, login and signup  */}
        {token ? (
          <div>
            <button
              onClick={logoutHandler}
              className="bg-gray-300 px-2 py-1 rounded-lg cursor-pointer hover:opacity-80 transition-all duration-200 text-black w-20 flex items-center justify-center dark:bg-gray-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-x-4 ">
            <Link
              to="/login"
              className="bg-gray-300 px-2 py-1 rounded-lg cursor-pointer hover:opacity-80 transition-all duration-200 text-black w-20 flex items-center justify-center dark:bg-gray-200"
            >
              <p className=" dark:text-black">Login</p>
            </Link>

            <Link
              to="/signup"
              className="bg-primary px-2 py-1 rounded-lg cursor-pointer hover:opacity-80 transition-all duration-200 text-black w-20 flex items-center justify-center"
            >
              <p className=" dark:text-black">Signup</p>
            </Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="ml-5">{<ThemeSwitcher />}</div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleNavbar} className="text-2xl dark:text-white">
            {isOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col items-center basis-full ">
          {navLinks.map((item) => (
            <NavLink to={item.path} key={item.id}>
              <p
                className={`${
                  matchRoute(item?.path)
                    ? "text-primary font-semibold"
                    : " dark:text-white"
                } cursor-pointer hover:scale-105 transition-all duration-200`}
              >
                {item.name}
              </p>
            </NavLink>
          ))}

          {token !== null && (
            <div>
              <button
                onClick={logoutHandler}
                className="bg-gray-300 px-2 py-1 rounded-lg cursor-pointer hover:opacity-80 transition-all duration-200 text-black w-20 flex items-center justify-center dark:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
          {token === null && (
            <div className="flex flex-col items-center justify-center gap-y-4 w-full mt-3">
              <Link
                to="/login"
                className="bg-gray-300 px-2 py-1 rounded-lg cursor-pointer hover:opacity-80 transition-all duration-200 text-black w-1/2 flex items-center justify-center dark:bg-gray-200"
              >
                <p className=" dark:text-black">Login</p>
              </Link>

              <Link
                to="/signup"
                className="bg-primary px-2 py-1 rounded-lg cursor-pointer hover:opacity-80 transition-all duration-200 text-black w-1/2 flex items-center justify-center"
              >
                <p className=" dark:text-black">Signup</p>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
