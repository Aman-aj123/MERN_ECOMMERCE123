import "./TopProducts.css";

const TopProducts = () => {
    return (
        <div className="Top-Products">
            <div className="Top-Products-wrapper mx-auto primary-width flex">
                <div className="Top-Products-Items">
                    <img className="w-full product-img" src="https://m.media-amazon.com/images/I/814hp8QMsjL._AC_SY200_.jpg"/>
                    <h2>Women's Fancy Tshirt's With Bag New</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, delectus.</p>
                </div>
                <div className="Top-Products-Items">
                    <img className="w-full product-img" src="https://m.media-amazon.com/images/I/814hp8QMsjL._AC_SY200_.jpg"/>
                    <h2>Women's Fancy Tshirt's With Bag New</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, delectus.</p>
                </div>
            </div>
        </div>
    );
}


export default TopProducts;