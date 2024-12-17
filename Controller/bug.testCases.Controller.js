import bugSchema from "../Model/bugSchema.js";
import { nanoid } from "nanoid";
import debug from "debug";
import userInfo from "../Model/userSchema.js";
import mongoose, { Mongoose, mongo } from "mongoose";
import jwt from "jsonwebtoken";
import sendUserActivity from "../Config/mail.Sender.js";

const testCasesList = async (req, res) => {
  try {
    const { bugId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bugId)) {
      return res.status(400).json({ message: "Invalid Bug Id" });
    }

    const bug = await bugSchema.bugInfo.findById(bugId);


    const getTestCases = await bugSchema.testCases.find({
      _id: { $in: bug.testCases },
    }).populate("createdBy", "fullName") 



    console.log(getTestCases);

    if (!getTestCases)
      return res.status(404).json({ message: "Test Cases not found" });

    res.status(200).json(getTestCases);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const findTestCase = async (req, res) => {
  try {
    const { bugId, testId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bugId)) {
      return res.status(404).json({ message: "Invalid Bug Id" });
    }
    if (!mongoose.Types.ObjectId.isValid(testId)) {
      return res.status(404).json({ message: "Invalid Test Id" });
    }

    const findBugId = await bugSchema.bugInfo
      .findById(bugId)
      .populate("testCases")
      .exec();

    if (!findBugId)
      return res.status(400).json({ error: `The bug Id was not found` });

    const find = await bugSchema.testCases.findById(testId);

    if (!find) return res.status(404).json({ error: "No bug id found" });

    res.status(200).json(find);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users " + error.message });
  }
};

const createTestCase = async (req, res) => {
  try {
    const { status } = req.body;
    const { bugId } = req.params;
    const person = req.cookies.UserId;

    const decoded = jwt.verify(person, process.env.USER_TOKEN_SECRET);
    const id = decoded.id;

    if (!mongoose.Types.ObjectId.isValid(bugId)) {
      return res.status(400).json({
        error: "Invalid bug ID provided for the update",
      });
    }

    const findBug = await bugSchema.bugInfo.findById(bugId);
    if (!findBug) {
      return res.status(400).json({ error: "Could not find the bug ID" });
    }


    const foundPerson = await userInfo.findById(id);
    
    if(!foundPerson.role.includes("Quality Analyst")){
      return res.status(403).json({error: "You are not authorized to create testcase"});
    }

    if (!foundPerson) return res.status(404).json({ error: "User not found" });

    const newTestCase = new bugSchema.testCases({
      status: status,
      createdBy: foundPerson._id,
      createdOn: new Date(),
      lastUpdated: new Date()
    });

    await newTestCase.save();

    const updation = await bugSchema.bugInfo.findByIdAndUpdate(
      findBug,
      {
        $push: { testCases: newTestCase._id },
      },
      {
        new: true,
      }
    );

    if (!updation) {
      return res.status(404).json({ error: "Bug not found" });
    }
    sendUserActivity(
      `${foundPerson.fullName}`,
      `has created a test case for bug identification and resolution.`
    );
    

    res.status(200).json({ message: "Test case created", updation });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating test case: " + error.message });
  }
};

const updateTestId = async (req, res) => {
  try {
    const { bugId, testId } = req.params;
    const { status, addedBy } = req.body;
    const person = req.cookies.UserId;

    const decoded = jwt.verify(person, process.env.USER_TOKEN_SECRET);
    const id = decoded.id;

    if (!mongoose.Types.ObjectId.isValid(bugId)) {
      return res.status(400).json({
        error: "Invalid bug ID provided for the update",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(testId)) {
      return res.status(400).json({
        error: "Invalid bug ID provided for the update",
      });
    }

    const findOne = await bugSchema.bugInfo.findById(bugId);
    if (!findOne) {
      return res.status(404).json({ error: "Bug not found" });
    }

    const foundPerson = await userInfo.findById(id);

    if(!foundPerson.role.includes("Quality Analyst")){
      return res.status(403).json({error: "You are not authorized to update testcase"});
    }

    if (!foundPerson) {
      return res.status(404).json({ error: "User not found" });
    }

    const findAndUpdate = await bugSchema.testCases.findByIdAndUpdate(testId, {
      status: status,
      addedBy: new mongoose.Types.ObjectId(addedBy),
      lastUpdatedOn: new Date(),
      lastUpdatedBy: foundPerson._id,
      lastUpdated: new Date()
    });
    console.log(findAndUpdate);

    await findAndUpdate.save();

    if (!findAndUpdate)
      return res
        .status(404)
        .json({ error: "Could not find the test id and updated it" });


    res.status(200).json({ message: "Test Case Updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating case " + error.message });
  }
};

const deleteTestCase = async (req, res) => {
  try {
    const { bugId, testId } = req.params;
    const person = req.cookies.UserId;

    const decoded = jwt.verify(person, process.env.USER_TOKEN_SECRET);
    const id = decoded.id;

    if (!mongoose.Types.ObjectId.isValid(bugId)) {
      return res
        .status(400)
        .json({ error: "Invalid bug ID provided for the delete" });
    }
    if (!mongoose.Types.ObjectId.isValid(testId)) {
      return res
        .status(400)
        .json({ error: "Invalid test ID provided for the delete" });
    }

    const foundPerson = await userInfo.findById(id);

    if(!foundPerson.role.includes("Quality Analyst")){
      return res.status(403).json({error: "You are not authorized to delete testcase"});
    }

    if(!foundPerson){
      return res.status(401).json({error: "User not found"})
    }


    const findId = await bugSchema.bugInfo.findById(bugId);
    if (!findId) {
      return res.status(404).json({ error: "Bug not found" });
    }
    const findAndDelete = await bugSchema.testCases.findByIdAndDelete(testId);
    console.log(findAndDelete);


    if (!findAndDelete)
      return res
        .status(404)
        .json({ error: "Could not find the test id and deleted it" });

    const editLog = new bugSchema.editsModel({
      changes: {
        col: "bugs",
        operation: "Delete",
        update: findAndDelete.toObject(),
        target: findAndDelete._id
      },
      createdOn: new Date()
    });
    editLog.save();

    sendUserActivity(
      `${foundPerson.fullName}`,
      `has removed a test case associated with a bug.`
    );
    
    res
      .status(200)
      .json({ message: "The following TestCase was deleted", findAndDelete });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting test case " + error.message });
  }
};

export default {
  testCasesList,
  findTestCase,
  createTestCase,
  updateTestId,
  deleteTestCase,
};
