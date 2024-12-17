import { useEffect, useState } from "react";
import LoggedInRightNow from "../Components/whosLoggedIn.jsx";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
const ConfirmUser = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const [error, setError] = useState(null);
const [user, setUser] = useState(null);
const navigate = useNavigate();

useEffect(() => {
const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/user/me`, {
      withCredentials: true,
    });
    setUser(response.data);
    if(response.status === 401){
      navigate("/login");
    }
  } catch (error) {
    if (error.response) {
      console.log("There was an response error: ", error);
      setError(error.response.data.error);
      toast.error(error.response.data.error);
    } else {
      setError("Error fetching user data ", error);
    }
    console.log("There was an error trying to get your profile");
  }
};

getLoginStatus();
}, []);

const handleInstantNavigate = () => {
  // alert("Your session has expired now logging you out");
  navigate('/user/login');
};



return user ? <Outlet/> : handleInstantNavigate()





};




export default ConfirmUser;
