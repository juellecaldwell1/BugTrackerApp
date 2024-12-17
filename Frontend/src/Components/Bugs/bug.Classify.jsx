import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import LoggedInRightNow from "../whosLoggedIn.jsx";
import SuccessUpdates from "./update.Bugs.ToCurrent.jsx";

const ClassifyBug = ({ bringItems, fetch }) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [classification, setClassification] = useState({
    classification: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const UpdateBugInformation = async (id) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/bug/${id}/classify`,
        {
          classification: classification.classification,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setError("");
        toast.success("You have successfully updated the bug");
        setSuccess("Bug classified successfully");
        fetch();
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

  const { user, loading } = LoggedInRightNow();

  useEffect(() => {
    if (user) {
      setPerson(user.role);
    } else if (loading) {
      console.log("You are now loading");
    }
  }, [loading, user]);

  const handleUpdateValue = (e) => {
    setClassification({
      ...classification,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setClassification({
      classification: bringItems.classification,
    });
  }, [bringItems]);

  return (
    <>
      {!person.includes("Business Analyst") && null}
      {person.includes("Business Analyst") && (
        <>
          <div className="container">
            <figure className="text-end justify-content-start">
              <br />
              <br />
              <figcaption className="blockquote-footer">
                {/* PS:{" "} */}
                <cite title="Source Title" className="text-white">Classify Bug Here:</cite>
              </figcaption>
            </figure>
            <div className="container mt-3">
              <label htmlFor="classification" className="form-label"></label>
              <select
                className="form-select"
                value={classification.classification}
                name="classification"
                onChange={handleUpdateValue}
              >
                <option value="">Classification: All</option>
                <option value="Approved">Approved</option>
                <option value="Unapproved">UnApproved</option>
                <option value="Duplicate">Duplicate</option>
                <option value="Rejected">Rejected</option>
                <option value="unClassified">Unclassified</option>
              </select>
            </div>
            <br />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                UpdateBugInformation(bringItems._id);
              }}
            >
              Classify
            </button>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
          </div>
        </>
      )}
    </>
  );
};

export default ClassifyBug;
