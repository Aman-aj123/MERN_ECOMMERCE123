import React, { useEffect, useState } from 'react'
import "./ShowProduct.css"
import TopProducts from '../main/TopProducts/TopProducts';
import SkeltonLoader from "../SkeltonLoader/SkeltonLoader"


const ShowProduct = ({ product, loading }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  console.log(product)

  useEffect(() => {
    setSelectedImage(product[0]?.images[0]);
  }, product)


  return (

    <div className='wrapper'>
      {/* // Skelton loading  */}



      <section className="product-section">
        <div className="container">

          {/* Skelton Loader */}
          {loading ?
            <SkeltonLoader />
            :

            // Product 
            <div className="product-wrapper">
              <div className="left-column">
                <img alt="product" className="product-image" src={selectedImage} />
                <div className="image-thumbnails">
                  {product[0]?.images?.map((element, index) => (

                    <img
                      key={index}
                      alt="thumbnail 1"
                      className="thumbnail"
                      src={element}
                      onMouseOutCapture={() => handleThumbnailClick(element)}
                    />
                  ))
                  }

                </div>
              </div>
              <div className="right-column">
                <h3 className="product-title">{product[0]?.title}</h3>
                <div className="ratings">
                  <span className="stars">⭐⭐⭐⭐☆</span>
                  <span className="reviews">{product[0]?.ratings}</span>
                </div>
                <hr />
                <p className="price">₹{product[0]?.currentPrice}</p>
                <p className="availability">In Stock</p>
                <div className='fit-menu flex items-center'>

                  <div className="size">
                    <label>Size:</label>
                    <select>
                      {
                        product[0]?.varients?.size.map((element, index) => (



                          <option key={index}>{element}</option>

                        ))


                      }

                    </select>
                  </div>
                  <div className="quantity">

                    <label>quantity: </label>
                    <input type="number" />

                  </div>

                </div>
                <p className="description">
                  {product[0]?.description}
                </p>
                <div className='about-item'>
                  <label> About this product: </label>
                  <ul>
                    {
                      product[0]?.aboutProduct.map((element, index)=> (
                        <li key={index}>{element}</li>
                      ))
                    }
                  </ul>
                </div>
                <button className="buy-now product-btn">Buy Now</button>
                <button className="add-to-cart product-btn">Add to Cart</button>


              </div>
            </div>
          }



        </div>
      </section>
      <TopProducts productCategory="all" productTitle="Related products" />
    </div>
  );
}

export default ShowProduct