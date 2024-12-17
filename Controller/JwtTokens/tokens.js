import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createAccessToken = async (id) => {
  try {
    const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    console.log("The was an error creating your access token " + error.message);
  }
};

const createRefreshToken = async (id) => {
  try {
    const token1 = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    return token1;
  } catch (error) {
    console.log(
      "There was and problem creating your refresh token " + error.message
    );
  }
};

const createUserToken = async (id) => {
  try {
    const token = jwt.sign({ id }, process.env.USER_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    console.log("There was an error creating your user token " + error.message);
  }
};



const sendAccessToken = async (res, accessToken) => {
  try {
    res.cookie("AccessToken", accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });
  } catch (error) {
    console.log(
      "The was an problem sending your cookie with your access token inside" +
        error
    );
  }
};

const sendRefreshToken = async (res, refreshToken) => {
  try {
    res.cookie("RefreshToken", refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });
  } catch (error) {
    console.log(
      "The was an problem sending your cookie with your refresh token inside" +
        error
    );
  }
};

const sendUserToken = async (res, id) => {
  try {
    res.cookie("UserId", id, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
  } catch (error) {
    console.log("There was an error sending your user token " + error.message);
  }
};



export default {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
  createUserToken,
  sendUserToken,

};
