import mongoose from "mongoose";
import { Schema } from "mongoose";

const SignUpModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        requied: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        timeStamps: true
    }
);


const SignUpSchema = mongoose.model("SignUP", SignUpModel);

export default SignUpSchema;