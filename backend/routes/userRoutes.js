import express from "express";
import { loginUser, signupUser } from "../controllers/userController.js";

const router = express.Router();

//Login Route
router.route("/login").post(loginUser);

//Signup Route
router.post("/signup", signupUser);

export default router;
