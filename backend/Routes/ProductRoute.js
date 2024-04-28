import express from "express"
const router = express.Router();

import { getAllProduct } from "../Controllers/ProductController.js";

router.get("/", getAllProduct);


export default router;