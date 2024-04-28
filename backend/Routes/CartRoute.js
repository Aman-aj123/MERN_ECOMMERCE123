import express from "express";
const router = express.Router();

import authentication from "../Middlewares/authentication.js";
import { addProduct } from "../Controllers/CartController.js";

router.post("/addproduct", authentication, addProduct);


export default router;