import dotenv from "dotenv";
dotenv.config();

import express from "express";
const router = express.Router();

import { SignUp, Login, GetUser, UpdateUser, DeleteUser } from "../Controllers/Usercontroller.js";
import authenticateUser from "../Middlewares/authentication.js"


router.post("/auth/signup", SignUp);
router.post("/auth/login", Login);
router.get("/auth/getuser", authenticateUser, GetUser);

router.put("/updateuser/:userId", authenticateUser, UpdateUser);
router.delete("/deleteuser/:userId", authenticateUser, DeleteUser);



export default router;