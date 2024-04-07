import express from "express";
const app = express();
const PORT = 3000;

import connectToMongoose from "./db.js";
connectToMongoose();

app.get("/", (req, res)=> {
res.send("Welcome to the Mern_Ecommerce backend..");
});


// STARTING THE SERVER
app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`))