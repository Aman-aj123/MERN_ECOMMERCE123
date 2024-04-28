import express from "express";
const app = express();
const PORT = 3000;

import connectToMongoose from "./db.js";
import cors from "cors";
app.use(cors());
app.use(express.json());

// Connecting to mongodb database
connectToMongoose();

app.get("/", (req, res) => {
    res.send("Welcome to the Mern_Ecommerce backend..");
});


//--------> Custom Routes
import UserRoute from "./Routes/UserRoute.js";
import adminRoute from "./Routes/adminRoute.js";
import CartRoute from "./Routes/CartRoute.js";
import ProductRoute from "./Routes/ProductRoute.js"

app.use("/api/user", UserRoute);
app.use("/api/admin", adminRoute);
app.use("/api/cart", CartRoute);
app.use("/api/products", ProductRoute)



//-----> STARTING THE SERVER
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));                             