"use client";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBug, FaList, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { RiUserSmileLine } from "react-icons/ri";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import LoggedInRightNow from "./whosLoggedIn.jsx";
import LogOutNow from "./Logout/logout.Button.jsx";
import { useNavigate } from "react-router-dom";
import ViewRole from "../viewRole.jsx";

const menuItems = [
  { icon: <FaBug />, label: "New Bug", href: "/bug/report" },
  { icon: <FaList />, label: "Bug List", href: "/bug/list" },
  { icon: <FaUsers />, label: "User List", href: "/user/list" },
];

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading } = LoggedInRightNow();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [render, setRender] = useState(null);

  const handleLogout = () => {
    LogOutNow();
    navigate("/");
  };

  useEffect(() => {
    if (loading) {
      setRender("...Loading");
    } else if (user) {
      setRender(user.fullName);
    } else {
      setRender("User Not Found");
    }
  }, [loading, user]);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (
    location.pathname !== "/user/profile" &&
    location.pathname !== "/user/list" &&
    location.pathname !== "/bug/report" &&
    location.pathname !== "/bug/list"
  ) {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-transparent/0 backdrop-blur-md shadow-lg"
          : "bg-transparent/0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a
              href="/user/list"
              className="text-2xl font-bold text-purple-600 hover:text-purple-500 transition-colors"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Bug Tracker
              </motion.span>
            </a>
          </div>

          <nav className="hidden md:flex space-x-10">
            <AnimatePresence>
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium text-gray-500 hover:text-purple-500 group relative"
                  whileHover={{ scale: 1.1, color: "#6b46c1" }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                >
                  <span className="flex items-center">
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </AnimatePresence>
          </nav>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button className="group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <RiUserSmileLine className="mr-2 h-5 w-5 text-purple-600" />

                    <span>{render}</span>
                    <ChevronDownIcon
                      className={`ml-2 h-5 w-5 group-hover:text-gray-500 ${
                        open ? "text-gray-600" : "text-gray-300"
                      }`}
                      aria-hidden="true"
                    />
                  </Popover.Button>
                  <Transition
                    as={motion.div}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Popover.Panel className="absolute z-10 right-0 mt-3 px-2 w-screen max-w-xs sm:px-0">
                      <motion.div
                        className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0, scale: 0.9 },
                          visible: {
                            opacity: 1,
                            scale: 1,
                            transition: {
                              delayChildren: 0.1,
                              staggerChildren: 0.1,
                            },
                          },
                        }}
                      >
                        <motion.div
                          className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8"
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                        >
                          <a
                            href="/user/profile"
                            className="text-base font-medium text-gray-900 hover:text-gray-500"
                          >
                            Profile
                          </a>
                         <ViewRole/>
                          <a
                            className="text-base font-medium text-gray-900 hover:text-gray-700"
                            onClick={() => {
                              handleLogout();
                            }}
                          >
                            <FaSignOutAlt className="inline-block mr-2" />
                            Logout
                          </a>
                        </motion.div>
                      </motion.div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </motion.div>
            </button>
            <motion.div
              className="absolute top-0 left-0 w-64 h-full bg-gray-300 text-black z-50 p-4"
              initial={{ x: "-100%" }}
              animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-2 px-4 hover:bg-gray-700 rounded"
                >
                  {item.icon} {item.label}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
