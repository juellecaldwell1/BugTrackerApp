import FireworkButton from "../Button Designs/button.Design.jsx";
import ViewComments from "../Comments/comment.list.jsx";
import BugTestCase from "../../TestCases/bug.TestCase.Info.jsx";
import MakeBugEdit from "./bug.MakeEdit.jsx";
import BugSteps from "./Bug.Steps.jsx";
import CountHours from "../CountHours.jsx";

const ViewBugData = ({ info, fetch }) => {
  
  const sum = info.timeLogged.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0); 
  return (
    <FireworkButton
      name="View Info"
      content={
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div class="relative ">
           <BugSteps info={info} fetch={fetch}/>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">{info.title}</h2>

          <p className="text-gray-700">{info.description}</p>

          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-medium text-gray-800">Steps to Reproduce:</h3>
            <p className="text-gray-600">{info.stepsToReproduce}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="font-semibold text-gray-800">Author:</p>
            <p className="text-gray-600">{info.author.fullName}</p>

            <p className="font-semibold text-gray-800">Classification:</p>
            <p className="text-gray-600">{info.classification}</p>

            {
            }
            <p className="font-semibold text-gray-800">Assigned To:</p>
            <p className="text-gray-600">
              {info.assignedTo &&
              info.assignedTo[0] &&
              info.assignedTo[0].fullName !== undefined
                ? info.assignedTo[0].fullName
                : "No One"}
            </p>

            <p className="font-semibold text-gray-800">Created On:</p>
            <p className="text-gray-600">{info.createdOn}</p>
            <p className="font-semibold text-gray-800 flex items-stretch ...">Hours Logged<div>:</div>{<CountHours fetch={fetch} items={info} />}</p>

            <p className="text-gray-600">{sum}</p>
          </div>

          <ViewComments fetch={fetch} items={info} />

          <BugTestCase fetch={fetch} items={info} />

          <MakeBugEdit fetch={fetch} items={info} />
        </div>
      }
    />
  );
};

export default ViewBugData;
