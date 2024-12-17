import { nanoid } from "nanoid";
import userInfo from "../Model/userSchema.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import bugSchema from "../Model/bugSchema.js";
import joiUserValidation from "./Joi.Validation/joi.User.Validation.js";
import jwt from "jsonwebtoken";

const userList = async (req, res) => {
  try {
    const users = await userInfo.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching users " + error.message });
  }
};

const userId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id 1" });
    }

    const user = await userInfo.findById(id);

    if (!user)
      return res.status(400).json({ error: `There is no such user by the Id` });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching user" });
  }
};

const postUser = async (req, res) => {
  try {
    const { value, error } = joiUserValidation.userValidation2.validate(
      req.body
    );
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { password, givenName, email, familyName, fullName, role } = value;

    if (!password)
    return res.status(400).json({ error: "there is no password entered" });
  if (!givenName)
    return res.status(400).json({ error: "there is no given name entered" });
  if (!email)
    return res.status(400).json({ error: "there is no email entered" });
  if (!familyName)
    return res.status(400).json({ error: "there is no family name entered" });
  if (!fullName)
    return res.status(400).json({ error: "There is no full name entered" });

    const noRole = role ? role : "Developer";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userInfo({
      password: hashedPassword,
      givenName: givenName,
      familyName: familyName,
      email: email,
      role: noRole,
      fullName: fullName,
      createdOn: new Date(),
      lastUpdated: new Date()
    });

    const editsMade = new bugSchema.editsModel({
      changes: {
        col: "User",
        operation: "Create",
        update: user.toObject(),
        target: null,
      },
    });

    await editsMade.save();

    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: `there was an error look here: ${error}` });
  }
};

const updateUser = async (req, res) => {
  try {
    const { value, error } = joiUserValidation.userValidation.validate(
      req.body
    );
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const person = req.cookies.UserId;

    if (!person) {

      return res.status(401).json({ error: "Unauthorized. No token found." });
    }

    const decoded = jwt.verify(person, process.env.USER_TOKEN_SECRET);
    const user = decoded.id;

    const findById = await userInfo.findById(user);
    if (!findById) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password, givenName, email, familyName, role, fullName } = value;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
  

    let updateData = {};

    if (email) updateData.email = email;
    if (givenName) updateData.givenName = givenName;
    if (familyName) updateData.familyName = familyName;
    if(role){
      if(!findById.role.includes("Technical Manager")){
        return res.status(401).json({error: "You do not have the permission to edit the roles of anyone."});
      }
      updateData.role = role
    }
    if (fullName) updateData.fullName = fullName;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }
    updateData.lastUpdated = new Date();

    const newUpdate = await userInfo.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!newUpdate)
      return res
        .status(400)
        .json({ error: "There was an problem with the update of the user" });

    const editLog = new bugSchema.editsModel({
      changes: {
        col: "User",
        operation: "Update",
        update: newUpdate.toObject(),
        target: newUpdate._id,
      },
    });
    editLog.save();

    res.status(200).json(newUpdate);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: `there was an error look here: ${error}` });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const person = req.cookies.UserId;

    if (!person) {
      return res.status(401).json({ error: "Unauthorized. No token found." });
    }

    const decoded = jwt.verify(person, process.env.USER_TOKEN_SECRET);
    const user = decoded.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const findById = await userInfo.findById(user);
    if (!findById) {
      return res.status(404).json({ error: "User not found" });
    }

    if(findById._id.toString() !== id){
      return res.status(403).json({ error: "You can only delete your own account"});
    }

    const userGone = await userInfo.findByIdAndDelete(id);
    if (!userGone)
      return res
        .status(400)
        .json({ error: "Could not find the user with the same id" });

    const editLog = new bugSchema.editsModel({
      changes: {
        col: "User",
        operation: "Delete",
        update: userGone.toObject(),
        target: userGone._id,
      },
    });
    editLog.save();

    // const newEdit = await bugSchema.editsModel.updateOne({
    //   $push: { edits: editLog._id },
    // });

    // if (!newEdit.matchedCount)
    //   return res
    //     .status(400)
    //     .json({ error: "The new edit could not be updated" });

    res.status(200).json({ success: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: `There was an error look here: ${error}` });
  }
};

export default {
  userList,
  userId,
  postUser,
  updateUser,
  deleteUser,
};
