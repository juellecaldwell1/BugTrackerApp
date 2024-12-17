import mongoose from "mongoose";
import userInfo from "./userSchema.js";

const comment = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    content: {
      type: String,
      required: true,
    },
    bugId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bugsInfo"
    },
    createdOn: {
      type: Date,
    },
    lastUpdated: {
      type: Date,
    }
  },
);

const edits = new mongoose.Schema(
  {
    changes: {
      col: {
        type: String,
        default: "users",
      },
      operation: {
        type: String,
        default: "update",
      },
      update: {
        type: Object,
        required: true,
      },
      target: {
        type: mongoose.Schema.Types.ObjectId
      }
    },
    createdOn: {
      type: Date,
    },
    lastUpdated: {
      type: Date,

    }
  },
);

const bugTestCases = new mongoose.Schema(
  {
    status: {
      type: String,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    createdOn: {
      type: Date,

    },
    lastUpdated: {
      type: Date,

    }
  },
);

const commentsModel = mongoose.model("comments", comment);
const editsModel = mongoose.model("edits", edits);
const testCases = mongoose.model("testCase", bugTestCases);

const bugInformation = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stepsToReproduce: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    classification: {
      type: String,
    },
    assignedTo: [ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    } ],
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
    resolvedDate: {
      type: Date,
    },
    stepsToFix: {
      type: String,
    },
    timeLogged: [ {
      type: Number,
    } ],
    softwareVersion: {
      type: String,
    },
    testCases: [ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "testCase",
    } ],
    bugEdits:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "edits",
    } ],
    closed: {
      type: Boolean,
    },
    closedOn: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    assignedOn: {
      type: Date,
    },
    closedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    classifiedOn: {
      type: Date,
    },
    classifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    createdOn: {
      type: Date,
    },
    lastUpdated: {
      type: Date
    }
  }
);

const bugInfo = mongoose.model("bugsInfo", bugInformation);

export default {
  bugInfo,
  commentsModel,
  editsModel,
  testCases,
};
