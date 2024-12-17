import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Popup from "reactjs-popup";
import LoggedInRightNow from "../Components/whosLoggedIn.jsx";

const CreateBugTestCase = ({ items, testInformation }) => {
  const [testCase, setTestCase] = useState({
    status: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const UpdateTestInformation = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/bug/${items._id}/test/new`,
        {
          status: testCase.status,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setError("");
        toast.success("You have successfully created the new Test Case");
        setSuccess("Bug classified successfully");
        setTestCase({ status: "" });
        testInformation();
      }
      if (response.status === 500) {
        setError("Error creating new Test Case");
        toast.error("You do not have permission to create a new test case");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        toast.error(error.response.data.error);
      } else {
        setError("Network Error");
        toast.error("Network Error, try again");
      }
      toast.error(error);
    }
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

  const handleUpdateValue = (e) => {
    setTestCase({
      ...testCase,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {!person.includes("Quality Analyst") && null}

      {person.includes("Quality Analyst") && (
        <>
          <Popup
            trigger={
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                Create New
              </button>
            }
            position="center"
            contentStyle={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              width: "400px",
            }}
            overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
            closeOnDocumentClick={false}
            closeOnEscape={true}
          >
            {(close) => (
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="description"
                    className="text-gray-700 font-medium"
                  >
                    Create New Test Case
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="description"
                    name="status"
                    placeholder="Type something"
                    value={testCase.status}
                    onChange={handleUpdateValue}
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex justify-between items-center">
                  <button
                    className="px-6 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600 transition"
                    onClick={() => {
                      UpdateTestInformation();
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={close}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </>
      )}
    </>
  );
};

export default CreateBugTestCase;
