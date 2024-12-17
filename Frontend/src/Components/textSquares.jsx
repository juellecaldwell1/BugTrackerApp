import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Modal from "./modal.jsx";
import BugModal from "./Bugs/bugModal.jsx";
import { useState, useEffect } from "react";

const Square = () => {
  const [data, setData] = useState([]);
  const [bugData, setBugData] = useState([]);
  const [modal, setModal] = useState(null);
  const [modalType, setModalType] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/user/list");
      console.log("data has been fetched");
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (givenName, familyName, email, password, role) => {
    setModalType("user");
    setModal({
      name: givenName,
      family: familyName,
      email: email,
      password: password,
      role: role,
    });
  };

  const openBugModal = (
    title,
    description,
    reproduce,
    classification,
    assignedToUserId,
    assignedToUserName,
    closed
  ) => {
    setModalType("bug");
    setModal({
      title: title,
      description: description,
      reproduce: reproduce,
      classification: classification,
      assignedToUserId: assignedToUserId,
      assignedToUserName: assignedToUserName,
      closed: closed,
    });
  };

  const closeModal = () => {
    setModal(null);
  };

  const fetchBugs = async () => {
    try {
      const otherResponse = await axios.get(
        "http://localhost:4000/api/bug/list"
      );
      console.log("data has been fetched");
      if (otherResponse.status === 200) {
        setBugData(otherResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBugs();
  }, []);

  const userData = data.map((user) => (
    <div className="square-item" key={user.email}>
      <a
        onClick={() =>
          openModal(
            user.givenName,
            user.familyName,
            user.email,
            user.password,
            user.role
          )
        }
      >
        <pre><u>{user.givenName}</u></pre>
      </a>
    </div>
  ));

  const bugDataForBugs = bugData.map((bug) => (
    <div className="square-item" key={bug.title}>
      <a
        onClick={() =>
          openBugModal(
            bug.title,
            bug.description,
            bug.reproduce,
            bug.classification,
            bug.assignedToUserId,
            bug.assignedToUserName,
            bug.closed
          )
        }
      >
        <pre><u>{bug.title}</u></pre>
      </a>
    </div>
  ));

  return (
    <div className="contain">
      <div className="squares-container">
        <div className="square">
          <h1>Users</h1>
          <div className="scrollable-container">
            {userData}
          </div>
        </div>
  
        <div className="square">
          <h1>Bugs</h1>
          <div className="scrollable-container">
            {bugDataForBugs}
          </div>
        </div>
      </div>
  
      {modal &&
        (modalType === "user" ? (
          <Modal
            givenName={modal.name}
            familyName={modal.family}
            email={modal.email}
            password={modal.password}
            role={modal.role}
            closeModal={closeModal}
          />
        ) : (
          <BugModal
            title={modal.title}
            description={modal.description}
            reproduce={modal.reproduce}
            classification={modal.classification}
            assignedToUserId={modal.assignedToUserId}
            assignedToUserName={modal.assignedToUserName}
            closed={modal.closed}
            closeModal={closeModal}
          />
        ))}
    </div>
  );
        }  

export default Square;
