import "./AllProducts.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";

import FetchProducts from "../../Api/Fetch_Products"

import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


const AllProducts = () => {
 

    const navigate = useNavigate();


    const url = window.location.href;
    const searchParams = new URLSearchParams(url);

    // Extracting productCategory from the url
    const productCategory = searchParams.get('category');
    // Extracting pageQuery from the url
    const pageQuery = searchParams.get("page");

   

    //----> Defining useState variables
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(pageQuery === null ? 1 : parseInt(pageQuery));
    const limit = process.env.REACT_APP_API_LIMIT;

    const [category, setCategory] = useState(productCategory === null ? "all" : productCategory);
    const [allCategory, setAllCategory] = useState([]);

 


    //-------> Fetching products data from api
    const fetchData = async () => {
        setLoading(true);

        let URL = `${process.env.REACT_APP_API_BASE_URL}/api/products?page=${page}&limit=${process.env.REACT_APP_API_LIMIT}`;

        try {
            if (category === null || category === "all") {
                URL = `${process.env.REACT_APP_API_BASE_URL}/api/products?page=${page}&limit=${process.env.REACT_APP_API_LIMIT}`;
            } else {
                URL = `${process.env.REACT_APP_API_BASE_URL}/api/products/category/${category}?page=${page}&limit=${process.env.REACT_APP_API_LIMIT}`;
            }

            const response = await FetchProducts(URL);
            setProducts(response);


            setLoading(false);

        } catch (error) {
            console.log(`Some Error occurs while fetching data with: ${error}`);
        };
    };



    // Storing discounts
    const discount = [];
    products?.response?.productItems?.map(element => discount.push(element.discount));
    const uniqueDiscount = Array.from(new Set(discount));

    // Storing Colors
    let colors = [];
    products?.response?.productItems?.forEach(element => colors.push(element.varients.color));
    const uniqueColors = Array.from(new Set(colors));

    // Storing Sizes
    let size = [];
    products?.response?.productItems?.forEach(element => size.push(element.varients.size));
    const mergedSize = size.flat().filter((item, index, self) => self.indexOf(item) === index);
    const uniqueSize = Array.from(new Set(mergedSize));



    // Storing Ratings
    const ratings = [];
    products?.response?.productItems?.forEach(element => ratings.push(element.ratings));
    const uniqueRatings = Array.from(new Set(ratings));

    // Storing Prices 
    const prices = [];
    products?.response?.productItems?.forEach(element => prices.push(element.currentPrice));
    const uniquePrices = Array.from(new Set(prices));


    // Pushing all the pages in array
    const allPages = [];
    for (let i = 0; i <= parseInt(products?.response?.totalPages); i++) {
        allPages.push(i);
    }

    // taking 3 pages numbers
    const slicedPages = allPages.slice(1, 4);


    // Handling Next Page
    const handleNextPage = () => {
        navigate(`?category=${category}&page=${page + 1}`);
        setPage(page + 1);
    }
    // Handling Prev Page
    const handlePrevPage = () => {
        navigate(`?category=${category}&page=${page - 1}`);
        setPage(page - 1);
    }

    // Handling Last Page
    const handleLastPage = () => {
        navigate(`?category=${category}&page=${products?.response?.totalPages}`);
        setPage(products?.response?.totalPages);
    }

    // Handling Other Page
    const handleOtherPage = (element) => {
        navigate(`?category=${category}&page=${element}`);
        setPage(parseInt(element));
    }




    // Handling CategoryFilter
    const handleCategoryFilter = (element) => {
        setCategory(element);
    };



    useEffect(() => {
        setLoading(true);
        fetchData();

        // Setting the category
        FetchProducts(`${process.env.REACT_APP_API_BASE_URL}/api/products?page=${page}&limit=${limit}`)
            .then((response) => {
                const categories = [];
                response?.response?.productItems?.forEach(element => categories.push(element.category));
                const uniqueCategory = Array.from(new Set(categories));
                setAllCategory(uniqueCategory);
            })
            .catch(error => console.log(`Some error occurs while fetching data with: ${error}`));


    }, [page, category]);


    useEffect(() => {
        if (pageQuery !== null) {
            setPage(parseInt(pageQuery));
        }
    }, []);




    return (

        <div className="Main-wrapper w-full flex">
            {/* Left Side  */}
            <div className="left-side">
                <div className="Option-wrapper w-full">
                    <div className="Option-items align-items">
                        <h2 className="option-title">Categories</h2>
                        <div  onClick={() => { navigate(`?category=all`) }} className="main-value flex align-items"><label htmlFor={`all`}>All</label><input onChange={() => handleCategoryFilter("all")} type="checkbox" id={`all`} className="checkbox" /> </div>
                        {allCategory?.map((element, index) => (
                            <div key={index} onClick={() => { navigate(`?category=${element}`) }} className="main-value flex align-items"><label htmlFor={`${index}`}>{element}</label><input onChange={() => handleCategoryFilter(element)} type="checkbox" id={`${index}`} className="checkbox" /> </div>
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
                        {uniquePrices?.map((element, index) => (
                            <div key={index} className="main-value flex align-items"><label htmlFor={`price-${index}`}>Under ₹{element}</label><input type="checkbox" id={`price-${index}`} className="checkbox" /> </div>
                        ))}
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
                        {uniqueDiscount?.map((element, index) => (
                            <div key={index} className="main-value flex align-items"><label htmlFor={`discount-${index}`}>Under {element}</label><input type="checkbox" id={`discount-${index}`} className="checkbox" /> </div>
                        ))}
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
                    <h4 className='result-title'>{products?.response?.productItems?.length} Results</h4>
                    <div className="allProduct-wrapper">
                        {products?.response?.productItems?.map((element, index) => (
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



export default AllProducts;