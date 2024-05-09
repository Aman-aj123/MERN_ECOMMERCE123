import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import ProductsState from "./Context/ProductsState";
import AllProductsPage from "./Pages/AllProductsPage";
import Header from "./Components/Header/Header";


function App() {


  return (
    <BrowserRouter>
      <ProductsState>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<AllProductsPage />} />
        </Routes>
      </ProductsState>
    </BrowserRouter>
  );
}

export default App;
