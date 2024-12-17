import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react";

const SuccessUpdates = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBugs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/bug/list", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setBugs(response.data);
      }
    } catch (error) {
      console.log("logging The Bugs ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBugs();
  }, []);

  return { loading, bugs, fetchBugs, setBugs, setLoading };
};
export default SuccessUpdates;
