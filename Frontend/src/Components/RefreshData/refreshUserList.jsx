import { useState, useEffect } from "react";
import axios from "axios";
import AssignBug from "../Bugs/bug.AssignTo.jsx";

const Users = () => {
  // const [users, setUsers] = useState([]);

  const FetchUsers = async () => {
    const response = await axios
      .get("http://localhost:4000/api/user/list", {
        withCredentials: true,
      }).then(() => {
        return response
      }).
      catch((error) => console.log(error));
  };

  return FetchUsers;
};

export default Users;
