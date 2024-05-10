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
    const [page, setPage] = useState(1);
    const limit = process.env.REACT_APP_API_LIMIT;
    const URL = `${process.env.REACT_APP_API_BASE_URL}/api/products?page=${page}&limit=${limit}`;


    // Fetching products data from api
    const fetchData = async () => {
        const response = await FetchProducts(URL);
        setProducts(response);

        let mainItems = [];

        if (productCategory.toLowerCase() === "all") {
            mainItems = response?.response?.productItems;
            setFilteredProducts(mainItems);
        } else {
            mainItems = response?.response?.productItems.filter(element => element.category === productCategory);
            setFilteredProducts(mainItems);
        }
        setLoading(false);
    };

    // Storing minPrice 
    const price = filteredProducts?.map(element => element.currentPrice);
    const minPrice = Math.min(...price);

    // Storing discounts
    const discount = filteredProducts?.map(element => parseInt(element.discount));
    const minDiscount = Math.min(...discount);


    // Storing Colors
    let colors = [];
    filteredProducts?.forEach(element => colors.push(element.varients.color));
    const uniqueColors = Array.from(new Set(colors));

    // Storing Sizes
    let size = [];
    filteredProducts?.forEach(element => size.push(element.varients.size));
    const mergedSize = size.flat().filter((item, index, self) => self.indexOf(item) === index);
    const uniqueSize = Array.from(new Set(mergedSize));

    // Storing categories
    const categories = [];
    filteredProducts?.forEach(element => categories.push(element.category));
    const uniqueCategory = Array.from(new Set(categories));

    // Storing Ratings
    const ratings = [];
    filteredProducts?.forEach(element => ratings.push(element.ratings));
    const uniqueRatings = Array.from(new Set(ratings));

    // Pushing all the pages in array
    const allPages = [];
    for (let i = 0; i <= parseInt(products?.response?.totalPages); i++) {
        allPages.push(i);
    }

    // taking 3 pages numbers
    const slicedPages = allPages.slice(1, 4);


    // Handling Next Page
    const handleNextPage = () => {
        window.scroll(0, 0)
        setPage(page + 1);
    }
    // Handling Prev Page
    const handlePrevPage = () => {
        window.scroll(0, 0)
        setPage(page - 1);
    }

    // Handling Last Page
    const handleLastPage = () => {
        window.scroll(0, 0);
        setPage(products?.response?.totalPages)
    }

    // Handling Other Page
    const handleOtherPage = (element) => {
        window.scroll(0, 0);
        setPage(parseInt(element));
    }


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
                        <h2 className="option-title">Categories</h2>
                        {uniqueCategory?.map((element, index) => (
                            <div key={index} className="main-value flex align-items"><label htmlFor={`${index}`}>{element}</label><input type="checkbox" id={`${index}`} className="checkbox" /> </div>
                        ))}
                    </div>
                    <div className="Option-items align-items">
                        <h2 className="option-title">Sort</h2>
                        <div className="main-value flex align-items">
                            <select defaultProps="Select">
                                <option disabled selected >Sort by Price</option>
                                <option>Lowest to Highest</option>
                                <option>Highest to Lowest</option>
                            </select>
                        </div>
                        <div className="main-value flex align-items"><label htmlFor="Sort">Sort By Name</label><input type="checkbox" id="Sort" className="checkbox" /> </div>
                        <div className="main-value flex align-items"><label htmlFor="A-to-Z">A to Z</label><input type="checkbox" id="A-to-Z" className="checkbox" /> </div>
                    </div>
                    <div className="Option-items align-items">
                        <h2 className="option-title">Price</h2>
                        <div className="main-value flex align-items"><label htmlFor="priceOne">Under ₹{minPrice + 50}</label><input type="checkbox" id="priceOne" className="checkbox" /> </div>
                        <div className="main-value flex align-items"><label htmlFor="priceTwo">Under ₹{minPrice + 100}</label><input type="checkbox" id="priceTwo" className="checkbox" /> </div>
                        <div className="main-value flex align-items"><label htmlFor="priceThree">Under ₹{minPrice + 200}</label><input type="checkbox" id="priceThree" className="checkbox" /> </div>
                        <div className="main-value flex align-items"><label htmlFor="priceFour">Under ₹{minPrice + 400}</label><input type="checkbox" id="priceFour" className="checkbox" /> </div>
                    </div>
                    <div className="Option-items align-items">
                        <h2 className="option-title">Color</h2>
                        <div className="color-wrapper flex flex-wrap">
                            {uniqueColors?.map((element, index) => (
                                <div key={index} style={{ backgroundColor: `${element}` }} className="colorItems"></div>
                            ))}
                        </div>
                    </div>
                    <div className="Option-items align-items">
                        <h2 className="option-title">Discount</h2>
                        <div className="main-value flex align-items"><label htmlFor="discountOne">Under {minDiscount}%</label><input type="checkbox" id="discountOne" className="checkbox" /> </div>
                        <div className="main-value flex align-items"><label htmlFor="discountTwo">Under {minDiscount + 10}%</label><input type="checkbox" id="discountTwo" className="checkbox" /> </div>
                        <div className="main-value flex align-items"><label htmlFor="discountThree">Under {minDiscount + 15}%</label><input type="checkbox" id="discountThree" className="checkbox" /> </div>
                        <div className="main-value flex align-items"><label htmlFor="discountFour">Under {minDiscount + 20}%</label><input type="checkbox" id="discountFour" className="checkbox" /> </div>
                    </div>
                    <div className="Option-items align-items">
                        <h2 className="option-title">Size</h2>
                        {uniqueSize?.map((element, index) => (
                            <div key={index} className="main-value flex align-items"><label htmlFor={`${index}`}>{element}</label><input type="checkbox" id={`${index}`} className="checkbox" /> </div>
                        ))}
                    </div>
                    <div className="Option-items align-items">
                        <h2 className="option-title">Ratings</h2>
                        {uniqueRatings?.map((element, index) => (
                            <div key={index} className="main-value flex align-items"><label htmlFor={`${index}`}>{element}</label><input type="checkbox" id={`${index}`} className="checkbox" /> </div>
                        ))}
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
                            <button disabled={page <= 1 ? true : false} className={`pagination-btn next ${page <= 1 ? "disabled-btn" : ""}`} onClick={handlePrevPage}><FontAwesomeIcon icon={faArrowLeft} /></button>
                            {slicedPages?.map((element, index) => (
                                <button onClick={() => { handleOtherPage(element) }} className={`pagination-btn ${element === products?.response?.currentPage ? "active-page" : ""}`} key={index}>{element}</button>
                            ))
                            }
                            <button onClick={handleLastPage} className='pagination-btn'>... {products?.response?.totalPages}</button>
                            <button disabled={page >= products?.response?.totalPages ? true : false} className={`pagination-btn next ${page >= products?.response?.totalPages ? "disabled-btn" : ""}`} onClick={handleNextPage}><FontAwesomeIcon icon={faArrowRight} /></button>
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