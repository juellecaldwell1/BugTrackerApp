"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Popup } from "reactjs-popup";
import ConvertDate from "../convertDate.jsx";
import { useState, useRef, useEffect } from "react";
import "./Css/leaveAComment.css";
import CreateNewComment from "./create.Comment.jsx";
import FireworkButton from "../Button Designs/button.Design.jsx";

const ViewComments = ({ items, fetch }) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const [comments, setComments] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const [error, setError] = useState("");

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/bug/${items._id}/comment/list`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setComments(response.data);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred");
      }
      console.log("logging The Users ", error);
    }
  };

  useEffect(() => {
      fetchComments();
  }, [items._id]);
  //if i add in comments here then i would get a lot of request


  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;
      setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startPos]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  return (
    <FireworkButton
      name="Comments"
      content={
        <>
          <div>
            <h5>{items.title} Comments</h5>
          </div>
          <div
            style={{
              maxHeight: "400px",
              overflowY: "scroll",
            }}
          >
            {comments.map((item) => (
              <div key={item.id} className="mb-3">
                <div className="width-card">
                  <div className="d-flex justify-content-center align-items-center min-vh-5">
                    <div
                      ref={cardRef}
                      style={{
                        transform: `translate(${position.x}px, ${position.y}px)`,
                        transition: isDragging
                          ? "none"
                          : "transform 0.3s ease-out",
                        cursor: isDragging ? "grabbing" : "grab",
                      }}
                      onMouseDown={handleMouseDown}
                      className="card shadow-lg p-4 w-full max-w-[400px] rounded-lg transition-all ease-in-out hover:shadow-xl hover:translate-y-[-5px]"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-gray-500 text-black py-1 px-3 rounded-full text-sm">
                          {item.name?.fullName || "Unknown User"}
                        </span>
                        <div className="text-muted">•••</div>
                      </div>
                      <p className="text-gray-800">{item.content}</p>
                      <div className="flex justify-between text-sm text-gray-500 mt-4">
                        <div>
                          <span>
                            About: {item.bugId?.title || "Unknown Bug"}
                          </span>
                        </div>
                        <div className="flex gap-4">
                          <span>{ConvertDate(item)}</span>
                          <span>{ConvertDate(item.createdOn)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <CreateNewComment fetch={fetch} items={items} fetchComments={fetchComments}/>
        </>
      }
    />
  );
};

export default ViewComments;
