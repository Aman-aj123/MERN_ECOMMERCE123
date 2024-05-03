import ProductsContext from "./ProductsContext";


const ProductsState = (props) => {
    const hellow = "I am hellow world";

    return (
        <ProductsContext.Provider value={{ hellow }}>
            {props.children}
        </ProductsContext.Provider>
    );
}

export default ProductsState;

