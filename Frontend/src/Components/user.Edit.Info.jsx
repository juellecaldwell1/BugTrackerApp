import axios from "axios";
import { useState, useEffect } from "react";
import { Popup } from "reactjs-popup";
import { Bounce, ToastContainer, toast } from "react-toastify";
import FireworkButton from "./Button Designs/button.Design";
import { motion } from "framer-motion";
import LoggedInRightNow from "./whosLoggedIn.jsx";

const EditUserPopup = ({ item, fetchUsers, users }) => {
  const [updateData, setUpdateData] = useState({
    givenName: "",
    familyName: "",
    email: "",
    fullName: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isManager, setIsManager] = useState(false);
  const [person, setPerson] = useState([]);

  const { user, getMe, loading } = LoggedInRightNow();

  useEffect(() => {
    if (user) {
      setPerson(user.role);
    } else if (loading) {
      console.log(
   
      );
    }
  }, [loading, user]);

  const UpdateUserInformation = async (id, userGivenName) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/user/${id}`,
        {
          givenName: updateData.givenName,
          familyName: updateData.familyName,
          email: updateData.email,
          fullName: updateData.fullName,
          role: updateData.role,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log(`${userGivenName} has made an update`);
        toast.success("You have updated the user");
        fetchUsers();

        setError("");
        setSuccess("User updated successfully");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
        setError(error.response.data.error);
      } else {
        toast.error("Error updating user");
        setError("Network Error");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    setUpdateData({
      givenName: item.givenName,
      familyName: item.familyName,
      email: item.email,
      fullName: item.fullName,
      role: item.role,
    });
    // setIsManager(item.role === "Technical Manager");
  }, [item]);

  const handleUpdateValue = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {!person.includes("Technical Manager") && null}

      {person.includes("Technical Manager") && (
        <>
          <FireworkButton
            name="Edit User"
            content={
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-2xl p-8 space-y-8 max-w-2xl mx-auto">
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-center">
                  Edit {item.givenName}'s Profile
                </h2>

                {/* Warning for non-Technical Managers */}
                {!isManager && (
                  <motion.div
                    className="bg-yellow-100 text-yellow-700 p-4 rounded-lg shadow-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <strong>Warning:</strong> Only a Technical Manager can edit
                    user roles.
                  </motion.div>
                )}

                <form className="space-y-6">
                  {/* First Name */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Change First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="givenName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out"
                      value={updateData.givenName}
                      onChange={handleUpdateValue}
                      placeholder="Enter first name"
                    />
                  </motion.div>

                  {/* Last Name */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Change Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="familyName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out"
                      value={updateData.familyName}
                      onChange={handleUpdateValue}
                      placeholder="Enter last name"
                    />
                  </motion.div>

                  {/* Full Name */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Change Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out"
                      value={updateData.fullName}
                      onChange={handleUpdateValue}
                      placeholder="Enter full name"
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Change Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out"
                      value={updateData.email}
                      onChange={handleUpdateValue}
                      placeholder="Enter email"
                    />
                  </motion.div>

                  {/* Role */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="space-y-2">
                      <label
                        htmlFor="AssigningOfRole"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Assign Role
                      </label>
                      <select
                        id="AssigningOfRole"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out"
                        value={updateData.role}
                        onChange={handleUpdateValue}
                        name="role"
                      >
                        <option value={updateData.role}>
                          Selected Role: {updateData.role}
                        </option>
                        <option value="Developer">Developer</option>
                        <option value="Business Analyst">
                          Business Analyst
                        </option>
                        <option value="Quality Analyst">Quality Analyst</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="Technical Manager">
                          Technical Manager
                        </option>
                      </select>
                    </div>
                  </motion.div>

                  {/* Save Button */}
                  <motion.div
                    className="flex justify-center mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <button
                      type="button"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      onClick={() =>
                        UpdateUserInformation(item._id, updateData)
                      }
                    >
                      Save Changes
                    </button>
                  </motion.div>
                </form>
              </div>
            }
          />
        </>
      )}
    </>
  );
};

export default EditUserPopup;
