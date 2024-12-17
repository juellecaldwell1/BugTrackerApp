import bugSchema from "../Model/bugSchema.js";
import { nanoid } from "nanoid";
import debug from "debug";
import userInfo from "../Model/userSchema.js";
import mongoose from "mongoose";
import joiBugValidation from "./Joi.Validation/joi.Bug.Validation.js";
import jwt from "jsonwebtoken";
import sendUserActivity from "../Config/mail.Sender.js";

const getBugs = async (req, res) => {
  try {
    const bugs = await bugSchema.bugInfo.find({});

    // .populate('comments')
    // .populate('testCases')

    console.log(bugs);

    res.status(200).json(bugs);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: `There was an error Look Here: ${error}` });
  }
};

const findBugByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid ID" });
    }

    const findID = await bugSchema.bugInfo
      .findById(id)
      .populate("comment")
      .populate("testCases");

    if (!findID)
      return res.status(404).json({ error: `Bug ${bugId} not found ` });

    res.status(200).json(findID);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: `There was an error Look Here: ${error}` });
  }
};

const postBug = async (req, res) => {
  try {
    const { value, error } = joiBugValidation.bugValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: `There was error that occurred when trying the make a new bug Look here:  ${error.details[0].message}`,
      });
    }

    const { title, description, stepsToReproduce } = value;

    if (!title)
      return res
        .status(400)
        .json({ error: "There was no title entered inside of the body" });
    if (!description)
      return res
        .status(400)
        .json({ error: "There was no description entered" });
    if (!stepsToReproduce)
      return res.status(400).json({ error: "There was no reproduce" });

    const person = req.cookies.UserId;

    const decoded = jwt.verify(person, process.env.USER_TOKEN_SECRET);
    const id = decoded.id;

    const findId = await userInfo.findById(id);

    const newBug = new bugSchema.bugInfo({
      title: title,
      description: description,
      stepsToReproduce: stepsToReproduce,
      author: findId._id,
      classification: "unClassified",
      createdBy: findId._id,
      closed: false,
      createdOn: new Date(),
    });
    await newBug.save();

    if (!newBug)
      return res
        .status(400)
        .json({ error: "The new bug could not be created" });

        sendUserActivity(
          `New Bug Report Created`,
          `${findId.fullName} has reported a new bug and is seeking assistance. Please review the details and provide steps to resolve the issue.`
        );
        
    res
      .status(200)
      .json({ bugIdentified: `New Bug reported with the id of ${newBug._id}` });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: `The was an error look here: ${error.message}` });
  }
};

const updateBugsData = async (req, res) => {
  const person = req.cookies.UserId;
  let decoded;
  try {
    decoded = jwt.verify(person, process.env.USER_TOKEN_SECRET);
    const userId = decoded.id;

    const { value, error } = joiBugValidation.bugValidation2.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: `There was an error when trying to update the bu00g: ${error.details[0].message}`,
      });
    }

    const { id } = req.params;
    const { title, description, stepsToReproduce } = value;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid bug ID" });
    }

    const findById = await userInfo.findById(userId);

    if (!findById) {
      return res
        .status(404)
        .json({ error: "Could not find the logged in user" });
    }

    const findBugFirst = await bugSchema.bugInfo.findById(id);

    console.log("User id" + findById._id);
    console.log("finding the author id " + findBugFirst.author);

    if (findById.role.toString() !== "Business Analyst") {
      if (findBugFirst.author._id.toString() !== findById._id.toString()) {
        if (findBugFirst.assignedTo.toString() !== findById._id.toString()) {
          return res.status(403).json({
            error:
              "You don't have permission to edit this bug because it's not assigned to you or your not the author if this bug",
          });
        }
      }
    }

    let data = {};
    if (title) data.title = title;
    if (description) data.description = description;
    if (stepsToReproduce) data.stepsToReproduce = stepsToReproduce;
    data.lastUpdated = new Date();
    data.lastUpdatedBy = findById._id;

    const updatedBug = await bugSchema.bugInfo.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedBug) {
      return res
        .status(400)
        .json({ error: "Could not find the bug ID and update" });
    }

    res
      .status(200)
      .json({ message: `Bug with id ${id} was successfully updated!` });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: `There was an error: ${error.message}` });
  }
};

