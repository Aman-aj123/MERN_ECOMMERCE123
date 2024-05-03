import { BrowserRoute, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import ProductsState from "./Context/ProductsState";


function App() {
  return (
    <BrowserRoute>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRoute>
  );
}

export default App;
