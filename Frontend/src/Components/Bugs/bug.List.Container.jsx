import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import { ChevronUp, ChevronDown, Search } from "lucide-react";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AllBugs from "./all.Bug.Items.jsx";
import Card from "react-bootstrap/Card";
import SuccessUpdates from "./update.Bugs.ToCurrent.jsx";

const BugContainer = () => {
  const [sortedData, setSortedData] = useState({
    keywords: "",
    classification: "",
    maxAge: null,
    minAge: -1,
    sortBy: "",
    closed: "",
    page: 1,
    pageSize: 6,
  });

  const [disablePageDown, setDisablePageDown] = useState(false);
  const [disablePageUp, setDisablePageUp] = useState(false);
  const [value, setValue] = useState("1");

  const { loading, bugs, fetchBugs, setBugs, setLoading } = SuccessUpdates();

  const fetchSortedData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/bug/list", {
        params: {
          keywords: sortedData.keywords,
          maxAge: sortedData.maxAge,
          minAge: sortedData.minAge,
          sortBy: sortedData.sortBy,
          page: sortedData.page,
          pageSize: sortedData.pageSize,
          closed: sortedData.closed,
          classification: sortedData.classification,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setBugs(response.data);
        setDisablePageUp(false);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);

        const { status } = error.response;

        if (status === 404) {
          toast.error("No Bugs found");
          setDisablePageUp(true);
          setSortedData((prev) => ({
            ...prev,
            page: prev.page === 1 ? prev.page : prev.page - 1,
          }));
        }
      } else {
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAndCheck = async () => {
      await fetchSortedData();
    };
    fetchAndCheck();
  }, [sortedData.page]);

  const PageUp = () => {
    if (bugs.length > 0) {
      setSortedData((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const PageDown = () => {
    setSortedData((prev) => ({
      ...prev,
      page: prev.page > 1 ? prev.page - 1 : 1,
    }));
  };

  useEffect(() => {
    setDisablePageDown(sortedData.page <= 1);
  }, [sortedData.page]);

  useEffect(() => {
    setDisablePageUp();
  }, [bugs.length, sortedData.pageSize]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6 text-gray-800">
      <br />
      <br />
      <br />
      <div className="space-y-6 max-w-5xl mx-auto">
        <input
          type="text"
          placeholder="Search by title, ID, or status..."
          className="w-full p-4 text-lg text-gray-700 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={sortedData.keywords}
          onChange={(e) =>
            setSortedData((sort) => ({ ...sort, keywords: e.target.value }))
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Select
            options={[
              { value: null, label: "Classification" },
              { value: "Approved", label: "Approved" },
              { value: "Unapproved", label: "Unapproved" },
              { value: "Duplicate", label: "Duplicate" },
              { value: "Rejected", label: "Rejected" },
              { value: "unClassified", label: "unClassified" },
            ]}
            placeholder="Classification: All"
            className="text-gray-700"
            onChange={(selected) =>
              setSortedData((sort) => ({
                ...sort,
                classification: selected?.value || "",
              }))
            }
          />
          <Select
            options={[
              { value: null, label: "Min Age (Days)" },
              { value: -1, label: "All" },
              { value: 6, label: "7" },
              { value: 13, label: "14" },
              { value: 29, label: "30" },
              { value: 59, label: "60" },
              { value: 89, label: "90" },
              { value: 119, label: "120" },
            ]}
            placeholder="Min Age (Days)"
            className="text-gray-700"
            onChange={(selected) => {
              setSortedData((sort) => ({
                ...sort,
                minAge: selected?.value,
              }));
            }}
          />
          <Select
            options={[
              { value: null, label: "Min Age (Days)" },
              { value: -1, label: "All" },
              { value: 6, label: "7" },
              { value: 13, label: "14" },
              { value: 29, label: "30" },
              { value: 59, label: "60" },
              { value: 89, label: "90" },
              { value: 119, label: "120" },
            ]}
            placeholder="Max Age (Days)"
            className="text-gray-700"
            onChange={(selected) => {
              setSortedData((sort) => ({
                ...sort,
                maxAge: selected?.value,
              }));
            }}
          />
          <Select
            options={[
              { value: "newest", label: "Newest" },
              { value: "oldest", label: "Oldest" },
              { value: "classification", label: "Classification" },
              { value: "assignedTo", label: "Assigned Person" },
              { value: "createdBy", label: "Created By" },
            ]}
            placeholder="Sort By: All"
            className="text-gray-700"
            onChange={(selected) =>
              setSortedData((sort) => ({ ...sort, sortBy: selected?.value }))
            }
          />
          <Select
            options={[
              { value: null, label: "All" },
              { value: true, label: "Closed" },
              { value: false, label: "Open" },
            ]}
            placeholder="Closed Order: All"
            className="text-gray-900 h-12 "
            onChange={(selected) =>
              setSortedData((sort) => ({ ...sort, closed: selected?.value }))
            }
          />
        </div>
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg"
          onClick={() => {
            fetchSortedData();
          }}
        >
          <Search className="mr-2 h-5 w-5" /> Search
        </Button>

        {loading && (
          <div className="flex justify-center items-center space-x-2 mt-4">
            <div className="animate-spin border-t-4 border-gray-500 border-solid w-8 h-8 rounded-full"></div>
            <span>Loading...</span>
          </div>
        )}
        <Card className="h-90 bg-white shadow-md border border-gray-300  overflow-hidden">
          <Card.Text>
            <Card.Title className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 font-light">
              <p>Title</p>
              <p>Classification</p>
              <p>Updated</p>
              <p>Status</p>
              <p>Info</p>
            </Card.Title>
          </Card.Text>
        </Card>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="All" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {bugs.map((item) => (
                <>
                  <AllBugs
                    item={item}
                    loading={loading}
                    fetchBugs={fetchBugs}
                  />
                </>
              ))}
              <div className="flex justify-center items-center space-x-4 mt-6 ">
                <Button
                  variant="dark"
                  onClick={PageDown}
                  disabled={disablePageDown}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600"
                >
                  <ChevronDown />
                </Button>
                <span className="text-lg font-bold">{sortedData.page}</span>
                <Button
                  variant="dark"
                  onClick={PageUp}
                  disabled={disablePageUp}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600"
                >
                  <ChevronUp />
                </Button>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="flex justify-center items-center space-x-4 mt-6 ">
                <Button
                  variant="dark"
                  onClick={PageDown}
                  disabled={disablePageDown}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600"
                >
                  <ChevronDown />
                </Button>
                <span className="text-lg font-bold">{sortedData.page}</span>
                <Button
                  variant="dark"
                  onClick={PageUp}
                  disabled={disablePageUp}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600"
                >
                  <ChevronUp />
                </Button>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default BugContainer;
