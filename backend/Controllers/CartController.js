import SignUpSchema from "../Models/SignUp.js";

//--------> Control if the product is added in cart
const addProduct = async (req, res) => {
    const userId = req.user.id;

    try {

        // If the user doesn't exist
        const hasUser = await SignUpSchema.findById(userId);
        if (!hasUser) {
            return res.status(400).json({ sucess: false, error: "Not found.." });
        };
        

        // Extracting all the products details form the req body
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

        // Final product
        const finalProduct = {
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
 
        // Adding the product in cart
        hasUser.cart.push(finalProduct);
        await hasUser.save();

        console.log(hasUser)

        console.log(`Products is Sucessfully added in your cart`);
        return res.status(200).json({sucess: true, message: "Products is sucessfully added in your cart", AddedProduct: finalProduct});

    } catch (error) {
        console.log(`Some Error occurs while adding product in cart with : ${error}`);
        return res.status(500).json({ sucess: false, error: "Some error occurs while adding product in your cart..." });
    };


};


export { addProduct };