"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Popup } from "reactjs-popup";
import { useState, useRef, useEffect } from "react";
import "./Css/leaveAComment.css";
import {toast} from "react-toastify"


const CreateNewComment = ({ items, fetch, fetchComments}) => {


  const [comment, setComment] = useState({
    content: "",
  });
  const [error, setError] = useState("");

  const Comment = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/bug/${id}/comment/new`,
        {
          content: comment.content,
        },
        {
          withCredentials: true,
        }
      );
      // console.log("This is the item info for an new comment: " ,items);
      if (response.status === 200) {
        setComment(response.data);
        toast.success(response.data.message);
        setError("");
        setComment({ content: "" });
        fetchComments();
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        toast.error(error.response.data.error);
      } else {
        setError("Something went wrong");
        toast.error("Something went wrong");
      }
      console.log(error);
    }
  };

  const svgPath = (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      className="bi bi-instagram"
      height="16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
    </svg>
  );

  return (
    <Popup
      trigger={
        <button className="bookmarkBtn flex items-center gap-2  text-white py-2 px-4 rounded-md  transition">
          <span className="IconContainer">{svgPath}</span>
          <p className="text">New Comment</p>
        </button>
      }
      position="center"
      contentStyle={{
        background: "#fff",
        padding: "20px",
        border: "none",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        width: "400px",
      }}
      overlayStyle={{
        background: "rgba(0, 0, 0, 0.5)",
      }}
      closeOnDocumentClick={false}
      closeOnEscape={true}
    >
      {(close) => (
        <div className="flex flex-col gap-4">
          <textarea
            placeholder="Write your comment here..."
            value={comment.content}
            onChange={(e) =>
              setComment({
                ...comment,
                content: e.target.value,
              })
            }
            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            rows="4"
          />
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="px-6 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600 focus:outline-none transition"
              onClick={() => {
                Comment(items._id);
              }}
            >
              Submit
            </button>
            <button
              onClick={close}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none transition"
            >
              Close
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      )}
    </Popup>
  );
};

export default CreateNewComment;
