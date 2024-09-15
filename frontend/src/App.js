import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import ProductsState from "./Context/ProductsState";
import AllProductsPage from "./Pages/AllProductsPage";
import Header from "./Components/Header/Header";
import ShowProductPage from "./Pages/ShowProductPage";


function App() {
  return (
    <BrowserRouter>
      <ProductsState>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/products" element={<AllProductsPage />} />
          <Route exact path="/products/:productId" element={<ShowProductPage />} />
        </Routes>
      </ProductsState>
    </BrowserRouter>
  );
}

export default App;
