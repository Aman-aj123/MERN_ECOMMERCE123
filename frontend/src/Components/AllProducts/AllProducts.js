import "./AllProducts.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";

import FetchProducts from "../../Api/Fetch_Products"

import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';
import AOS from "aos"
import "aos/dist/aos.css"

const AllProducts = () => {


    const navigate = useNavigate();


    const url = window.location.href;
    const searchParams = new URLSearchParams(url);

    // Extracting productCategory from the url
    const productCategory = searchParams.get('category');




    //----> Defining useState variables
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const limit = process.env.REACT_APP_API_LIMIT;

    const [category, setCategory] = useState(productCategory === null ? "all" : productCategory);
    const [allCategory, setAllCategory] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [visibleClass, setVisibleClass] = useState("flex");




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
            if (response?.response.productItems.length === 0) {
                setHasMore(false);
            } else {
                setProducts(response);
                setAllProducts(prevProducts => [...prevProducts, ...response?.response.productItems]);
                console.log(allProducts);
            }


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


    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1);
        console.log(page)
        fetchData();
    }








    // Handling CategoryFilter
    const handleCategoryFilter = (element) => {
        setCategory(element);
    };

    const handleFilter = () => {
        setVisibleClass('visible-filter-menu');
    }

    const handleCrossIcn = () => {
        setVisibleClass('visible-filter-menu');
    }


    useEffect(() => {

        setPage(1)
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


    }, [category]);


    useEffect(() => {
        AOS.init({ duration: 500 });
    }, []);






    return (

        <div className="Main-wrapper w-full flex">
            {/* Left Side  */}
            <div className={`left-side ${visibleClass}`}>
                <svg onClick={handleCrossIcn} className="cross-icn" stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 15 15" class="lg:hidden text-3xl cursor-pointer mt-3" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z" fill="currentColor"></path></svg>
                <div className="Option-wrapper w-full">
                    <div className="Option-items align-items">
                        <h2 className="option-title">Categories</h2>
                        <div onClick={() => { navigate(`?category=all`) }} className="main-value flex align-items"><label htmlFor={`all`}>All</label><input onChange={() => handleCategoryFilter("all")} type="checkbox" id={`all`} className="checkbox" /> </div>
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
                    <div className="w-full flex justify-between filter-options">
                        <h4 className='result-title'>{products?.response?.totalResults} Results</h4>
                        <svg onClick={handleFilter} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="lg:hidden absolute m-2 z-20 cursor-pointer text-pink-600 font-medium text-4xl text-center right-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 3H5a1 1 0 0 0-1 1v2.59c0 .523.213 1.037.583 1.407L10 13.414V21a1.001 1.001 0 0 0 1.447.895l4-2c.339-.17.553-.516.553-.895v-5.586l5.417-5.417c.37-.37.583-.884.583-1.407V4a1 1 0 0 0-1-1zm-6.707 9.293A.996.996 0 0 0 14 13v5.382l-2 1V13a.996.996 0 0 0-.293-.707L6 6.59V5h14.001l.002 1.583-5.71 5.71z"></path></svg>
                    </div>
                    <InfiniteScroll
                        dataLength={allProducts.length
                        }
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<div className="infinite-loader flex-box"><img width={30} src="https://static.wixstatic.com/media/369c26_b396f2977e5a40839e2fc77a6f9aac2b~mv2.gif" /></div>}
                    >

                        <div className="allProduct-wrapper">
                            {/* Skelton loading  */}
                            {loading ? (
                                <div className="skelton-wrapper">
                                    {Array(12).fill().map((_, index) => (
                                        <div className="skeleton-card" key={index}>
                                            <div className="skeleton-image"></div>
                                            <div className="skeleton-text">
                                                <div className="skeleton-title"></div>
                                                <div className="skeleton-price"></div>
                                                <div className="skeleton-ratings"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                allProducts?.map((element, index) => (
                                    <Link
                                        data-aos="zoom-in"
                                        to={`/products/${element.title}`}
                                        className="productItems"
                                        key={index}
                                    >
                                        <div className="product-image">
                                            <img
                                                src={element?.images[0]}
                                                alt={`Product ${index}`}
                                            />
                                        </div>
                                        <div className="product-text">
                                            <p className="product-discount">{element?.discount} Off</p>
                                            <h2 className="product-title">
                                                {element.title.slice(0, 50)}...
                                            </h2>
                                            <div className="price-wrapper flex">
                                                <h3 className="product-price">
                                                    ₹ {element.currentPrice}
                                                </h3>
                                                <h3 className="product-price oldPrice">
                                                    ₹ {element.oldPrice}
                                                </h3>
                                            </div>
                                            <p className="product-ratings">{element?.ratings} ratings</p>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>



                    </InfiniteScroll>


                </div>
            </div>
        </div>
    );
}



export default AllProducts;