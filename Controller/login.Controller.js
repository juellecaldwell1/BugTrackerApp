import userInfo from "../Model/userSchema.js";
import bcrypt from "bcryptjs";
import joiUserValidation from "./Joi.Validation/joi.User.Validation.js";
import tokens from "./JwtTokens/tokens.js";
import jwt from "jsonwebtoken";
import sendUserActivity from "../Config/mail.Sender.js";
const login = async (req, res) => {
  try {
    const { value, error } = joiUserValidation.userValidation3.validate(
      req.body
    );
    // if (error) {
    //   return res
    //     .status(400)
    //     .json({
    //       error: `There was an error with the email and password Look Here: ${error.details[0].message}`,
    //     });
    // }

    const { email, password } = value;

    if (!email || !password)
      return res
        .status(400)
        .json({ error: "Please enter your login credentials." });

    const user = await userInfo.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

  
    const match = await bcrypt.compare(password, user.password);

   console.log("The match is :", match)

    if (!match)
      return res.status(400).json({
        error: "Invalid login credential provided. Please try again.",
      });

    const accessToken = await tokens.createAccessToken(user._id);
    const refreshToken = await tokens.createRefreshToken(user._id);
    const userId = await tokens.createUserToken(user._id);

    tokens.sendAccessToken(res, accessToken);
    tokens.sendRefreshToken(res, refreshToken);
    tokens.sendUserToken(res, userId);

    res.status(200).json({
      welcome: "Welcome " + user.fullName + " Just now sent your cookies",
    });
    sendUserActivity(
      `User Logged In`,
      `${user.fullName} has successfully logged in and is now ready to contribute to the issue tracker and assist the community.`
    );
    
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json("There has been an login error please look here: " + error);
  }
};
export default login;
