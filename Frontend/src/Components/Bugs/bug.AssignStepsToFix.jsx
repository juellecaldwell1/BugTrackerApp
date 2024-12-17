import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import LoggedInRightNow from "../whosLoggedIn.jsx";

const StepsToFixBug = ({ steps, fetch }) => {

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [step, setStep] = useState("");

  const UpdateBugInformation = async (id) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/bug/${id}/steps`,
        {
          stepsToFix: step,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Added Steps to fix successfully");
        fetch();
        setStep("");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Network Error try again");
      }
      console.log(
        "there was an problem trying to assign steps to fix the bug for the bug",
        error.message
      );
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

  return (
    <>
      {!person.includes("Technical Manager") && null}

      {person.includes("Technical Manager") && (
        <>
          <div>
            <label htmlFor="stepsToFix" className="text-sm text-gray-200">
              Steps to Fix
            </label>
            <textarea
              className="form-input w-full mt-1 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              id="stepsToFix"
              name="stepsToFix"
              placeholder="Suggested steps to fix the issue"
              value={step}
              onChange={(e) => {
                setStep(e.target.value);
              }}
            />
          </div>
          <div className="absolute right-10">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg w-44 "
              onClick={(e) => {
                e.preventDefault();
                UpdateBugInformation(steps._id);
              }}
            >
              Add Steps
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default StepsToFixBug;
