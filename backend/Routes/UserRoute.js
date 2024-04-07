import dotenv from "dotenv";
dotenv.config();

import express from "express";
const router = express.Router();

import { SignUp, Login } from "../Controllers/Usercontroller.js";


router.post("/auth/signup", SignUp);
router.post("/auth/login", Login);


export default router;