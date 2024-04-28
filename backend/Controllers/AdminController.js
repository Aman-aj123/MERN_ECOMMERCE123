import ProductSchema from "../Models/Products.js";


//--------> Handling addProduct Action
const addProduct = async (req, res) => {
    // destructuring all the properties from "req.body"
    const {
        title,
        description,
        aboutProduct,
        currentPrice,
        oldPrice,
        inStock,
        discount,
        ratings,
        category,
        color,
        size,
        quantity,
        images
    } = req.body;

    const mainAboutProduct = aboutProduct.split("#").filter(e => e !== "");
    const trimmedSize = size.trim().split(",").map(itm => itm.trim());
    const trimmedImages = images.trim().split("#").filter(itm => itm!== "");

    try {
        const Product = await ProductSchema.create({
            title: title,
            description: description,
            aboutProduct: mainAboutProduct,
            currentPrice: currentPrice,
            oldPrice: oldPrice,
            inStock: inStock,
            discount: discount,
            ratings: ratings,
            category: category,
            varients: {
                color: color,
                size: trimmedSize
            },
            quantity: quantity,
            images: trimmedImages
        });

        return res.status(200).json({ sucess: true, message: "Product is created sucessfully..", Product })
    } catch (error) {
        console.log(`Some Internal server error occurs while adding product with: ${error}`);
        return res.status(500).json({ sucess: false, error: "Some Internal Server occurs while adding product..." });
    }
};



//--------> Handling Update Product Action
const updateProduct = async (req, res) => {
    try {
        const Product = await ProductSchema.findById(req.params.productId);

        if (!Product) {
            return res.status(400).json({ sucess: false, error: `Product Not found with this id: ${req.params.productId} ` });
        };

        // destructuring all the properties from "req.body"
        const {
            title,
            description,
            aboutProduct,
            currentPrice,
            oldPrice,
            inStock,
            discount,
            ratings,
            category,
            color,
            size,
            quantity,
            images
        } = req.body;


        const mainAboutProduct = aboutProduct.split("#").filter(e => e !== "");
        const trimmedSize = size.trim().split(",").map(itm => itm.trim());
        const trimmedImages = images.trim().split("#").filter(itm => itm !== "");

        // Updated Product
        const updatedProduct = {
            title: title,
            description: description,
            aboutProduct: mainAboutProduct,
            currentPrice: currentPrice,
            oldPrice: oldPrice,
            inStock: inStock,
            discount: discount,
            ratings: ratings,
            category: category,
            varients: {
                color: color,
                size: trimmedSize
            },
            quantity: quantity,
            images: trimmedImages
        }

        const savedProduct = await ProductSchema.findByIdAndUpdate(req.params.productId, { $set: updatedProduct }, { new: true });

        return res.status(200).json({ sucess: true, message: "Products has been sucessfully updated..", savedProduct })

    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).json({ success: false, error: `Product not found with id: ${req.params.productId}` });
        }

        console.log(`Some Internal server error occurs while Updating product with: ${error}`);
        return res.status(500).json({ sucess: false, error: "Some Internal Server error occurs while Updating product.." });
    }
};



//--------> Handling Update Product Action
const deleteProduct = async (req, res) => {
    try {
        const Product = await ProductSchema.findById(req.params.productId);
        if (!Product) {
            return res.status(400).json({ sucess: false, error: `Product Not found with this id: ${req.params.productId} ` });
        };

        // deleting the product
        await ProductSchema.findByIdAndDelete(req.params.productId);

        return res.status(200).json({ sucess: true, message: "Product is sucessfully deleted", deletedProduct: Product });

    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).json({ success: false, error: `Product not found with id: ${req.params.productId}` });
        }

        console.log(`Some Internal server error occurs while Deleting product with: ${error}`);
        return res.status(500).json({ sucess: false, error: "Some Internal Server error occurs while Deleting product.." });
    }
};




export { addProduct, updateProduct, deleteProduct }