const classifyBug = async (req, res) => {
  let decoded;
  try {
    const { value, error } = joiBugValidation.bugValidation2.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: `There was error that occurred Look here: ${error.details[0].message}`,
      });
    }

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const { classification } = value;

    if (!classification)
      return res
        .status(400)
        .json({ error: "There is no classification entered" });

    const person = req.cookies.UserId;

    decoded = jwt.verify(person, process.env.USER_TOKEN_SECRET);
    const userId = decoded.id;

    const findId = await userInfo.findById(userId);
    const findBugFirst = await bugSchema.bugInfo.findById(id);

    console.log(findId);
    console.log("Business Analyst");

    if (!findId.role.includes("Business Analyst")) {
      if (findBugFirst.assignedTo.toString() !== findId._id.toString()) {
        return res.status(403).json({
          error:
            "You don't have permission to edit this bug because it's not assigned to you or your not the author if this bug",
        });
      }
    }

    sendUserActivity(
      `${findId.fullName}`,
      `has classified a bug and updated its status for further review.`
    );
    

    res.status(200).json({ message: `Bug ${updateBug._id}` });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: `${message}: ${error.message}` });
  }
};

const bugAssign = async (req, res) => {
  try {
    const { value, error } = joiBugValidation.bugValidation2.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: `There was error that occurred with the Assigned Bug Look here:  ${error.details[0].message}`,
      });
    }

    const { id } = req.params;

    const { assignedTo } = value;

    if (!assignedTo)
      return res
        .status(400)
        .json({ error: "There was no user id in the body of the request" });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid bug id" });
    }

    if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    const person = req.cookies.UserId;

    const decoded = jwt.verify(person, process.env.USER_TOKEN_SECRET);
    const userId = decoded.id;

    const findId = await userInfo.findById(userId);
    const findBugFirst = await bugSchema.bugInfo.findById(id);
    if (
      !findId.role.includes("Business Analyst") &&
      !findId.role.includes("Technical Manager") &&
      findBugFirst.assignedTo.toString() !== findId._id.toString()
    ) {
      return res.status(403).json({
        error:
          "You don't have permission to edit this bug because it's not assigned to you and you're not the author of this bug",
      });
    }

    const updateBug = await bugSchema.bugInfo.findByIdAndUpdate(
      id,
      {
        assignedTo: new mongoose.Types.ObjectId(assignedTo),
        lastUpdated: new Date(),
        assignedOn: new Date(),
        assignedBy: findId._id,
      },
      { new: true }
    );

    if (!updateBug)
      return res
        .status(400)
        .json({ error: "The information couldn't be updated for some reason" });

        sendUserActivity(
          `${findId.fullName}`,
          `has assigned a bug for resolution and is awaiting further action.`
        );
        

    res.status(200).json({ message: `Bug ${updateBug._id} assigned` });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: `${err.message}` });
  }
};

const bugClose = async (req, res) => {
  try {
    const { value, error } = joiBugValidation.bugValidation2.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: `There was error that occurred with the bug close Look here:  ${error.details[0].message}`,
      });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid bug id" });
    }
    console.log("Checked if it was an object");

    const { closed } = value;
    console.log(closed);

    const person = req.cookies.UserId;

    const decoded = jwt.verify(person, process.env.USER_TOKEN_SECRET);
    const userId = decoded.id;

    const findId = await userInfo.findById(userId);

    if (!findId.role.includes("Business Analyst")) {
      return res.status(403).json({
        error: "You don't have permission to Close this bug",
      });
    }

    let findAndUpdated;

    if (closed === false) {
      findAndUpdated = await bugSchema.bugInfo.findByIdAndUpdate(id, {
        closed: closed,
        lastUpdated: new Date(),
        closedOn: null,
        closedBy: null,
      });

      if (!findAndUpdated)
        return res.status(404).json({ error: `Bug not found` });
    } else {
      findAndUpdated = await bugSchema.bugInfo.findByIdAndUpdate(id, {
        closed: true,
        lastUpdated: new Date(),
        closedOn: new Date(),
        closedBy: findId._id,
        resolvedDate: new Date(),
      });

      if (!findAndUpdated)
        return res
          .status(404)
          .json({ error: `Bug ${findAndUpdated._id} not found` });
    }

    const action = closed === false ? "ReOpened" : "Closed";

    sendUserActivity(
      `${findId.fullName}`,
      `has closed a bug after resolving the issue.`
    );
    
    
    res.status(200).json({ message: `Bug ${findAndUpdated._id} ${action}` });
    console.log(findAndUpdated);
  } catch (error) {
    console.log("closing of bug error: ", error.message);
    return res.status(400).json({ error: ` ${error.message}` });
  }
};

