import { useEffect, useState } from "react";
import { ClockIcon } from "lucide-react";
import Popup from "reactjs-popup";
import axios from "axios";
import { toast } from "react-toastify";
const CountHours = ({ fetch, items }) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [hours, setHours] = useState({
    timeLogged: 0,
  });
  const [error , setError] = useState("");

  const handleTimeLogged = async (id) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/bug/${id}/time`,
        {
          timeLogged: hours.timeLogged,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("You have successfully Logged you time for this bug");
        setHours({ timeLogged: 0})
        fetch();
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

  const sum = items.timeLogged.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0); 

  return (
    <>
      <Popup
        trigger={
          <button>
            <ClockIcon onClick={() => {}} />
          </button>
        }
        position="left center"
        contentStyle={{
          background: "#f1f1f1",
          padding: "20px",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        overlayStyle={{
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
        }}
        closeOnDocumentClick={false}
        closeOnEscape={true}
      >
        {(close) => (
          <>
            <>
              <div className="flex justify-center items-center  bg-gradient-to-br from-purple-500 to-purple-600 p-4">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                  <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Time Logger
                  </h2>
                  <form className="space-y-4">
                    <div className="relative">
                      <input
                        type="number"
                        value={hours.timeLogged}
                        onChange={(e) =>
                            setHours((prev) => ({ ...prev, timeLogged: parseFloat(e.target.value) }))
                          }
                        placeholder="Enter hours logged"
                        step="0.01"
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleTimeLogged(items._id)
                      }}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                    >
                      Log Time
                    </button>
                  </form>
                  <div className="mt-8 text-center">
                    <h2 className="text-lg font-semibold mb-2 text-gray-700">
                      Total Time Logged
                    </h2>
                    <div className="text-5xl font-bold text-blue-600">
                      {sum}
                    </div>
                    <p className="text-gray-600 mt-2">{ sum === 1 ? "Hour" : "Hours"}</p>
                  </div>
                </div>
              </div>
            </>
            <button
              className="p-2 rounded-full transition-all duration-300 ease-in-out 
            hover:bg-red-600 hover:shadow-lg hover:shadow-red-600/50
            focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              aria-label="Close"
              onClick={close}
            >
              <p className="w-6 h-6 text-gray-600 hover:text-white">X</p>
            </button>
          </>
        )}
      </Popup>
    </>
  );
};

export default CountHours;
