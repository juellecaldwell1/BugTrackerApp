import mongoose from "mongoose";

const userInformation = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    fullName: {
      type: String,
      required: true,
    },
    givenName: {
      type: String,
      required: true,
    },
    familyName: {
      type: String,
      required: true,
    },
    role: [{
      type: String,
      required: true,
    }],
    createdOn: {
      type: Date,
    },
    lastUpdated: {
      type: Date
    }
  }
);
const userInfo = mongoose.model("users", userInformation);

export default userInfo;
