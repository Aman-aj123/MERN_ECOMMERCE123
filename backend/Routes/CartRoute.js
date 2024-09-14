import express from "express";
import { AddToCart, FetchAllCarts } from "../Controllers/CartController.js";
import authentication from "../Middlewares/authentication.js";
const router = express.Router();

router.get("/", authentication, FetchAllCarts);
router.post("/addcart", authentication, AddToCart);

export default router;