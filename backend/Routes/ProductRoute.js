import express from "express"
const router = express.Router();

import { getAllProduct, getProductByCategory, getProductByQuery } from "../Controllers/ProductController.js";

router.get("/", getAllProduct);
router.get("/category/:category", getProductByCategory);
router.get("/query", getProductByQuery);



export default router;