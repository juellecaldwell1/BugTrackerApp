import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Popup from "reactjs-popup";
import CreateBugTestCase from "./new.TestCase.jsx";
import UpdateBugTestCase from "./update.TestCase";
import "./CSS/testcase.css";
import ConvertDate from "../Components/convertDate.jsx";
import DeleteBugTestCase from "./delete.TestCases.jsx";
import FireworkButton from "../Components/Button Designs/button.Design.jsx";
import { motion } from "framer-motion";
import LoggedInRightNow from "../Components/whosLoggedIn.jsx";

const BugTestCase = ({ items, fetch }) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [testCase, setTestCase] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


    const TestInformation = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/bug/${items._id}/test/list`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setTestCase(response.data);
          setError("");
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
    TestInformation();
  }, []);
  // if i add the testCases here then i would get a lot of request that spans into the 1000s range in about 2 minuetes

  return (
    <>
      <FireworkButton
        name="Test Cases"
        content={
          <motion.div
            className="p-4 bg-gray-100 rounded-lg shadow-lg max-w-2xl mx-auto space-y-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="overflow-y-scroll"
              style={{
                maxHeight: "400px",
              }}
            >
              <div className="">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 animate-slide-in">
                  Test Cases
                </h1>
              </div>
              <br />
              <br />
              {testCase.length > 0 ? (
                testCase.map((item) => (
                  <motion.div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md p-4 mb-4"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    <h3 className="text-lg font-semibold text-blue-600">
                      {item.status}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Created By:{" "}
                      <span className="font-medium text-gray-700">
                        {item.createdBy?.fullName || "Unknown User"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {ConvertDate(item.createdOn)}
                    </p>
                    <div className="flex justify-between mt-4 space-x-2">
                      <UpdateBugTestCase testId={item} bugId={items} testInformation={TestInformation} />
                      <DeleteBugTestCase testId={item} bugId={items} testInformation={TestInformation} />
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No test cases available.
                </p>
              )}
            </div>

            <div className="mt-4">
              <CreateBugTestCase items={items} testInformation={TestInformation} />
            </div>
          </motion.div>
        }
      />
    </>
  );
};

export default BugTestCase;
