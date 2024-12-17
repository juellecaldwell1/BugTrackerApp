import jwt from "jsonwebtoken";
import userInfo from "../Model/userSchema.js";
import tokens from "../Controller/JwtTokens/tokens.js";
import dotenv from "dotenv";
import ROLES_LIST from "../Config/roles.list.js";
dotenv.config();

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.AccessToken;

    if (!token) {
      res.clearCookie("AccessToken");
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err.message);
        req.user = null;
        res.clearCookie("AccessToken");

        return res.status(403).json({ message: "Invalid token" });
      }

      let user = await userInfo.findById(decoded.id);

      if (!user) {
        res.clearCookie("AccessToken");
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    });
  } catch (err) {
    res.clearCookie("AccessToken");
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

const verifyRefreshToken = async (req, res, next) => {
  next();
  // try {
  //     const accessToken = req.cookies.AccessToken;
  //     const refreshToken = req.cookies.RefreshToken;

  //     if (accessToken) {
  //       next();
  //     }

  //     if (!accessToken) {
  //       if (!refreshToken)
  //       return res.status(404).json({ error: "You are UnAuthorized Go Back" });
  //     }

  //       console.log("going to verify refresh token");

  //       jwt.verify(
  //         refreshToken,
  //         process.env.REFRESH_TOKEN_SECRET,
  //         async (err, decoded) => {
  //           if (err) {
  //             console.log(
  //               "The refresh token might be invalid Look Here; " + err.message
  //             );
  //             return res.status(403).json({ message: "Invalid Refresh token" });
  //           }
  //           const userId = req.cookies.UserId;
  //           console.log("userID " + userId);
  //           try {
  //             const antiCoded = jwt.verify(userId, process.env.USER_TOKEN_SECRET);

  //             const personId = antiCoded.id;

  //             const user = await userInfo.findById(personId);
  //             if (!user)
  //               return res.status(404).json({ message: "User Not found" });

  //             console.log("The users full name is: " + user.fullName);
  //             const aToken = await tokens.createAccessToken(user._id);
  //             tokens.sendAccessToken(res, aToken);
  //             console.log("This is the access token: " + aToken);
  //             console.log("You have made a new access token congrats");
  //             return next();
  //           } catch (err) {
  //             console.log("Theres an error here: " + err);
  //             res.status(404).json({ error: "The token is expired" });
  //             return next();
  //           }
  //         }
  //       );

  //   } catch (err) {
  //     res.clearCookie("UserId");
  //     console.log("Heres and error look here " + err.message);
  //     res.status(500).json({ message: err.message });
  //   }
};

const CheckRoles = (checkRole) => {
  return async (req, res, next) => {
    try {
      const UserInformation = req.cookies.UserId;

      if (!UserInformation) {
        return res.status(404).json({ error: "There is no user logged in" });
      }

      const person = jwt.verify(UserInformation, process.env.USER_TOKEN_SECRET);
      const personId = person.id;

      const user = await userInfo.findById(personId);
      if (!user) {
        return res.status(404).json({ error: "User Not found" });
      }

      const userRole = user.role;
      const userPermissions = ROLES_LIST[userRole];

      if (!userPermissions) {
        return res
          .status(403)
          .json({ error: "You do not have the permissions to do this task" });
      }

      if (
        Array.isArray(userPermissions) &&
        userPermissions.includes(checkRole)
      ) {
        console.log("The permission is granted");
        return next();
      } else {
        console.log("permission has not been granted");
        return next();
      }
    } catch (error) {
      console.log("There was an error with your roles: " + error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while checking permissions: ", error });
    }
  };
};

export default {
  protectRoute,
  verifyRefreshToken,
  CheckRoles,
};
