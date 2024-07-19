import React, { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link, matchPath, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.svg";
import { IoMenu, IoClose } from "react-icons/io5";

const navLinks = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Create Blog", path: "/create-post" },
  { id: 2, name: "My Blogs", path: "/my-blogs" },
  { id: 3, name: "Profile", path: "/profile" },
];

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="sticky top-0 z-[20] mx-auto flex w-full px-5 items-center justify-between border-b-[1px] border-gray-500 p-2 md:flex-nowrap flex-wrap">
      <Link to="/">
        <img
          src={logo}
          width={45}
          alt="logo"
          className="dark:bg-white rounded-full"
        />
      </Link>

      {/* nav bar links */}
      <div className="hidden md:flex   w-full ">
        <div className="flex gap-5 w-full items-center justify-center">
          {navLinks.map((item) => (
            <NavLink to={item.path}>
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
        </div>

        {/* buttons for logout, login and signup  */}
        {token ? (
          <div></div>
        ) : (
          <div className="flex items-center justify-center gap-x-4 ">
            <div className="bg-gray-300 px-2 py-1 rounded-lg cursor-pointer hover:opacity-80 transition-all duration-200 text-black w-20 flex items-center justify-center dark:bg-gray-200">
              <Link to="/login">
                <p className=" dark:text-black">Login</p>
              </Link>
            </div>
            <div className="bg-primary px-2 py-1 rounded-lg cursor-pointer hover:opacity-80 transition-all duration-200 text-black w-20 flex items-center justify-center">
              <Link to="/signup">
                <p className=" dark:text-black">Signup</p>
              </Link>
            </div>
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
            <NavLink to={item.path}>
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
        </div>
      )}
    </header>
  );
};

export default Navbar;
