import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import {FaSignOutAlt } from "react-icons/fa";

const LogOutNow = async () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    try {
      const response = await axios.post(
        `${apiUrl}/api/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
};

export default LogOutNow;
