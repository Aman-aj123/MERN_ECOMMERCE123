import express from "express";
const router = express.Router();

import isAdmin from "../Middlewares/isAdmin.js";
import authentication  from "../Middlewares/authentication.js";

import { addProduct } from "../Controllers/AdminController.js";


router.post("/addproduct", authentication, isAdmin, addProduct);


export default router;