import "./TopProducts.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import FetchProducts from "../../../Api/Fetch_Products";





const TopProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const limit = process.env.REACT_APP_API_LIMIT;
    const URL = `${process.env.REACT_APP_API_BASE_URL}/api/products?page=page&limit=limit`;

    console.log(URL);
    const fetchData = async () => {
        const response = await FetchProducts(URL);
        setProducts(response);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [page]);



    const handlePrev = () => {
        setPage(page - 1);
    };

    const handleNext = () => {
        setPage(page + 1);
    };

    return (
        <div className="Top-Products">
            <div className="slider-buttons primary-width">
                <div className="slider-icn-wrapper flex">
                    <FontAwesomeIcon onClick={handlePrev} icon={faArrowLeft} className="slider-btn" />
                    <FontAwesomeIcon onClick={handleNext} icon={faArrowRight} className="slider-btn" />
                </div>
            </div>
            <div className="Top-Products-wrapper mx-auto primary-width flex">
                {products?.response?.productItems.map((item) => (
                    <div className="Top-Products-Items">
                        <img className="w-full product-img" src={item?.images[0]} />
                        <h2 className="w-full product-title">{item?.title.slice(0, 30)}...</h2>
                        <div className="price-wrapper flex">
                            <h3 className="w-full currentPrice">{item?.currentPrice}</h3>
                            <h3 className="w-full oldPrice">{item?.oldPrice}</h3>
                        </div>
                        <p className="product-desc">{item?.description.slice(0, 40)}...</p>
                        <h3 className="product-discount">{item?.discount}</h3>
                    </div>
                ))}

                {loading && 
                <h1>loading...</h1>
                }
            </div>
        </div>
    );
}



export default TopProducts; 