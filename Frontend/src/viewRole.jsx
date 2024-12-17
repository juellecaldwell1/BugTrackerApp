import Popup from "reactjs-popup";
import LoggedInRightNow from "./Components/whosLoggedIn.jsx";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; 

const ViewRole = () => {
  const [person, setPerson] = useState([]);

  const { user, getMe, loading } = LoggedInRightNow();

  useEffect(() => {
    if (user) {
      setPerson(user.role);
    } else if (loading) {
      console.log();
    }
  }, [loading, user]);

  return (
    <Popup
      trigger={
        <a className="text-base font-medium text-gray-900 hover:text-gray-500">
          View Role
        </a>
      }
      position="left center"
      contentStyle={{
        background: "linear-gradient(145deg, #f0f4f8, #cfd9e0)", 
        padding: "30px",
        border: "none",
        borderRadius: "12px", 
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
        width: "380px",
        maxHeight: "500px",
        overflowY: "auto",
        animation: "fadeIn 0.3s ease-in-out",
        transition: "transform 0.3s ease-out",
      }}
      overlayStyle={{
        background: "rgba(0, 0, 0, 0.7)", 
        backdropFilter: "blur(8px)", 
      }}
      closeOnDocumentClick={false}
      closeOnEscape={true}
    >
      {(close) => (
        <motion.div
          className="animate-slideIn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            {person.includes("Developer") && (
              <div className="text-xl font-semibold text-gray-800 mb-3">
                <span className="text-teal-600">Developer</span> Role Description
              </div>
            )}
            {person.includes("Business Analyst") && (
              <div className="text-xl font-semibold text-gray-800 mb-3">
                <span className="text-teal-600">Business Analyst</span> Role Description
              </div>
            )}
            {person.includes("Quality Analyst") && (
              <div className="text-xl font-semibold text-gray-800 mb-3">
                <span className="text-teal-600">Quality Analyst</span> Role Description
              </div>
            )}
            {person.includes("Product Manager") && (
              <div className="text-xl font-semibold text-gray-800 mb-3">
                <span className="text-teal-600">Product Manager</span> Role Description
              </div>
            )}
            {person.includes("Technical Manager") && (
              <div className="text-xl font-semibold text-gray-800 mb-3">
                <span className="text-teal-600">Technical Manager</span> Role Description
              </div>
            )}

            {person.includes("Developer") && (
              <p className="text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 ease-in-out">
                You can view bugs, create new bugs, edit bugs assigned to you, reassign bugs assigned to you, add comments, and log hours on bugs.
              </p>
            )}

            {person.includes("Business Analyst") && (
              <p className="text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 ease-in-out">
                You can view bugs, create new bugs, edit any bug, close any bug, classify any bug, reassign any bug, edit bugs assigned to you, add comments, assign steps to fix, and log hours on bugs.
              </p>
            )}

            {person.includes("Quality Analyst") && (
              <p className="text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 ease-in-out">
                You can view bugs, create new bugs, edit bugs assigned to you, reassign bugs assigned to you, add comments, add test cases, edit test cases, delete test cases, and log hours on bugs.
              </p>
            )}

            {person.includes("Product Manager") && (
              <p className="text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 ease-in-out">
                You can view bugs, create new bugs, edit bugs assigned to you, reassign bugs assigned to you, add comments, and log hours on bugs.
              </p>
            )}

            {person.includes("Technical Manager") && (
              <p className="text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 ease-in-out">
                You can view bugs, create new bugs, edit any user's details, assign roles, reassign any bug, delete bugs, assign steps to fix, add comments, and log hours on bugs.
              </p>
            )}
          </div>
          
          <button
            className="p-2 rounded-full transition-all duration-300 ease-in-out 
            hover:bg-red-600 hover:shadow-lg hover:shadow-red-600/50
            focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 mt-6"
            aria-label="Close"
            onClick={close}
          >
            <p className="w-6 h-6 text-gray-600 hover:text-white">X</p>
          </button>
        </motion.div>
      )}
    </Popup>
  );
};

export default ViewRole;