const deleteBug = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid bug id" });
    }
    const person = req.cookies.UserId;

    const decoded = jwt.verify(person, process.env.USER_TOKEN_SECRET);
    const userId = decoded.id;

    const findId = await userInfo.findById(userId);

    if (!findId.role.includes("Technical Manager")) {
      return res.status(403).json({
        error: "You don't have permission to Delete this bug",
      });
    }
    const findAndDeleted = await bugSchema.bugInfo.findByIdAndDelete(id);

    if (!findAndDeleted)
      return res.status(404).json({ error: "Bug not found" });

      sendUserActivity(
        `${findId.fullName}`,
        `has deleted a bug report after reviewing and determining it's no longer relevant.`
      );
      

    res
      .status(200)
      .json({ message: `${findId.fullName} has successfully deleted a bug` });
  } catch (error) {
    console.log("deletion of bug error: ", error.message);
    return res.status(400).json({ error: ` ${error.message}` });
  }
};

const stepsToFix = async (req, res) => {
  try {
    const { value, error } = joiBugValidation.bugValidation2.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: `There was error that occurred with the bugs steps Look here:  ${error.details[0].message}`,
      });
    }

    const person = req.cookies.UserId;

    const { stepsToFix } = value;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid bug id" });
    }

    const decoded = jwt.verify(person, process.env.USER_TOKEN_SECRET);
    const userId = decoded.id;

    const findId = await userInfo.findById(userId);

    if (
      !findId.role.includes("Business Analyst") &&
      !findId.role.includes("Technical Manager")
    ) {
      return res.status(403).json({
        error: "You don't have permission to Add The Steps to fix this bug",
      });
    }

    const update = await bugSchema.bugInfo.findByIdAndUpdate(
      id,
      {
        stepsToFix: stepsToFix,
      },
      {
        new: true,
      }
    );

    if (!update) {
      return res.status(404).json({ error: "steps not found" });
    }

    sendUserActivity(
      `${findId.fullName}`,
      `has added steps to reproduce the bug for better clarity and troubleshooting.`
    );
    
    res.status(200).json({
      message: `Bug ${update._id} has been added some steps to solve the problem`,
    });
  } catch (error) {
    console.log("Assigning of steps for bug error: ", error.message);
    return res.status(400).json({ error: ` ${error.message}` });
  }
};

const logHours = async (req, res) => {
  try {
    const { value, error } = joiBugValidation.bugValidation2.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: `There was an error with the bug's steps: ${error.details[0].message}`,
      });
    }

    const person = req.cookies.UserId;

    const { timeLogged } = value;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid bug ID" });
    }

    const decoded = jwt.verify(person, process.env.USER_TOKEN_SECRET);
    const userId = decoded.id;

    const findId = await userInfo.findById(userId);
    if (!findId) {
      return res.status(404).json({ error: "User not found" });
    }

    const update = await bugSchema.bugInfo.findByIdAndUpdate(
      id,
      {
        $push: { timeLogged: timeLogged },
      },
      {
        new: true,
      }
    );

    if (!update) {
      return res
        .status(404)
        .json({ error: "Bug not found or time log failed" });
    }

    const editLog = new bugSchema.editsModel({
      changes: {
        col: "Bugs",
        operation: "Update",
        target: findId._id,
        update: update.toObject(),
      },
      createdOn: new Date(),
    });
    await editLog.save();

    sendUserActivity(
      `${findId.fullName}`,
      `has logged ${timeLogged} hours working on bug ID ${id}.`
    );
    
    res
      .status(200)
      .json({ message: `Bug ${update._id} time has been logged successfully` });
  } catch (error) {
    console.error("Error in logHours:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  getBugs,
  findBugByID,
  postBug,
  updateBugsData,
  classifyBug,
  bugAssign,
  bugClose,
  deleteBug,
  stepsToFix,
  logHours,
};
