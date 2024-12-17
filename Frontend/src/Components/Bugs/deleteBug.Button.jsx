import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoggedInRightNow from "../whosLoggedIn.jsx";
import RefreshBugs from "../RefreshData/refreshBugList.jsx";
import SuccessUpdates from "./update.Bugs.ToCurrent.jsx";
const DeleteBug = ({ id }) => {
  const [errors, setError] = useState("");
  const [disabled, setDisable] = useState(false);
  const {fetchBugs} = SuccessUpdates()

  const handleBugDeletion = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/bug/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("You have successfully deleted this the bug");
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
      {!person.includes("Technical Manager") && null}

      {person.includes("Technical Manager") && (
        <>
          <Link to={"/bug/list"}>
            <button
              className="bg-purple-600 hover:bg-red-700 text-white px-5 py-2 rounded-md flex items-center gap-2"
              onClick={() => {
                handleBugDeletion();
              }}
              disabled={disabled}
            >
              Yes
            </button>
          </Link>
        </>
      )}
    </>
  );
};

export default DeleteBug;
