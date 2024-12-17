import { useState, useEffect } from "react";
import axios from "axios";

const useRefreshBugs = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [bugs, setBugs] = useState([]);

  const fetchBugs = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/bug/list`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setBugs(response.data);
        console.log("Fetched Bugs:", response.data);
      }
    } catch (error) {
      console.error("Error fetching bugs:", error);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  return { fetchBugs, bugs };
};

export default useRefreshBugs;
