import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Popup from "reactjs-popup";
import LoggedInRightNow from "../Components/whosLoggedIn.jsx";

const DeleteBugTestCase = ({ testId, bugId, testInformation }) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDeleteTestCase = async () => {
    try {
      const response = await axios.delete(
        `${apiUrl}/api/bug/${bugId._id}/test/${testId._id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Test case deleted successfully");
        setError("");
        setSuccess("Deleted successfully");
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

      {person.includes("Quality Analyst") && (
        <>
          <Popup
            trigger={
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                Delete
              </button>
            }
            position="center"
            contentStyle={{
              background: "#f1f1f1",
              padding: "20px",
              border: "none",
            }}
            overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
            closeOnDocumentClick={false}
            closeOnEscape={true}
          >
            {(close) => (
              <>
                <div className="text-center">
                  <h4>Are you sure you want to delete this Test Case?</h4>
                  <div className="mt-3">
                    <button
                      className="btn btn-danger me-3"
                      onClick={() => {
                        handleDeleteTestCase();
                        close();
                      }}
                    >
                      Yes
                    </button>
                    <button className="btn btn-secondary" onClick={close}>
                      No
                    </button>
                  </div>
                </div>
              </>
            )}
          </Popup>
        </>
      )}
    </>
  );
};

export default DeleteBugTestCase;
