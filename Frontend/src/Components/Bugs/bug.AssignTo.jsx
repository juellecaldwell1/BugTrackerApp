import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react";
import LoggedInRightNow from "../whosLoggedIn.jsx";
import { ToastContainer, toast } from "react-toastify";
import Users from "../RefreshData/refreshUserList.jsx";

const AssignBug = ({ bringItems, fetch }) => {
  const [assignedTo, setAssignedTo] = useState({
    assignedTo: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/list", {
        withCredentials: true,
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const UpdateBugInformation = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/bug/${id}/assign`,
        {
          assignedTo: assignedTo.assignedTo,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setError("");
        toast.success("You have successfully assigned the bug");
        setSuccess("Bug assigned successfully");
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

  const { user, getMe, loading } = LoggedInRightNow();

  useEffect(() => {
    if (user) {
      setPerson(user.role);
    } else if (loading) {
      console.log("You are now loading");
    }
  }, [loading, user]);

  const handleUpdateValue = (e) => {
    setAssignedTo({
      ...assignedTo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>

      {(person.includes("Business Analyst") || person.includes("Technical Manager")) && (
        <>
          <div className="container">
            <figure className="text-end justify-content-start">
              <br />
              <br />
              <figcaption className="blockquote-footer">

                <cite title="Source Title" className="text-white">
                 Assign bug To User
                </cite>
              </figcaption>
            </figure>
            <label htmlFor="assignedTo">Assign User</label>
            <select
              id="assignedTo"
              name="assignedTo"
              value={assignedTo.assignedTo}
              onChange={handleUpdateValue}
              className="form-select"
            >
              <option value="">Select User</option>
              {users.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.fullName}
                    {console.log(item._id)}
                  </option>
                );
              })}
            </select> 

            {/* {error && <p className="text-danger">{error}</p>} */}
            {success && <p className="text-success">{success}</p>}
            <br />
            <button
              onClick={() => UpdateBugInformation(bringItems._id)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              type="button"
            >
              Assign Bug
            </button>
          </div>
        </>
      )}
            {!person.includes("Business Analyst") || !person.includes("Technical Manager") && null}
    </>
  );
};

export default AssignBug;
