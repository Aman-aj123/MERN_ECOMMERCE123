import dotenv from "dotenv"
dotenv.config();

import Mongoose from "mongoose";
const connectionURI = process.env.connectionURI;

const connectToMongoose = async ()=> {
console.log(`connectonURI is: ${connectionURI}`);
};

export default connectToMongoose;