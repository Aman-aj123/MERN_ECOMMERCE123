import React, { useEffect, useState } from 'react'
import ShowProduct from '../Components/ShowProduct/ShowProduct'
import { useParams } from 'react-router-dom';
import FetchProducts from '../Api/Fetch_Products';



const ShowProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const response = await FetchProducts(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
    setLoading(false);
    const mainProduct = response?.response.productItems.filter((element) => element.title === productId);
    setProduct(mainProduct);
  }

  useEffect(() => {
    fetchData();
  }, [productId]);

  return (
    <ShowProduct product={product} loading={loading} />
  )
}

export default ShowProductPage