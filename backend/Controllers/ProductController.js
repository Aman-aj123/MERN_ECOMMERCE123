import ProductSchema from "../Models/Products.js";

//----------> Getting all the products
const getAllProduct = async (req, res) => {
    try {
        const products = await ProductSchema.find({});

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const totalPages = Math.ceil(products.length / limit);
        const currentPage = page;
        const totalResults = products.length;
        const paginatedProducts = products.slice(startIndex, endIndex);
        const response = {
            totalPages,
            currentPage,
            totalResults,
            productItems: paginatedProducts
        };
        return res.status(200).json({ sucess: true, response });

    } catch (error) {
        console.log(`Some error occurs while getting allProducts with: ${error}`);
        return res.status(500).json({ sucess: false, error: "Some Internal server error occurs while getting allProducts.." });
    };
};


//---------> Getting Products with specific category
const getProductByCategory = async (req, res) => {
    try {
        const allProducts = await ProductSchema.find({});

        // Extracting the category value from request params
        const { category } = req.params;

        // Filtering the products based on category value
        const products = allProducts.filter(item => item.category === category);

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const totalPages = Math.ceil(products.length / limit);
        const currentPage = page;
        const totalResults = products.length;
        const paginatedProducts = products.slice(startIndex, endIndex);
        const response = {
            totalPages,
            currentPage,
            totalResults,
            productItems: paginatedProducts
        };
        return res.status(200).json({ sucess: true, response });

    } catch (error) {
        console.log(`Some error occurs while getting product with category with: ${error}`);
        return res.status(500).json({ sucess: false, error: "Some internal server error occurs while getting product with category.." });
    }
};


//----------> Getting Products with Query
const getProductByQuery = async (req, res) => {
    try {

        const allProducts = await ProductSchema.find({});

        const productQuery = req.query.search;

        // Filter all the products based on the query
        const products = allProducts.filter(item => item.title.toLowerCase().includes(productQuery.toLowerCase()));

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const totalPages = Math.ceil(products.length / limit);
        const currentPage = page;
        const totalResults = products.length;
        const paginatedProducts = products.slice(startIndex, endIndex);
        const response = {
            totalPages,
            currentPage,
            totalResults,
            productItems: paginatedProducts
        };
        return res.status(200).json({ sucess: true, response });

    } catch (error) {
        console.log(`Some Error occurs while getting products with Query with: ${error}`);
        return res.status(500).json({ sucess: false, error: "Some Internal server occurs while getting product with Query.." });
    };
};



export { getAllProduct, getProductByCategory, getProductByQuery };