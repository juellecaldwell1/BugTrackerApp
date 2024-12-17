import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import LoggedInRightNow from "../whosLoggedIn.jsx";
import RefreshBugs from "../RefreshData/refreshBugList.jsx";
import SuccessUpdates from "./update.Bugs.ToCurrent.jsx";
const CloseBug = ({ id }) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [close, setClose] = useState(false);
  const [errors, setError] = useState("");
  const [disabled, setDisable] = useState(false);

  const {fetchBugs} = SuccessUpdates();


  // const {FetchBugs} = RefreshBugs();

  const handleBool = () => {
    setClose(!close);
    console.log(close);
    handleClosingBug();
  };
  const isClosed =
    close === false
      ? "Bug is now Open"
      : close === true
      ? "the bug is now Closed"
      : "error";

  const handleClosingBug = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/bug/${id}/close`,
        {
          closed: close,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success(isClosed);
        fetchBugs();
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        toast.error(error.response.data.error, {
          autoClose: 25000,
        });

        const disableButton = error.response.status === 403;
        setDisable(disableButton);
      } else {
        setError("Error closing bug");
        toast.error("Error closing bug");
      }
      console.log("There was an error closing the bug");
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
      {!person.includes("Business Analyst") && null}
      {person.includes("Business Analyst") && (
        <>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md flex items-center gap-2 h-13"
            onClick={() => {
              handleBool();
            }}
            disabled={disabled}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            CLOSE BUG
          </button>
          <div>
            <div className="h-21">
              {/* {errors && <p className="text-red-500">{errors}</p>} */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CloseBug;
