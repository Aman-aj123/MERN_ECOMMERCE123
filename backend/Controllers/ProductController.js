import ProductSchema from "../Models/Products.js";

const getAllProduct = async (req, res) => { 
    const products = await ProductSchema.find({});
    res.send(products);
};



export { getAllProduct };