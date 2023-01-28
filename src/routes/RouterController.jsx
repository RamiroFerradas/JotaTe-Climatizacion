import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/main";
import Ecommerce from "../Pages/Ecommerce/main";

export default function RouterController() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Ecommerce />} />
    </Routes>
  );
}
