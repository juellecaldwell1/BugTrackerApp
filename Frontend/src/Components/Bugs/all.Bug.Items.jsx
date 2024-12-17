import "bootstrap/dist/css/bootstrap.min.css";
import ConvertDate from "../convertDate.jsx";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ViewBugData from "./Bug.Info.jsx";

const AllBugs = ({ item, loading, fetchBugs }) => {
  return (
    <>
      {!loading && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <>
              {console.log("the items that are closed are: ", item.closed)}

              <motion.div
                key={item.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="col-span-1"
              >
                <Card className="h-90 bg-white shadow-md border border-gray-300 overflow-hidden mb-6"> {/* Added mb-6 */}
                  <Card.Body className="text-gray-900">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                      <div className="underline">
                        <a href="">
                          <Link to={`/bug/list/${item._id}`} state={item}>
                            {item.title}
                          </Link>
                        </a>
                      </div>
                      <p
                        className={`${
                          item.classification === "Unapproved"
                            ? "border-gray-700 bg-gray-700"
                            : item.classification === "Approved"
                            ? "border-green-700 bg-green-700"
                            : item.classification === "Duplicate"
                            ? "border-yellow-700 bg-yellow-700"
                            : item.classification === "Unclassified"
                            ? "border-blue-700 bg-blue-700"
                            : item.classification === "Rejected"
                            ? "border-red-700 bg-red-700"
                            : "border-black bg-black"
                        } px-3 py-1 rounded-full text-sm ml-1 text-white flex items-center justify-center w-auto`}
                      >
                        {item.classification}
                      </p>

                      <p>
                        {item.lastUpdated !== undefined
                          ? ConvertDate(item.lastUpdated)
                          : "Never Updated"}
                      </p>
                      <p className={` ${item.closed === true ? "border-red-700 bg-red-700" : "border-green-700 bg-green-700 "} text-pretty px-3 py-1 rounded-full text-sm ml-1 text-white flex items-center justify-center w-auto`}>
                        {item.closed === true ? "Closed" : "Open"}
                      </p>
                      <ViewBugData info={item} fetch={fetchBugs} />
                    </div>

                    <Card.Footer className="text-black text-sm">
                      Added: {ConvertDate(item.createdOn)}
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </motion.div>
            </>
          </motion.div>
        </>
      )}
    </>
  );
};

export default AllBugs;
