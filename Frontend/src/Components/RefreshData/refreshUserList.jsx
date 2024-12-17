import { useState, useEffect } from "react";
import axios from "axios";
import AssignBug from "../Bugs/bug.AssignTo.jsx";

const Users = () => {
  // const [users, setUsers] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const FetchUsers = async () => {
    const response = await axios
      .get(`${apiUrl}/api/user/list`, {
        withCredentials: true,
      }).then(() => {
        return response
      }).
      catch((error) => console.log(error));
  };

  return FetchUsers;
};

export default Users;
