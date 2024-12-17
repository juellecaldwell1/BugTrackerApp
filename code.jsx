import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {} from ""
import { useState, useEffect } from "react";
import "../Css/bugContainer.css";
import { Popup } from "reactjs-popup";
import MakeBugEdit from "./bug.MakeEdit.jsx";
import ConvertDate from "../convertDate.jsx";
import Users from "../RefreshData/refreshUserList.jsx";
import ViewComments from "../Comments/comment.list.jsx";
import BugTestCase from "../../TestCases/bug.TestCase.Info.jsx";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ChevronUp, ChevronDown, Search } from "lucide-react";
const BugContainer = () => {
  const [bugs, setBugs] = useState([]);
  const [disable, setDisable] = useState(false);
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
  const [selectedNumber, setSelectedNumber] = useState({
    min: "",
    max: "",
  });
  const [updateBug, setUpdateBug] = useState(false);
  console.log(updateBug);

  const [closePopup, setClosedPopup] = useState(false);

  const fetchBugs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/bug/list", {
        withCredentials: true,
      });
      console.log(response.data);
      if (response.status === 200) {
        setBugs(response.data);
      }
    } catch (error) {
      console.log("logging The Bugs ", error);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

const closePopUpF = () => {
  setClosedPopup(true);
}

  const fetchSortedData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/bug/list", {
        params: {
          keywords: sortedData.keywords,
          maxAge: sortedData.maxCreated,
          minAge: sortedData.minCreated,
          sortBy: sortedData.sortBy,
          page: sortedData.page,
          pageSize: sortedData.pageSize,
          closed: sortedData.closed,
          classification: sortedData.classification,
        },
        withCredentials: true,
      });

      setBugs(response.data);

      console.log("This is the filtered data ", bugs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSortedData();
  }, [sortedData.page]);

  const PageUp = () => {
    setSortedData((prev) => ({
      ...prev,
      page: bugs.length !== 0 && prev.page > 0 ? prev.page + 1 : prev.page,
    }));
  };

  const PageDown = () => {
    setSortedData((prev) => ({
      ...prev,
      page: prev.page > 1 ? prev.page - 1 : 1,
    }));
  };

  useEffect(() => {
    if (sortedData.page <= 1) {
      setDisable(true);
    }
    {
      setDisable(false);
    }
  }, []);

  const updateMinData = (days) => {
    setSortedData((sort) => ({ ...sort, minCreated: days }));

    setSelectedNumber((pre) => {
      return { ...pre, min: days };
    });
    fetchSortedData();
  };
  const updateMaxData = (days) => {
    setSortedData((sort) => ({ ...sort, maxCreated: days }));

    setSelectedNumber((pre) => {
      return { ...pre, max: days };
    });
    fetchSortedData();
  };

  return (
    <div className="min-h-screen bg-[#1a0b2e] p-6">
      <h1 className="text-[#00ff9d] text-2xl font-mono mb-4">Bug List</h1>\
      <Users/>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Keywords"
          className="form-control w-full bg-[#3730ff] border-[#2d1854] text-white placeholder:text-gray-400"
          value={sortedData.keywords}
          onChange={(e) =>
            setSortedData((sort) => ({ ...sort, keywords: e.target.value }))
          }
        />
        <div className="d-flex gap-2">
          <select
            className="form-select flex-fill bg-[#2d1854] border-[#2d1854] text-white"
            value={sortedData.classification}
            onChange={(e) =>
              setSortedData((sort) => ({
                ...sort,
                classification: e.target.value,
              }))
            }
          >
            <option value="">Classification: All</option>
            <option value="Approved">Approved</option>
            <option value="Unapproved">UnApproved</option>
            <option value="Duplicate">Duplicate</option>
            <option value="Rejected">Rejected</option>
            <option value="unClassified">unClassified</option>
          </select>

          <select
            className="form-select flex-fill bg-[#2d1854] border-[#2d1854] text-white"
            value={selectedNumber.min}
            onChange={(e) => {
              const days = parseInt(e.target.value);
              updateMinData(days);
            }}
          >
            <option value={sortedData.minAge}>Min Age (Days)</option>
            <option value={-1}>All</option>
            <option value={6}>7</option>
            <option value={13}>14</option>
            <option value={29}>30</option>
            <option value={59}>60</option>
            <option value={89}>90</option>
            <option value={119}>120</option>
            {/* {[ 7, 14, 30, 60, 90].map((days) => (
              <option key={days} value={days.toString()}>
//                 {days} days
//               </option>
//             ))} */}
          </select>

          <select
            className="form-select flex-fill bg-[#2d1854] border-[#2d1854] text-white"
            value={selectedNumber.max}
            onChange={(e) => {
              const daysAgo = parseInt(e.target.value);
              updateMaxData(daysAgo);
            }}
          >
            <option value={sortedData.maxAge}>Max Age (Days)</option>
            <option value={null}>All</option>
            <option value={6}>7</option>
            <option value={13}>14</option>
            <option value={29}>30</option>
            <option value={59}>60</option>
            <option value={89}>90</option>
            <option value={119}>120</option>
            <option value={149}>150</option>
            <option value={199}>200</option>
            <option value={224}>225</option>
            <option value={269}>270</option>
            <option value={299}>300</option>
            <option value={329}>329</option>
            <option value={364}>365</option>

            {/* {[7, 14, 30, 60, 90, 180].map((days) => (
              <option key={days} value={days.toString()}>
                {days} days
              </option>
            ))} */}
          </select>

          <select
            className="form-select flex-fill bg-[#ff0000] border-[#541818] text-white"
            value={sortedData.sortBy}
            onChange={(e) =>
              setSortedData((sort) => ({ ...sort, sortBy: e.target.value }))
            }
          >
            <option value="">Sort By: All</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="classification">Classification</option>
            <option value="assignedTo">Assigned Person</option>
            <option value="createdBy">Created By</option>
          </select>
          <div className="form-check">
            <select
              value={sortedData.closed}
              onChange={(e) =>
                setSortedData((sort) => ({ ...sort, closed: e.target.value }))
              }
            >
              <option value={null}>Closed: All</option>
              <option value={true}>Closed</option>
              <option value={false}>Open</option>
            </select>
          </div>

          <button
            className="btn btn-outline-danger  flex-fill bg-[#ffffff] border-[#ffffff] text-black"
            onClick={() => {
              fetchSortedData();
            }}
          >
            Search
          </button>
        </div>
        <br />
        <div className="container">
          <div className="row g-4">
            {bugs.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-lg-4 col-xl-4">
                <div className="card h-100 bg-transparent border- shadow">
                  <div className="card-header bg-primary bg-gradient text-white">
                    <h5 className="card-title mb-0">{item.title}</h5>
                  </div>
                  <div className="body-card">
                    <div className="card-body bg-white bg-opacity-10 text-black">
                      {/* <p className="card-text">{item.createdBy[0].fullName}</p> */}
                      {/* <p className="card-text">{item.author[0].fullName}</p> */}
                    </div>
                  </div>
                  <div className="card-footer bg-dark bg-opacity-25 border-0">
                    <div className="d-flex justify-content-between d-flex justify-content-between align-items-center">
                      <h6>registered: {ConvertDate(item.createdOn)}</h6>
                      <Popup
                        trigger={<button>View Data</button>}
                        position="center"
                        contentStyle={{
                          background: "#f1f1f1",
                          padding: "20px",
                          border: "none",
                        }}
                        overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                        closeOnDocumentClick={false}
                        onClose={closePopUpF}
                        onOpen={closePopup}
                      >
                        {(close) => (<>

                  

                       
                        <div className="align-middle">
                          <strong> Bug Information: </strong>{" "}
                        </div>
                        <p>{item.title}</p>
                        <p>Problem: {item.description}</p>
                        <p>How to Reproduce: {item.stepsToReproduce}</p>
                        {/* <p>Author: {item.author[0].fullName != null ? item.author[0].fullName : "cannot find author"}</p> */}
                        <p>Assigned To: {item.assignedTo.length > 0 ? item.assignedTo[0].fullName : "No one"}</p>
                        <p>Closed: {item.closed ? "Yes" : "No"}</p>
                        <p>Classification: {item.classification != null ? item.classification : "Hasnt been classified"}</p>
                        <p>Classified On: {item.classifiedOn != null ? item.classifiedOn : "The Bug hasnt been classified"}</p>
                        <p> Last Updated: {item.lastUpdated != null ? ConvertDate(item.lastUpdated) : "Bug Hasnt been updated yet"}</p>
                     
                        <div className="bg-gradient  d-flex justify-content-between align-items-center">
                       <MakeBugEdit items={item}/> 
                       <ViewComments items={item}/>
                       <BugTestCase items={item}/>
                        &nbsp; &nbsp;
                          <button className="btn btn-success">Save</button>
                        </div>

                      <button onClick={close}>Close</button>
                      </>)}
                      </Popup>  
                     
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              PageUp();
            }}
            disabled={disable}
          >
            Up
          </button>
          <p>{sortedData.page}</p>
          <button
            onClick={() => {
              PageDown();
            }}
            disabled={disable}
          >
            Down
          </button>
        </div>
      </div>
    </div>
  );
};

export default BugContainer;
