import bugSchema from "../Model/bugSchema.js";
import debug from "debug";
import userInfo from "../Model/userSchema.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const commentList = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid id" });
    }

    const findId = await bugSchema.bugInfo.findById(id);

    if (!findId) return res.status(404).json({ error: "User not found" });

    const getComments = await bugSchema.commentsModel.find({
      _id: { $in: findId.comment },
    }).populate("name", "fullName").populate("bugId", "title")

    res.status(200).json(getComments);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching comments " + error.message });
  }
};

const findComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid id" });
    }
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(404).json({ message: "Invalid commentId" });
    }

    const findId = await bugSchema.bugInfo.findById(id).populate("comment");

    if (!findId) return res.status(404).json({ error: "User not found" });

    const getComments = findId.comment.find(
      (c) => c._id.toString() === commentId
    );

    if (!getComments)
      return res.status(404).json({ error: "No comment found" });

    res.status(200).json(getComments);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching comment " + error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const person = req.cookies.UserId;

    const decoded = jwt.verify(person, process.env.USER_TOKEN_SECRET);
    const user = decoded.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid id" });
    }

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const findAndMake = await bugSchema.bugInfo.findById(id);

    if (!findAndMake) return res.status(404).json({ error: "User not found" });

    const foundPerson = await userInfo.findById(user);
    
    const newComment = new bugSchema.commentsModel({
      name: foundPerson._id,
      content: content,
      bugId: findAndMake._id,
      createdOn: new Date()
    });
    
    await newComment.save();

    const create = await bugSchema.bugInfo.updateOne(
      { _id: id },
      {
        $push: { comment: newComment._id },
      }
    );

    if (!create.matchedCount)
      return res.status(404).json({ error: "Nothing has been found" });

    res.status(200).json({message: "you have made an new Comment"});

    // content: content,
    // createdOn: new Date()
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating comment " + error.message });
  }
};

export default {
  commentList,
  findComment,
  createComment,
};
