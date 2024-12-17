import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Popup } from "reactjs-popup";
import { Bounce, ToastContainer, toast } from "react-toastify";
import ClassifyBug from "./bug.Classify.jsx";
import AssignBug from "./bug.AssignTo.jsx";
import FireworkButton from "../Button Designs/button.Design.jsx";
import { motion } from "framer-motion";
import StepsToFixBug from "./bug.AssignStepsToFix.jsx";
import SuccessUpdates from "./update.Bugs.ToCurrent.jsx";

const MakeBugEdit = ({ items, fetch }) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [updateData, setUpdateData] = useState({
    title: "",
    description: "",
    stepsToReproduce: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [status, setStatus] = useState(null);

  const UpdateBugInformation = async (id) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/bug/${id}`,
        {
          title: updateData.title,
          description: updateData.description,
          stepsToReproduce: updateData.stepsToReproduce,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setError("");
        fetch()
        toast.success("Bug successfully updated");
        setSuccess("Bug updated successfully");
        setStatus(response.status);

      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        toast.error(error.response.data.error);
      } else {
        setError("Network Error");
        toast.error("Network Error try again");
      }
    }
  };

  // useEffect(() => {
  //   if (status === 200) {
  //     fetchBugs(); // Call the fetch function to refresh the bugs list
  //     console.log("Fetching updated data...");
  //   }
  // }, [status, fetchBugs]);
  

  useEffect(() => {
    setUpdateData({
      title: items.title,
      description: items.description,
      stepsToReproduce: items.stepsToReproduce,
      classification: items.classification,
      assignedTo: items.assignedTo,
      closed: items.closed,
      stepsToFix: items.stepsToFix,
    });
  }, [items]);

  const handleUpdateValue = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <FireworkButton
      name="Edit Bug"
      content={
        <motion.div
          className="p-4 bg-gradient-to-r from-purple-500 to-black rounded-md shadow-md text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium">Edit Bug Details</h3>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="title" className="text-sm text-gray-200">
                Bug Title
              </label>
              <input
                type="text"
                className="form-input w-full mt-1 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                id="title"
                name="title"
                placeholder="Bug Title"
                value={updateData.title}
                onChange={handleUpdateValue}
              />
            </div>

            <div>
              <label htmlFor="description" className="text-sm text-gray-200">
                Bug Description
              </label>
              <textarea
                className="form-input w-full mt-1 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                id="description"
                name="description"
                placeholder="Describe the issue"
                value={updateData.description}
                onChange={handleUpdateValue}
              />
            </div>

            <div>
              <label htmlFor="stepsToReproduce" className="text-sm text-gray-200">
                Steps to Reproduce
              </label>
              <textarea
                className="form-input w-full mt-1 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                id="stepsToReproduce"
                name="stepsToReproduce"
                placeholder="Steps to reproduce the issue"
                value={updateData.stepsToReproduce}
                onChange={handleUpdateValue}
              />
            </div>

            <StepsToFixBug steps={items} fetch={fetch} />

            <div className="flex gap-4">
              <button
                type="button"
                className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-200"
                onClick={() => {
                  UpdateBugInformation(items._id);
                }}
              >
                Save
              </button>

              <ClassifyBug bringItems={items} fetch={fetch} />
              <AssignBug bringItems={items} fetch={fetch} />
            </div>
          </form>
        </motion.div>
      }
    />
  );
};

export default MakeBugEdit;
