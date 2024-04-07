import express from "express";
const app = express();
const PORT = 3000;

import connectToMongoose from "./db.js";
import cors from "cors";
app.use(cors());

connectToMongoose();

app.get("/", (req, res) => {
    res.send("Welcome to the Mern_Ecommerce backend..");
});


//--------> Custom Routes
import UserRoute from "./Routes/UserRoute.js";
app.use("/api/user", UserRoute);




//-----> STARTING THE SERVER
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))