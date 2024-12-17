"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ChevronUp, ChevronDown, Search } from "lucide-react";
import ConvertDate from "./convertDate.jsx";
import EditUserPopup from "./user.Edit.Info.jsx";
import { toast } from "react-toastify";

const UserContainer = () => {
  const [users, setUsers] = useState([]);

  const [disablePageDown, setDisablePageDown] = useState(false);
  const [disablePageUp, setDisablePageUp] = useState(false);
  const [sortedData, setSortedData] = useState({
    keywords: "",
    role: "",
    maxCreated: null,
    minCreated: -1,
    sortBy: "",
    page: 1,
    pageSize: 6,
  });
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/user/list", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
      } else {
        console.log(error.message);
      }
      console.log("logging The Users ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchSortedData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/user/list", {
        params: {
          keywords: sortedData.keywords,
          role: sortedData.role,
          maxCreated: sortedData.maxCreated || null,
          minCreated: sortedData.minCreated || null,
          sortBy: sortedData.sortBy,
          page: sortedData.page,
          pageSize: sortedData.pageSize,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setUsers(response.data);
        setDisablePageUp(false);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);

        const { status } = error.response;

        if (status === 404) {
          setDisablePageUp(true);
          toast.error("No Users found");
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
    if (users.length > 0) {
      setSortedData((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
    console.log("Page Up ");
  };

  const PageDown = () => {
    setSortedData((prev) => ({
      ...prev,
      page: prev.page > 1 ? prev.page - 1 : 1,
    }));
    console.log("Page Down");
  };

  useEffect(() => {
    setDisablePageDown(sortedData.page <= 1);
    console.log("Page down button disable");
  }, [sortedData.page]);

  useEffect(() => {
    setDisablePageUp();
    console.log("Page up button disable");
  }, [users.length, sortedData.pageSize]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6 text-gray-800">
      <br />
      <br />
      <br />
      <div className="space-y-6 max-w-5xl mx-auto">
        <input
          type="text"
          placeholder="Search By full name or email..."
          className="w-full p-4 text-lg text-gray-700 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={sortedData.keywords}
          onChange={(e) =>
            setSortedData((sort) => ({ ...sort, keywords: e.target.value }))
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            options={[
              { value: "", label: "All Roles" },
              { value: "Developer", label: "Developer" },
              { value: "Business Analyst", label: "Business Analyst" },
              { value: "Quality Analyst", label: "Quality Analyst" },
              { value: "Product Manager", label: "Product Manager" },
              { value: "Technical Manager", label: "Technical Manager" },
            ]}
            placeholder="Role: All"
            className="text-gray-700"
            onChange={(selected) =>
              setSortedData((sort) => ({
                ...sort,
                role: selected?.value || "",
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
                minCreated: selected?.value,
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
                maxCreated: selected?.value,
              }));
            }}
          />
          <Select
            options={[
              { value: null, label: "Sort By: All" },
              { value: "givenname", label: "Given Name" },
              { value: "familyname", label: "Family Name" },
              { value: "role", label: "Role" },
              { value: "newest", label: "Newest" },
              { value: "oldest", label: "Oldest" },
            ]}
            placeholder="Sort By: All"
            className="text-gray-700"
            onChange={(selected) =>
              setSortedData((sort) => ({ ...sort, sortBy: selected?.value }))
            }
          />
        </div>

        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg rounded-md"
          onClick={fetchSortedData}
        >
          <Search className="mr-2 h-auto w-5" /> Search
        </Button>

        {loading && (
          <div className="flex justify-center items-center space-x-2 mt-4">
            <div className="animate-spin border-t-4 border-gray-500 border-solid w-8 h-8 rounded-full"></div>
            <span>Loading...</span>
          </div>
        )}

        {!loading && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {users.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className="col-span-1"
                >
                  <Card className="h-90 bg-white shadow-md border border-gray-300 overflow-hidden">
                    <Card.Header className="flex justify-between items-center text-gray-800 text-sm bg-gray-100 px-4 py-2">
                      <Card.Title>{item.fullName}</Card.Title>
                      <span className="text-gray-500 text-sm">
                        {
                          <EditUserPopup
                            item={item}
                            fetchUsers={fetchUsers}
                            users={users}
                          />
                        }
                      </span>
                    </Card.Header>
                    <Card.Body className="text-gray-600">
                      <p>{item.email}</p>

                      <p
                        className={`border-2 ${
                          item.role == "Developer"
                            ? "border-blue-700 bg-blue-700"
                            : item.role == "Business Analyst"
                            ? "border-green-700 bg-green-700"
                            : item.role == "Quality Analyst"
                            ? "border-orange-700 bg-orange-700"
                            : item.role == "Product Manager"
                            ? "border-purple-700 bg-purple-700"
                            : item.role == "Technical Manager"
                            ? "border-red-700 bg-red-700"
                            : "border-black bg-black"
                        } rounded-lg inline-block p-2 py-1 px-7 text-white`}
                      >
                        {item.role}
                      </p>

                      <Card.Footer className="text-gray-700 text-sm">
                        Registered: {ConvertDate(item.createdOn)}
                      </Card.Footer>
                    </Card.Body>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4 mt-6">
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
      </div>
    </div>
  );
};

export default UserContainer;
