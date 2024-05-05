import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import ProductsState from "./Context/ProductsState";


function App() {


  return (
    <BrowserRouter>
      <ProductsState>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </ProductsState>
    </BrowserRouter>
  );
}

export default App;
