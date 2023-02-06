import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Ecommerce from "../Pages/Ecommerce/index.jsx";

export default function RouterController() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Ecommerce />} />
    </Routes>
  );
}
