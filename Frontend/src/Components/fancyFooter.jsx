"use client";

import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTwitter, FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";

const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const creatorName = "Juelle Caldwell";
  const socialLinks = [
    { icon: FaTwitter, url: "https://twitter.com/janedoe", label: "Twitter" },
    { icon: FaGithub, url: "https://github.com/janedoe", label: "GitHub" },
    {
      icon: FaLinkedin,
      url: "https://linkedin.com/in/janedoe",
      label: "LinkedIn",
    },
  ];

  if(
    location.pathname !== "/user/profile" && 
    location.pathname !== "/user/list" &&
    location.pathname !== "/bug/report" &&
    location.pathname !== "/bug/list" && 
    location.pathname !== "/"
    )
    {
      return null
    }

  return (
    <footer className="footer">
      <footer className="relative bg-gradient-to-br from-gray-300 via-gray-300 to-gray-300 text-black py-10">

        <div className="absolute top-0 left-0 w-full overflow-hidden"></div>

        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <motion.div
              className="animate-fade-in-up"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4 border-b-2 border-yellow-400 pb-1 w-max hover:border-yellow-600 transition">
                About Us
              </h3>
              <p className="text-gray-950 leading-loose">
                Im passionate about creating amazing web experiences.My
                mission is to deliver innovative solutions that make a
                difference in the Developer World.
              </p>
            </motion.div>

            <motion.div
              className="animate-fade-in-up"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4 border-b-2 border-yellow-400 pb-1 w-max hover:border-yellow-600 transition">
                Quick Links
              </h3>
              <ul className="space-y-2 underline">
                {[
                  { name: "Users", path: "/user/list" },
                  { name: "Bugs", path: "/bug/list" },
                  { name: "Create Bug", path: "/bug/new" },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="transform transition-transform duration-300 hover:translate-x-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Link
                      to={item.path}
                      className="text-black hover:text-white"
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="animate-fade-in-up"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4 border-b-2 border-yellow-400 pb-1 w-max hover:border-yellow-600 transition">
                Connect With Me
              </h3>
              <div className="flex space-x-4 mt-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="bg-gray-300 bg-opacity-10 p-3 rounded-full transition-all duration-300 hover:bg-yellow-400 hover:text-gray-900 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    <link.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-sm text-gray-950 mb-4 md:mb-0">
              &copy; {currentYear} JuelleCo. All rights reserved.
            </p>
            <p className="text-sm text-gray-900 flex items-center">
              Created with{" "}
              <FaHeart className="text-red-500 mx-1 animate-pulse" /> by{" "}
              {creatorName}
            </p>
          </motion.div>
        </div>
      </footer>
    </footer>
  );
};
export default Footer;
