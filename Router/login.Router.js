import express from "express";
import login from "../Controller/login.Controller.js";
const loginRoute = express.Router();

loginRoute.post("/user/login", login);

export default loginRoute;
