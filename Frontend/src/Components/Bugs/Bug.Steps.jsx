import "bootstrap/dist/css/bootstrap.min.css";
import { Popup } from "reactjs-popup";
import { motion } from "framer-motion";

const BugSteps = ({ info, fetch }) => {
  return (
    <div className="absolute top-0 right-0">
      <Popup
        trigger={
          <button className="flex items-center justify-between bg-purple-600 px-4 py-2 rounded-full text-white font-semibold shadow-md hover:bg-purple-700 hover:scale-105 transition-transform duration-300 ease-in-out hover:ring-2 hover:ring-purple-400">
            Steps To Fix Bug
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 ml-2 animate-bounce"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </button>
        }
        position="center"
        contentStyle={{
          background: "none",
          padding: "0",
          border: "none",
        }}
        overlayStyle={{
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(10px)",
        }}
        closeOnDocumentClick={false}
        closeOnEscape={true}
      >
        {(close) => (
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto text-gray-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-bold text-purple-600 mb-4">
              Steps To Fix
            </h2>
            <p className="text-sm text-gray-600 whitespace-pre-line mb-6">
              {info.stepsToFix || "No steps provided."}
            </p>
            <button
              className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Close"
              onClick={close}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M6.225 6.225a.75.75 0 011.06 0L12 10.94l4.715-4.715a.75.75 0 011.06 1.06L13.06 12l4.715 4.715a.75.75 0 11-1.06 1.06L12 13.06l-4.715 4.715a.75.75 0 01-1.06-1.06L10.94 12 6.225 7.285a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </Popup>
    </div>
  );
};

export default BugSteps;
