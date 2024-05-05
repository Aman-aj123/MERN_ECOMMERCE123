const FetchProducts = async (url) => {
    try {
        const data = await fetch(url);
        const response = await data.json();

        return response;
    } catch (error) {
        console.log(`Some error occurs while Fetching products with: ${error}`);
    };
};


export default FetchProducts;