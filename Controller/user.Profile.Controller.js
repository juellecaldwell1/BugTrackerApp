import mongoose from "mongoose";
import userInfo from "../Model/userSchema.js";
import bcrypt from "bcryptjs";
import joiUserValidation from "./Joi.Validation/joi.User.Validation.js";
import bugSchema from "../Model/bugSchema.js";
import tokens from "./JwtTokens/tokens.js";
import jwt from "jsonwebtoken"; 

const userProfile = async (req, res) => {
    try {
        const userIdToken = req.cookies.UserId; 

        if (!userIdToken) {
            return res.status(401).json({ message: "User ID token not found" });
        }

  
        const decoded = jwt.verify(userIdToken, process.env.USER_TOKEN_SECRET);
        const id = decoded.id;

 
        const userProfile = await userInfo.findById(id);

        if (!userProfile) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(userProfile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};


const updateUserProfile = async (req, res) => {
  try {
    const id = req.cookies.UserId;

    if (!id) return res.status(401).json({ error: "User ID token not found" });

    const decoded = jwt.verify(id, process.env.USER_TOKEN_SECRET);
    const person = decoded.id;

    const { value, error } = joiUserValidation.userValidation.validate(req.body);
    if (error){
      if (error) {
        console.error("Joi Validation Error:", error.details);
        return res.status(400).json({ message: error.details[0].message });
      }
    }


    const { email, password, fullName, givenName, familyName } = value;

    const findPerson = await userInfo.findById(person);

    if (!findPerson) {
      return res.status(404).json({ error: "User not found" });
    }

    let info = {
      email,
      fullName,
      givenName,
      familyName,
      lastUpdated: new Date(),
    };


    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      info.password = hash; 
    }


    const findAndUpdate = await userInfo.findByIdAndUpdate(person, info, {
      new: true,
    });

    if (!findAndUpdate) {
      return res.status(404).json({ message: "User update failed" });
    }


    const edited = new bugSchema.editsModel({
      changes: {
        col: "Users",
        operation: "Update",
        editor: id,
        update: findAndUpdate.toObject(),
        target: findPerson._id,
      },
    });

    await edited.save();

    res.status(200).json({ message: "Profile updated successfully", user: findAndUpdate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export default {
  userProfile,
  updateUserProfile,
};
