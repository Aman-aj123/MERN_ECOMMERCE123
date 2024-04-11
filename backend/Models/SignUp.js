import mongoose from "mongoose";
import { Schema, model } from "mongoose";

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
    },
    role: {
        type: String,
        required: true,
        default: "user"
    }
},
    {
        timestamps: true
    }
);


const SignUpSchema = mongoose.model("SignUP", SignUpModel);

export default SignUpSchema;