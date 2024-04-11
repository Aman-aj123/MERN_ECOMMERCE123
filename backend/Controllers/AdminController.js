import ProductSchema from "../Models/Products.js";

const addProduct = async (req, res) => {
    const { title, description, aboutProduct, currentPrice, oldPrice, inStock, discount, ratings, category, color, size, quantity, images } = req.body;

    const mainAboutProduct = aboutProduct.split("#").filter(e => e !== "");
    const trimmedSize = size.trim().split(",").map(itm => itm.trim());
    const trimmedImages = images.trim().split(",").map(itm => itm.trim());

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


export { addProduct }