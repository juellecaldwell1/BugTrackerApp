import bugSchema from "../Model/bugSchema.js";

const SearchBugItems = async (req, res) => {
  try {
    const { keywords, classification, maxAge, minAge, closed, sortBy } =
      req.query;

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;

    const skip = (page - 1) * pageSize;

    const match = {};

    if (keywords) {
      match.$text = { $search: keywords };
    }
    if (classification) {
      match.classification = classification;
    }

    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const pastMaximumDaysOld = new Date(today);
    pastMaximumDaysOld.setDate(pastMaximumDaysOld.getDate() - maxAge);
    const pastMinimumDaysOld = new Date(today);
    pastMinimumDaysOld.setDate(pastMinimumDaysOld.getDate() - minAge);
    if (maxAge && minAge) {
      match.createdOn = { $lte: pastMinimumDaysOld, $gte: pastMaximumDaysOld };
    } else if (minAge) {
      match.createdOn = { $lte: pastMinimumDaysOld };
    } else if (maxAge) {
      match.createdOn = { $gte: pastMaximumDaysOld };
    }

    if (closed === "true") {
      match.closed = true;
    }
    if (closed === "false") {
      match.closed = false;
    }

    const sorting = {};

    if (sortBy === "newest") {
      sorting.createdOn = -1;
    } else if (sortBy === "oldest") {
      sorting.createdOn = 1;
    } else if (sortBy === "title") {
      sorting.title = 1;
    } else if (sortBy === "classification") {
      sorting.classification = 1;
      sorting.createdOn = -1;
    } else if (sortBy === "assignedTo") {
      sorting.assignedTo = 1;
    } else if (sortBy === "createdBy") {
      sorting.createdBy = 1;
    } else {
      sorting.newest = 1;
    }

    const pipe = [
      { $match: match },
      {
        $lookup: {
          from: "users",
          localField: "assignedTo",
          foreignField: "_id",
          as: "assigned",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "owner",
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "addedBy",
          foreignField: "_id",
          as: "addedBy",
        },
      },
    
      {
        $lookup: {
          from: "users",
          localField: "lastUpdatedBy",
          foreignField: "_id",
          as: "lastUpdatedBy",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "comment",
          foreignField: "_id",
          as: "comment",
        },
      },
      {
        $lookup: {
          from: "users",                  
          localField: "comment.name",     
          foreignField: "_id",            
          as: "userName"                
        }
      },
       {
       $lookup: {
        from: "bugsinfos",
        localField: "comment.bugId",
        foreignField: "_id",
        as: "bugInfo"
       }
       },
       {
        $lookup: {
          from: "testcases",
          localField: "testCases",
          foreignField: "_id",
          as: "testCases"
        }
       },
       {
        $lookup: {
          from: "users",
          localField: "testCases.createdBy",
          foreignField: "_id",
          as: "testCasesCreatedBy"
        }
       },
       {
        $lookup: {
          from: "users",
          localField: "assignedBy",
          foreignField: "_id",
          as: "assignedPerson",
        },
      },
       
      {
        $addFields: {
          "assignedTo.fullName": { $arrayElemAt: ["$assigned.fullName", 0] },
          "createdBy.fullName": { $arrayElemAt: ["$createdBy.fullName", 0] },
          "author.fullName": { $arrayElemAt: ["$owner.fullName", 0] },
          "addedBy.fullName": { $arrayElemAt: ["$addedBy.fullName", 0] },
          "lastUpdatedBy.fullName": {
            $arrayElemAt: ["$lastUpdatedBy.fullName", 0],
          },
          "createdBy.fullName": { $arrayElemAt: ["$createdBy.fullName", 0] },
          "comment.name": {$arrayElemAt: ["$userName", 0]},
          "comment.bugId": {$arrayElemAt: ["$bugInfo.title", 0]},
          "testCases.createdBy": {$arrayElemAt: ["$testCasesCreatedBy.fullName", 0]},
          "assignedBy.fullName": {$arrayElemAt: ["$assignedPerson.fullName", 0]}
        
          
        },
      },
      { $sort: sorting },
      { $skip: skip },
      { $limit: pageSize },
    ];

    const results = await bugSchema.bugInfo.aggregate(pipe);

    if (results.length === 0) {
      return res.status(404).send("No bugs found");
    }

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export default {
  SearchBugItems,
};
