import { useLocation } from "react-router-dom";
import CloseBug from "./closeBug.Button.jsx";
import DeleteBug from "./deleteBug.Button.jsx";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import LoggedInRightNow from "../whosLoggedIn.jsx";
import { useState, useEffect } from "react";
import RefreshBugs from "../RefreshData/refreshBugList.jsx";
const SingleBugInfo = () => {
  const location = useLocation();
  const {
    title,
    _id,
    description,
    stepsToReproduce,
    lastUpdated,
    createdOn,
    closed,
    classification,
    assignedTo,
    assignedOn,
    assignedBy
  } = location.state;

  const [person, setPerson] = useState([]);
  
  console.log("the assigned categorys are: ", assignedBy, assignedOn, assignedTo);

  const { user, getMe, loading } = LoggedInRightNow();
  const {FetchBugs} = RefreshBugs();

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

      <div class="relative  ... bg-gray-300">
        <div class="absolute left-0 top-0 h-16 w-16 ...">
          <Link to={"/bug/list"}>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md flex items-center gap-2">
              GO BACK
            </button>
          </Link>
        </div>
      </div>
      <div className="min-h-screen flex justify-center items-center bg-gray-300 h-90">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
          <h2 className="text-3xl font-bold mb-6">{title}</h2>
         
          <div className="space-y-4">
          <p className="text-gray-700">
              <span className="font-semibold">Assigned To:</span>{" "}
              {assignedTo && assignedTo[0] && assignedTo[0].fullName && assignedTo[0].fullName !== undefined ? assignedTo[0].fullName : "Never been assigned"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Assigned By:</span>{" "}
              {assignedBy.fullName ? assignedBy.fullName : "Never been assigned"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Assigned On:</span>{" "}
              {lastUpdated ? lastUpdated : "Never been updated"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Classified As:</span>{" "}
              <span
                className={` text-white px-3 py-1 rounded-full text-sm ml-1  ${
                  classification == "Unapproved"
                    ? "border-gray-700 bg-gray-700"
                    : classification == "Approved"
                    ? "border-green-700 bg-green-700"
                    : classification == "Duplicate"
                    ? "border-yellow-700 bg-yellow-700"
                    : classification == "Unclassified"
                    ? "border-blue-700 bg-blue-700"
                    : classification == "Rejected"
                    ? "border-red-700 bg-red-700"
                    : "border-black bg-black"
                }`}
              >
                {classification}
              </span>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Created:</span> {createdOn}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Updated:</span>{" "}
              {lastUpdated ? lastUpdated : "Never been updated"}
            </p>
          </div>
          <div className="mt-6 flex gap-4">
            {person.includes("Technical Manager") && (
              <>
                <Popup
                  trigger={
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md flex items-center gap-2 h-13">
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                      Delete Bug
                    </button>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                      <h2>Are you sure you want to delete this Bug?</h2>
                      <div className="mt-6 flex gap-4">
                        <DeleteBug id={_id} />
                        <button
                          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md flex items-center gap-2"
                          onClick={close}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </>
            )}
            <CloseBug id={_id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBugInfo;
