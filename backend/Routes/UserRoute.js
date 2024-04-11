import dotenv from "dotenv";
dotenv.config();

import express from "express";
const router = express.Router();

import { SignUp, Login, GetUser, UpdateUser } from "../Controllers/Usercontroller.js";
import authenticateUser from "../Middlewares/authentication.js"


router.post("/auth/signup", SignUp);
router.post("/auth/login", authenticateUser, Login);
router.post("/auth/getuser", authenticateUser, GetUser);

router.put("/updateuser/:userId", authenticateUser, UpdateUser);

export default router;