import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Popup from "reactjs-popup";
import { motion } from "framer-motion";
import LoggedInRightNow from "../Components/whosLoggedIn.jsx";
const UpdateBugTestCase = ({ testId, bugId,testInformation }) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [testCase, setTestCase] = useState({
    status: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const UpdateTestInformation = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/bug/${bugId._id}/test/${testId._id}`,
        {
          status: testCase.status,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setError("");
        toast.success("You have successfully updated the bug");
        setSuccess("Bug classified successfully");
        testInformation();
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        toast.error(error.response.data.error);
      } else {
        setError("Network Error");
        toast.error("Network Error, try again");
      }
    }
  };

  useEffect(() => {
    if (testId) {
      setTestCase({ ...testId });
    }
  }, [testId]);

  const handleUpdateValue = (e) => {
    setTestCase({
      ...testCase,
      [e.target.name]: e.target.value,
    });
  };

  const [person, setPerson] = useState([]);

  const { user, getMe, loading } = LoggedInRightNow();

  useEffect(() => {
    if (user) {
      setPerson(user.role);
    } else if (loading) {
      console.log("You are now loading");
    }
  }, [loading, user]);

  return (
    <>
      {!person.includes("Quality Analyst") && null}

      {person.includes("Quality Analyst") && <>
      


      <Popup
        trigger={
          <motion.button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Update
          </motion.button>
        }
        position="center"
        contentStyle={{
          background: "#f1f1f1",
          padding: "20px",
          border: "none",
          borderRadius: "8px",
        }}
        overlayStyle={{
          background: "rgba(0, 0, 0, 0.5)",
          borderRadius: "8px",
        }}
        closeOnDocumentClick={false}
        closeOnEscape={true}
      >
        {(close) => (
          <motion.div
            className="container mt-3 space-y-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <label
              htmlFor="Description"
              className="text-lg font-semibold text-gray-700"
            >
              Update Test Case
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="description"
              name="status"
              placeholder="Enter the status of the test case"
              value={testCase.status}
              onChange={handleUpdateValue}
            />
            <div className="flex space-x-4">
              <motion.button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={() => {
                  UpdateTestInformation();
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Save
              </motion.button>
              <motion.button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={close}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        )}
      </Popup>
      </>}
    </>
  );
};

export default UpdateBugTestCase;
