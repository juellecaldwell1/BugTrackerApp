import React from "react";
import Popup from "reactjs-popup";

const FireworkButton = ({ name, content }) => {
  return (
    <Popup
      trigger={
        <button className="border-2 border-black text-black duration-300 relative group cursor-pointer overflow-hidden h-10 w-40 rounded-md bg-white p-2 font-extrabold hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50">
          <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-700 right-12 top-12 bg-purple-600" />
          <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150 duration-700 right-20 -top-6 bg-white" />
          <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8 rounded-full group-hover:scale-150 duration-700 right-32 top-6 bg-purple-400" />
          <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-4 h-4 rounded-full group-hover:scale-150 duration-700 right-2 top-12 bg-white" />
          <p className="z-10 absolute bottom-2 left-2 text-black">{name}</p>
        </button>
      }
      position="center"
      contentStyle={{
        background: "#f1f1f1",
        padding: "20px",
        border: "none",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        animation: "fadeIn 0.3s ease-in-out",
      }}
      overlayStyle={{
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(5px)",
      }}
      closeOnDocumentClick={false}
      closeOnEscape={true}

    >
      {(close) => (
        <div className="animate-slideIn">
          {content}
          <button
            className="p-2 rounded-full transition-all duration-300 ease-in-out 
            hover:bg-red-600 hover:shadow-lg hover:shadow-red-600/50
            focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 mt-4"
            aria-label="Close"
            onClick={close}
          >
            <p className="w-6 h-6 text-gray-600 hover:text-white">X</p>
          </button>
        </div>
      )}
    </Popup>
  );
};

export default FireworkButton;