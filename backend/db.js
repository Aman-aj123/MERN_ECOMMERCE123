import dotenv from "dotenv"
dotenv.config();

import Mongoose from "mongoose";
const connectionURI = process.env.connectionURI;

const connectToMongoose = async ()=> {
    try{
        await Mongoose.connect(connectionURI);
        console.log("Connection Sucessful to Mongodb...");
    } catch(error){
        console.log(`Some Error Occurs while connection with Mongodb with: ${error}`);

    };
        
};

export default connectToMongoose;