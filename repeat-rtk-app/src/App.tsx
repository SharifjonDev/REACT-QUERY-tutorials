import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import Product from "./components/Product";

function App() {
  return (
    <React.Fragment>
      <Navbar />

      <Routes>
        <Route path="/">
          <Route path="/products" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
