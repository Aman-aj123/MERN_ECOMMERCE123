import "./AllProducts.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";

import FetchProducts from "../../Api/Fetch_Products"

import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';



const AllProducts = ({ productCategory }) => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lowestPrice, setLowestPrice] = useState([]);
    const [highestPrice, setHighestPrice] = useState([]);
    const [page, setPage] = useState(1);
    const limit = process.env.REACT_APP_API_LIMIT;
    const URL = `${process.env.REACT_APP_API_BASE_URL}/api/products?page=page&limit=${limit}`;


    const fetchData = async () => {
        const response = await FetchProducts(URL);
        setProducts(response);

        let mainItems = [];

        if (productCategory.toLowerCase() === "all") {
            mainItems = response?.response?.productItems;
            setFilteredProducts(mainItems);
        } else {
            mainItems = response?.response.productItems.filter(element => element.category === productCategory);
            setFilteredProducts(mainItems);
        }

        const mainLowestPrice = response?.response?.productItems.sort((a,b)=> a.currentPrice - b.currentPrice);
        const mainHighestPrice = response?.response?.productItems.sort((a,b)=> b.currentPrice - a.currentPrice);


        setLowestPrice(mainLowestPrice[0].currentPrice);
        setHighestPrice(mainHighestPrice[0].currentPrice);

        setLoading(false);
    };

    const allPages = [];
    for (let i = 0; i <= products?.response?.totalPages.length; i++) {
        allPages.push(i);
        allPages.push(i);
    }

    const slicedPages = allPages.slice(0, 3);


    const handleNextPage = () => {

    }

    const handlePrevPage = () => {

    }

    const handleLastPage = () => {
    }

    const handleOtherPage = () => {

    }

    console.log(`highest Price is: ${highestPrice}`)
    console.log(`Lowest Price is : ${lowestPrice}`)

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [page]);

    

    return (

        <div className="Main-wrapper w-full flex">
            {/* Left Side  */}
            <div className="left-side">
                <div className="Option-wrapper w-full">
                    <div className="Option-items align-items">
                        <h2 className="option-title">Sort</h2>
                        <div className="main-value flex align-items">
                            <select>
                                <option disabled selected >Select</option>
                                <option>Lowest to Highest</option>
                                <option>Highest to Lowest</option>
                            </select>
                        </div>
                        <div className="main-value flex align-items"><label for="price">Sort By Name</label><input type="checkbox" id="price" className="checkbox" /> </div>
                        <div className="main-value flex align-items"><label for="price">A to Z</label><input type="checkbox" id="price" className="checkbox" /> </div>
                    </div>
                    <div className="Option-items align-items">
                        <h2 className="option-title">Price</h2>
                        <div className="main-value flex align-items"><label for="price">₹{lowestPrice} to ₹{highestPrice - 100}</label><input type="checkbox" id="price" className="checkbox" /> </div>
                        <div className="main-value flex align-items"><label for="price">₹{lowestPrice} to ₹{highestPrice - 200}</label><input type="checkbox" id="price" className="checkbox" /> </div>
                        <div className="main-value flex align-items"><label for="price">₹{lowestPrice} to ₹{highestPrice - 600}</label><input type="checkbox" id="price" className="checkbox" /> </div>
                    </div>
                    <div className="Option-items align-items">
                        <h2 className="option-title">Price</h2>
                        <div className="main-value flex align-items"><label for="price">₹100 to ₹5000</label><input type="checkbox" id="price" className="checkbox" /> </div>
                        <div className="main-value flex align-items"><label for="price">₹100 to ₹5000</label><input type="checkbox" id="price" className="checkbox" /> </div>
                        <div className="main-value flex align-items"><label for="price">₹100 to ₹5000</label><input type="checkbox" id="price" className="checkbox" /> </div>
                    </div>
                </div>
            </div>

            {/* Right Side  */}
            <div className="right-side">
                <div className="flex flex-wrap w-full" id="productContainer">
                    {loading &&
                        <div className="main-loading-wrapper flex-box">
                            <img src="https://assets-v2.lottiefiles.com/a/53b80118-1161-11ee-b538-4f02e47c3050/EtQmNhvlO1.gif" />
                        </div>}
                    <h4 className='result-title'>{filteredProducts.length} Results</h4>
                    <div className="allProduct-wrapper">
                        {filteredProducts?.map((element, index) => (
                            <Link className="productItems" key={index}>
                                <div className="product-image">
                                    <img src={element?.images[0]} alt={`Product ${index}`} />
                                </div>
                                <div className="product-text">
                                    <p className="product-discount">{element?.discount} Off</p>
                                    <h2 className="product-title">{element.title.slice(0, 50)}...</h2>
                                    <div className="price-wrapper flex">
                                        <h3 className="product-price">₹ {element.currentPrice}</h3>
                                        <h3 className="product-price oldPrice">₹ {element.oldPrice}</h3>
                                    </div>
                                    <p className="product-ratings">{element?.ratings} ratings</p>
                                </div>
                            </Link>
                        ))
                        }
                    </div>

                    {/* Pagination  */}
                    <div className='pagination'>
                        <h4 className="pagination-title">Pagination</h4>
                        <div className="pagination-wrapper">
                            <button disabled={page <= 1 ? true : false} className={`pagination-btn next ${page <= 1 ? "disabled-btn" : ""}`} onClick={handlePrevPage}><i className="fas fa-angle-left"></i></button>
                            {slicedPages.map((element, index) => (
                                <button onClick={() => { handleOtherPage(element) }} className={`pagination-btn ${element === products?.response?.currentPage ? "active-page" : ""}`} key={index}>{element}</button>
                            ))
                            }
                            <button onClick={handleLastPage} className='pagination-btn'>... {products?.response?.totalPages}</button>
                            <button disabled={page >= products?.response?.totalPages ? true : false} className={`pagination-btn next ${page >= products?.response?.totalPages ? "disabled-btn" : ""}`} onClick={handleNextPage}><i className="fas fa-angle-right"></i></button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}


AllProducts.defaultProps = {
    productCategory: "all"
}

export default AllProducts;