import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const ProductsModel = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    aboutProduct: {
        type: Array,
    },
    currentPrice: {
        type: Number,
        required: true
    },
    oldPrice: {
        type: Number
    },
    inStock: {
        type: Boolean,
        required: true
    },
    discount: {
        type: String
    },
    ratings: {
        type: Number
    },
    category: {
        type: String,
        required: true
    },
    varients: {
        color: String,
        size: Array
    },
    quantity: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        required: true
    }

}, {
    timestamps: true
});


const ProductSchema = mongoose.model("Products", ProductsModel);

export default ProductSchema;