import { useState, useEffect } from "react";
import axios from "axios";

const LoggedInRightNow = () => {
  const [user, setUser] = useState(null); 
  const [user1, setUser1] = useState({}); 
  const [loading, setLoading] = useState(true); 

  const getMe = async () => {
    setLoading(true); 
    try {
      const response = await axios.get("http://localhost:4000/api/user/me", {
        withCredentials: true,
      });
      setUser(response.data);
      setUser1(response.data);
      
    } catch (error) {
      console.log(error.response ? error.response.data.error : "Error fetching user data");
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []); 

  return { user, loading, getMe, user1};
};

export default LoggedInRightNow;
