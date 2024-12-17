import express from "express";
import loginRoute from "./Router/login.Router.js";
import userRouter from "./Router/user.Router.js";
import bugRouter from "./Router/bug.Route.js";
import cors from "cors";
import dotenv from "dotenv";
import ConnectToDatabase from "./Config/connectionDb.js";
import commentRouter from "./Router/comment.Router.js";
import testRouter from "./Router/testCases.Router.js";
import cookieParser from "cookie-parser";
import profileRouter from "./Router/user.Profile.Router.js";
import searchRouter from "./Router/search.Router.js";
import googleRouter from "./Router/google.Auth.Router.js";
import logout from "./Router/logout.Route.js";
dotenv.config();
const port = process.env.PORT
const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api", searchRouter);
app.use("/api", profileRouter);
app.use("/api", userRouter);
app.use("/api", loginRoute);
app.use("/api", bugRouter);
app.use("/api", commentRouter);
app.use("/api", testRouter);
app.use("/api", googleRouter);
app.use("/api", logout);

const startServer = async () => {
  try {
    await ConnectToDatabase();
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  } catch (error) {
    console.error("There was an error connecting to the database:", error.message);
  }
};

startServer();
