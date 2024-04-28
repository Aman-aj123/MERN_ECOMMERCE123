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
    },
    cart: {
        type: [{
            title: String,
            description: String,
            aboutProduct: Array,
            currentPrice: Number,
            oldPrice: Number,
            inStock: Boolean,
            discount: String,
            ratings: Number,
            category: String,
            varients: {
                color: String,
                size: Array
            },
            quantity: Number,
            images: Array
        }],
        default: []
    }
},
    {
        timestamps: true
    }
);


const SignUpSchema = mongoose.model("SignUP", SignUpModel);

export default SignUpSchema;