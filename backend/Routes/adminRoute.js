import express from "express";
const router = express.Router();

import isAdmin from "../Middlewares/isAdmin.js";
import authentication  from "../Middlewares/authentication.js";

import { addProduct, updateProduct, deleteProduct } from "../Controllers/AdminController.js";


router.post("/addproduct", authentication, isAdmin, addProduct);
router.put("/updateproduct/:productId", authentication, isAdmin, updateProduct);
router.delete("/deleteProduct/:productId", authentication, isAdmin, deleteProduct);


export default router;