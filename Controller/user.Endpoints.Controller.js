import userInfo from "../Model/userSchema.js";

const SearchUserItems = async (req, res) => {
  try {
    const { keywords, role, sortBy, minCreated, maxCreated } = req.query;

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;
    const skip = (page - 1) * pageSize;

    const matched = {};
    const sorted = {};

    if (keywords) {
      matched.$text = { $search: keywords };
    }

    if (role) {
      matched.role = role;
    }

    if (sortBy === "givenname") {
      sorted.givenName = 1;
      sorted.familyName = 1;
      sorted.createdOn = 1;
    } else if (sortBy === "familyname") {
      sorted.familyName = 1;
      sorted.givenName = 1;
      sorted.createdOn = 1;
    } else if (sortBy === "role") {
      sorted.role = 1;
      sorted.givenName = 1;
      sorted.familyName = 1;
      sorted.createdOn = 1;
    } else if (sortBy === "newest") {
      sorted.createdOn = -1;
    } else if (sortBy === "oldest") {
      sorted.createdOn = 1;
    } else {
      sorted.givenName = 1;
    }
   

    const today = new Date(); 
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0); 
    const pastMaximumDaysOld = new Date(today);
    pastMaximumDaysOld.setDate(pastMaximumDaysOld.getDate() - maxCreated);
    const pastMinimumDaysOld = new Date(today);
    pastMinimumDaysOld.setDate(pastMinimumDaysOld.getDate() - minCreated); 
    if(maxCreated && minCreated) {
    matched.createdOn = {$lte:pastMinimumDaysOld, $gte:pastMaximumDaysOld};
    } else if(minCreated) {
    matched.createdOn = {$lte:pastMinimumDaysOld};
    } else if(maxCreated) {
    matched.createdOn = {$gte:pastMaximumDaysOld};
    }

    const pipeLine = [
      { $match: matched },
      { $sort: sorted },
      { $skip: skip },
      { $limit: pageSize },
    ];

    const searchResults = await userInfo.aggregate(pipeLine);


    if (searchResults.length === 0 ) {
      return res.status(404).json({ error: "No search results found" });
    }

    res.status(200).json(searchResults);
  } catch (err) {
    res.status(500).send({ message: "error error " + err.message });
  }
};

export default {
  SearchUserItems,
};
