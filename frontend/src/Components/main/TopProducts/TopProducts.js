import "./TopProducts.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import FetchProducts from "../../../Api/Fetch_Products";





const TopProducts = ({ productCategory, productClass }) => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const limit = process.env.REACT_APP_API_LIMIT;
    const URL = `${process.env.REACT_APP_API_BASE_URL}/api/products?page=page&limit=${limit}`;

    const limitArr = [];

    for (let i = 0; i <= 10; i++) {
        limitArr.push(i);
    };

    const fetchData = async () => {
        const response = await FetchProducts(URL);
        setProducts(response);

        let mainItems = [];

        if(productCategory.toLowerCase() === "all"){
            mainItems = response?.response?.productItems;
            setFilteredProducts(mainItems);
        } else {
            mainItems = response?.response.productItems.filter(element=> element.category === productCategory);
            setFilteredProducts(mainItems);
        }

        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [page]);



    const handlePrev = () => {
        setPage(page - 1);
        console.log(page)
    };

    const handleNext = () => {
        setPage(page + 1);
        console.log(page)
    };




    return (
        <div className="Top-Products">
            <div className="slider-buttons primary-width">
                <div className="slider-icn-wrapper flex">
                    <FontAwesomeIcon onClick={handlePrev} icon={faArrowLeft} className={`slider-btn ${page <= 1 ? "disabled-btn" : ""}`} />
                    <FontAwesomeIcon onClick={handleNext} icon={faArrowRight} className={`slider-btn ${page >= products?.response?.totalPages ? "disabled-btn" : ""}`} />
                </div>
                <div className="primary-width mx-auto">
                    <p className="totalPages ">{page} of {products?.response?.totalPages}</p>
                </div>
            </div>

            <div className="Top-Products-wrapper mx-auto primary-width flex">
                {filteredProducts.map((item, index) => (
                    <div key={index} className={`Top-Products-Items ${productClass}`}>
                        <img className="w-full product-img" src={item?.images[0]} />
                        <h2 className="w-full product-title">{item?.title.slice(0, 30)}...</h2>
                        <div className="price-wrapper flex">
                            <h3 className="w-full currentPrice">₹{item?.currentPrice}</h3>
                            <h3 className="w-full oldPrice">₹{item?.oldPrice}</h3>
                        </div>
                        <p className="product-desc">{item?.description.slice(0, 40)}...</p>
                        <h3 className="product-discount">{item?.discount}off</h3>

                    </div>

                ))}

                {loading &&
                    <div className="loading-wrapper flex">
                        {limitArr.map((element, index) => (
                            <img key={index} className="loading-img" src="https://assets-v2.lottiefiles.com/a/53b80118-1161-11ee-b538-4f02e47c3050/EtQmNhvlO1.gif" />
                        ))}
                    </div>
                }

            </div>
        </div>
    );
}



TopProducts.defaultProps = {
    productCategory: "all",
    productClass: ""
}



export default TopProducts; 