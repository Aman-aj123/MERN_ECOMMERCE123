
import CartSchema from "../Models/Cart.js"
const AddToCart = async (req, res) => {
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

    try {
        const Product = await CartSchema.create({
            user: req.user.id,
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
        return res.status(200).json({ sucess: true, message: "Product sucessfully added in cart...", Product });
    } catch (error) {
        console.log(`Some Internal server error occurs while Adding product to cart with : ${error}`);
        return res.status(500).json({ sucess: false, error: "Some Internal server occurs while adding product in cart..." });
    };
}

const FetchAllCarts = async (req, res) => {
    try {
        const CartProducts = await CartSchema.find({ user: req.user.id });
        res.status(200).json({sucess: true, message: "Sucessfully cart fetched...", CartProducts});
    } catch (error) {
        console.log(`Some Internal Server Occurs while fetching carts with: ${error}`);
        return res.status(500).json({ sucess: false, error: "Some Internal Server error occurs while fetching carts" })
    }
}

export { AddToCart, FetchAllCarts };