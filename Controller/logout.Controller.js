import sendUserActivity from "../Config/mail.Sender.js";

const logoutController = async (req, res) => {
  try {

    res.clearCookie("UserInfo", {
      path: "/", 
      httpOnly: true, 
      secure: true, 
    });
    res.clearCookie("AccessToken", {
      path: "/",
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({ message: "You have logged out" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Logout failed. Please try again." });
  }
};

export default logoutController;
