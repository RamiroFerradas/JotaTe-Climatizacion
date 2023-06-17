"use client";
import { useState } from "react";
import { Appbar, CategoriesNav, GridProducts } from "./components";
import { Sidebar } from "./components/Sidebar";
import { persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Loading } from "../components";
import { ProductDetails } from "./components/ProductDetails";
import { useDispatch } from "react-redux";
import { closeMenuCart } from "../redux/slices/cart";
import { Toaster } from "react-hot-toast";
import { Pagination, Stack } from "@mui/material";

export type EcommerceProps = {};

const Ecommerce: React.FC<EcommerceProps> = () => {
  const [openSidebar, setopenSidebar] = useState(false);

  const dispatch = useDispatch();

  return <></>;
};

export default Ecommerce;
